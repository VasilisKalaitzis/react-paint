declare type AvailableTools = 'select' | 'line' | 'circle' | 'ellipse';

declare interface ToolState {
  activeTool: AvailableTools;
  properties: ToolProperties;
}

declare type ColorFormat = {
  r: number,
  g: number,
  b: number,
  a?: number,
};

declare type ToolPropertyValue = ColorFormat | number;

declare type ToolPropertyTypes = 'color-picker' | 'number';

declare interface ToolProperty {
  label: string;
  isCollapsed?: boolean;
  type: string;
  value: ToolPropertyValue;
}

declare interface ToolProperties {
  [key: string] : ToolProperty
}
