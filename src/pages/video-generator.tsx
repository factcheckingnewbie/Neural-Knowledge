import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const VideoGeneratorPage = () => {
  const [images, setImages] = useState<File[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages(Array.from(event.target.files));
    }
  };

  const handleGenerateVideo = async () => {
    if (images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    setIsGenerating(true);
    setGeneratedVideo(null);

    try {
      // Simulate video generation process
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setGeneratedVideo("https://via.placeholder.com/640x360.mp4");
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
      link.download = "generated-video.mp4";
      link.click();
    }
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        <div className="border-b p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Video Generator</h1>
          <Button variant="outline" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </div>

        <div className="flex-1 p-4">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Generate Video from Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="image-upload">Upload Images</Label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    disabled={isGenerating}
                  />
                  {images.length > 0 && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {images.length} image(s) selected.
                    </p>
                  )}
                </div>

                <Button
                  onClick={handleGenerateVideo}
                  disabled={isGenerating || images.length === 0}
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

                {generatedVideo && (
                  <div className="mt-4">
                    <video
                      src={generatedVideo}
                      controls
                      className="w-full rounded-md"
                    />
                    <Button
                      className="mt-2 w-full"
                      onClick={handleDownloadVideo}
                    >
                      Download Video
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default VideoGeneratorPage;
