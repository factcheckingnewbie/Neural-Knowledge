import * as tf from '@tensorflow/tfjs-node';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';

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

    const framePaths: string[] = [];
    frames.forEach((frame, index) => {
      const framePath = path.join(__dirname, `frame-${index}.png`);
      const frameBuffer = Buffer.from(frame.flat());
      fs.writeFileSync(framePath, frameBuffer);
      framePaths.push(framePath);
    });

    return new Promise((resolve, reject) => {
      const ffmpegCommand = `ffmpeg -y -r ${frameRate} -i frame-%d.png -c:v libx264 ${outputPath}`;
      exec(ffmpegCommand, (error) => {
        framePaths.forEach((framePath) => fs.unlinkSync(framePath));
        if (error) {
          reject(error);
        } else {
          const videoBuffer = fs.readFileSync(outputPath);
          fs.unlinkSync(outputPath);
          resolve(videoBuffer);
        }
      });
    });
  }
}

export default LocalVideoLLM;
