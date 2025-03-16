import * as tf from '@tensorflow/tfjs-node';
import * as fs from 'fs';
import * as path from 'path';

interface VideoGenerationConfig {
  modelPath: string;
  frameRate: number;
  outputFormat: 'mp4' | 'avi' | 'mov';
}

class LocalVideoLLM {
  private model: tf.GraphModel | null = null;
  private config: VideoGenerationConfig;

  constructor(config: VideoGenerationConfig) {
    this.config = config;
  }

  async loadModel(): Promise<void> {
    if (!fs.existsSync(this.config.modelPath)) {
      throw new Error(`Model file not found at ${this.config.modelPath}`);
    }

    this.model = await tf.loadGraphModel(`file://${this.config.modelPath}`);
    console.log('Model loaded successfully.');
  }

  async generateVideoFromImages(images: Buffer[]): Promise<Buffer> {
    if (!this.model) {
      throw new Error('Model is not loaded. Please call loadModel() first.');
    }

    const processedImages = images.map((imageBuffer) => {
      const imageTensor = tf.node.decodeImage(imageBuffer, 3);
      return tf.image.resizeBilinear(imageTensor, [256, 256]).expandDims(0);
    });

    const inputTensor = tf.concat(processedImages, 0);
    const outputTensor = this.model.execute({ input: inputTensor }) as tf.Tensor;

    const videoBuffer = await this.convertTensorToVideo(outputTensor);
    tf.dispose([inputTensor, outputTensor]);

    return videoBuffer;
  }

  private async convertTensorToVideo(tensor: tf.Tensor): Promise<Buffer> {
    const frames = tensor.arraySync() as number[][][];
    const frameRate = this.config.frameRate;
    const outputPath = path.join(__dirname, 'output-video.' + this.config.outputFormat);

    // Use FFmpeg or similar library to encode frames into a video
    const ffmpeg = require('fluent-ffmpeg');
    const command = ffmpeg();

    frames.forEach((frame, index) => {
      const framePath = path.join(__dirname, `frame-${index}.png`);
      fs.writeFileSync(framePath, Buffer.from(frame));
      command.input(framePath);
    });

    return new Promise((resolve, reject) => {
      command
        .outputOptions(['-r', frameRate.toString()])
        .output(outputPath)
        .on('end', () => {
          const videoBuffer = fs.readFileSync(outputPath);
          frames.forEach((_, index) => fs.unlinkSync(path.join(__dirname, `frame-${index}.png`)));
          fs.unlinkSync(outputPath);
          resolve(videoBuffer);
        })
        .on('error', (err: Error) => reject(err))
        .run();
    });
  }
}

export default LocalVideoLLM;
