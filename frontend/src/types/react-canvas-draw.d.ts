declare module "react-canvas-draw" {
    import * as React from "react";
  
    interface CanvasDrawProps {
      brushColor?: string;
      brushRadius?: number;
      canvasWidth?: number;
      canvasHeight?: number;
      lazyRadius?: number;
      onChange?: (canvas: any) => void;
      hideGrid?: boolean;
    }
  
    class CanvasDraw extends React.Component<CanvasDrawProps> {
      clear: () => void;
      undo: () => void;
      getSaveData: () => string;
      loadSaveData: (data: string, doNotClear?: boolean) => void;
    }
  
    export default CanvasDraw;
  }
  