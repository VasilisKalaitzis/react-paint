declare interface Shape {
    type: AvailableTools;
    startPoint: { x: number, y: number};
    endPoint: { x: number, y: number};
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
  };
  
  declare interface ShapeModification {
    index:number, shape: Shape 
  };
