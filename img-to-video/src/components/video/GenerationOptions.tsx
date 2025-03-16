import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface GenerationOptionsProps {
  onOptionsChange: (options: { frameRate: number; outputFormat: string }) => void;
  disabled?: boolean;
}

const GenerationOptions: React.FC<GenerationOptionsProps> = ({ onOptionsChange, disabled }) => {
  const [frameRate, setFrameRate] = useState<number>(30);
  const [outputFormat, setOutputFormat] = useState<string>("mp4");

  const handleFrameRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setFrameRate(value);
    onOptionsChange({ frameRate: value, outputFormat });
  };

  const handleOutputFormatChange = (value: string) => {
    setOutputFormat(value);
    onOptionsChange({ frameRate, outputFormat: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="frame-rate">Frame Rate (FPS)</Label>
        <Input
          id="frame-rate"
          type="number"
          min={1}
          max={60}
          value={frameRate}
          onChange={handleFrameRateChange}
          disabled={disabled}
        />
      </div>

      <div>
        <Label htmlFor="output-format">Output Format</Label>
        <Select
          value={outputFormat}
          onValueChange={handleOutputFormatChange}
          disabled={disabled}
        >
          <SelectTrigger id="output-format" className="w-full">
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mp4">MP4</SelectItem>
            <SelectItem value="avi">AVI</SelectItem>
            <SelectItem value="mov">MOV</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="outline"
        onClick={() => onOptionsChange({ frameRate, outputFormat })}
        disabled={disabled}
      >
        Apply Options
      </Button>
    </div>
  );
};

export default GenerationOptions;
