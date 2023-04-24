declare interface Point {
  x: number;
  y: number;
}

declare interface Shape {
    type: AvailableTools;
    startPoint: Point;
    endPoint: Point;
    properties: ToolProperties;
  };

  declare interface LineShape extends Shape {
    type: 'line';
  };
  
  declare interface CircleShape extends Shape {
    type: 'circle';
    radius: number;
  };
  
  declare interface EllipseShape extends Shape {
    type: 'ellipse';
    radiusX: number;
    radiusY: number;
  };
  
  declare interface ShapeState {
    shapeList: Shape[];
    selectedShapeIndex?: number;
  };
  
  declare interface ShapeModification {
    index:number;
    shape: Shape;
  };
