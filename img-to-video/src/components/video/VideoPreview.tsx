import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface VideoPreviewProps {
  videoSrc: string | null;
  onDownload: () => void;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ videoSrc, onDownload }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  if (!videoSrc) {
    return (
      <div className="text-center text-muted-foreground mt-4">
        <p>No video available for preview. Please generate a video first.</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <video
        src={videoSrc}
        controls
        className="w-full rounded-md"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div className="flex justify-between mt-2">
        <Button
          variant="outline"
          onClick={handlePlayPause}
          className="w-1/2 mr-2"
        >
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <Button
          variant="primary"
          onClick={onDownload}
          className="w-1/2 ml-2"
        >
          Download Video
        </Button>
      </div>
    </div>
  );
};

export default VideoPreview;
