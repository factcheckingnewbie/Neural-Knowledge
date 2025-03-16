import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ModelSelectorProps {
  models: string[];
  onModelSelect: (model: string) => void;
  disabled?: boolean;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ models, onModelSelect, disabled }) => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    onModelSelect(model);
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="model-selector">Select Model</Label>
      <Select
        value={selectedModel || ""}
        onValueChange={handleModelChange}
        disabled={disabled}
      >
        <SelectTrigger id="model-selector" className="w-full">
          <SelectValue placeholder="Choose a model" />
        </SelectTrigger>
        <SelectContent>
          {models.map((model) => (
            <SelectItem key={model} value={model}>
              {model}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ModelSelector;
