import LocalVideoLLM from "@/models/LocalVideoLLM";

interface VideoGeneratorConfig {
  modelPath: string;
  frameRate: number;
  outputFormat: "mp4" | "avi" | "mov";
}

class VideoGenerator {
  private llm: LocalVideoLLM;

  constructor(config: VideoGeneratorConfig) {
    this.llm = new LocalVideoLLM({
      modelPath: config.modelPath,
      frameRate: config.frameRate,
      outputFormat: config.outputFormat,
    });
  }

  async initialize(): Promise<void> {
    await this.llm.loadModel();
  }

  async generateVideo(images: Buffer[]): Promise<Buffer> {
    return await this.llm.generateVideoFromImages(images);
  }
}

export default VideoGenerator;
