import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import ImageUpload from "@/components/video/image-upload";
import ModelSelector from "@/components/video/model-selector";
import VideoPreview from "@/components/video/video-preview";
import GenerationOptions from "@/components/video/GenerationOptions";
import VideoGenerator from "@/ai/video/video-generator";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const GeneratorPage = () => {
  const [images, setImages] = useState<File[]>([]);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [generationOptions, setGenerationOptions] = useState({
    frameRate: 30,
    outputFormat: "mp4",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);

  const handleGenerateVideo = async () => {
    if (!selectedModel) {
      alert("Please select a model.");
      return;
    }

    if (images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    setIsGenerating(true);
    setGeneratedVideo(null);

    try {
      const videoGenerator = new VideoGenerator({
        modelPath: `/models/${selectedModel}`,
        frameRate: generationOptions.frameRate,
        outputFormat: generationOptions.outputFormat,
      });

      await videoGenerator.initialize();

      const imageBuffers = await Promise.all(
        images.map((image) =>
          image.arrayBuffer().then((buffer) => Buffer.from(buffer))
        )
      );

      const videoBuffer = await videoGenerator.generateVideo(imageBuffers);

      const videoBlob = new Blob([videoBuffer], {
        type: `video/${generationOptions.outputFormat}`,
      });
      const videoUrl = URL.createObjectURL(videoBlob);

      setGeneratedVideo(videoUrl);
    } catch (error) {
      console.error("Error generating video:", error);
      alert("Failed to generate video. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadVideo = () => {
    if (generatedVideo) {
      const link = document.createElement("a");
      link.href = generatedVideo;
      link.download = `generated-video.${generationOptions.outputFormat}`;
      link.click();
    }
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        <div className="border-b p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Video Generator</h1>
        </div>

        <div className="flex-1 p-4">
          <div className="grid gap-6 max-w-3xl mx-auto">
            <ImageUpload
              onImagesSelected={setImages}
              disabled={isGenerating}
            />

            <ModelSelector
              models={["model1", "model2", "model3"]}
              onModelSelect={setSelectedModel}
              disabled={isGenerating}
            />

            <GenerationOptions
              onOptionsChange={setGenerationOptions}
              disabled={isGenerating}
            />

            <Button
              onClick={handleGenerateVideo}
              disabled={isGenerating || !selectedModel || images.length === 0}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Video"
              )}
            </Button>

            <VideoPreview
              videoSrc={generatedVideo}
              onDownload={handleDownloadVideo}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default GeneratorPage;
