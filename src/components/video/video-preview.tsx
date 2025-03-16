import React from "react";

interface VideoPreviewProps {
  videoSrc: string | null;
  onDownload: () => void;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ videoSrc, onDownload }) => {
  if (!videoSrc) {
    return null;
  }

  return (
    <div className="mt-4">
      <video
        src={videoSrc}
        controls
        className="w-full rounded-md"
      />
      <button
        className="mt-2 w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90"
        onClick={onDownload}
      >
        Download Video
      </button>
    </div>
  );
};

export default VideoPreview;
