import { useRef, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ZoomIn, ZoomOut, RefreshCw } from "lucide-react";

const GraphPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  
  // This would be replaced with actual graph visualization code
  // using a library like D3.js, Sigma.js, or react-force-graph
  const renderMockGraph = () => {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            This is a placeholder for the graph visualization.
          </p>
          <p className="text-muted-foreground">
            In the actual implementation, this would render an interactive
            force-directed graph using a library like D3.js or react-force-graph.
          </p>
        </div>
      </div>
    );
  };
  
  return (
    <AppLayout>
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        <div className="border-b p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Knowledge Graph</h1>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              
              <Slider
                className="w-32"
                min={0.5}
                max={2}
                step={0.1}
                value={[zoom]}
                onValueChange={(value) => setZoom(value[0])}
              />
              
              <Button variant="outline" size="icon" onClick={() => setZoom(Math.min(2, zoom + 0.1))}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
            
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-hidden p-4">
          <Card className="h-full">
            <CardContent className="p-0 h-full">
              <div 
                ref={containerRef} 
                className="w-full h-full"
                style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
              >
                {renderMockGraph()}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default GraphPage;