import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImageUploadProps {
  onImagesSelected: (files: File[]) => void;
  disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImagesSelected, disabled }) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setSelectedImages(files);
      onImagesSelected(files);
    }
  };

  const handleClearImages = () => {
    setSelectedImages([]);
    onImagesSelected([]);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="image-upload">Upload Images</Label>
        <Input
          id="image-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          disabled={disabled}
        />
        {selectedImages.length > 0 && (
          <p className="text-sm text-muted-foreground mt-2">
            {selectedImages.length} image(s) selected.
          </p>
        )}
      </div>
      {selectedImages.length > 0 && (
        <Button variant="outline" onClick={handleClearImages} disabled={disabled}>
          Clear Images
        </Button>
      )}
    </div>
  );
};

export default ImageUpload;
