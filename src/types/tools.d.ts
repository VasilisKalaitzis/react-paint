declare type AvailableTools = 'select' | 'line' | 'circle' | 'ellipse';

declare interface ToolState {
    activeTool: AvailableTools;
  }