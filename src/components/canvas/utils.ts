const colorFormatToCSS = (color: ColorFormat): string => `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;

const checkIfShapeIsClicked = (ctx: CanvasRenderingContext2D, event: React.MouseEvent<HTMLCanvasElement> | undefined) => event && (ctx.isPointInStroke(event.nativeEvent.offsetX, event.nativeEvent.offsetY) || ctx.isPointInPath(event.nativeEvent.offsetX, event.nativeEvent.offsetY));

const drawLine = (ctx: CanvasRenderingContext2D, shape: LineShape, event: React.MouseEvent<HTMLCanvasElement> | undefined) => {
    const { startPoint, endPoint, properties } = shape;
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.lineWidth = properties.lineWidth.value as number;
    ctx.strokeStyle = colorFormatToCSS(properties.color.value as ColorFormat);
    ctx.stroke();
    const isShapeClicked = checkIfShapeIsClicked(ctx, event);
    ctx.closePath();
    return isShapeClicked;
  };
  
const drawCircle = (ctx: CanvasRenderingContext2D, shape: CircleShape, event: React.MouseEvent<HTMLCanvasElement> | undefined) => {
    const { startPoint, radius, properties } = shape;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
    ctx.lineWidth = properties.lineWidth.value as number;
    ctx.strokeStyle = colorFormatToCSS(properties.color.value as ColorFormat);
    ctx.stroke();
    ctx.fillStyle = colorFormatToCSS(properties.fillColor.value as ColorFormat);
    ctx.fill();
    const isShapeClicked = checkIfShapeIsClicked(ctx, event);
    ctx.closePath();
    return isShapeClicked;
  };
  
const drawEllipse = (ctx: CanvasRenderingContext2D, shape: EllipseShape, event: React.MouseEvent<HTMLCanvasElement> | undefined) => {
    const { startPoint, radiusX, radiusY, properties } = shape;
    ctx.beginPath();
    ctx.ellipse(startPoint.x, startPoint.y, radiusX, radiusY, 0, 0, 2 * Math.PI);
    ctx.strokeStyle = colorFormatToCSS(properties.color.value as ColorFormat);
    ctx.lineWidth = properties.lineWidth.value as number;
    ctx.stroke();
    ctx.fillStyle = colorFormatToCSS(properties.fillColor.value as ColorFormat);
    ctx.fill();
    const isShapeClicked = checkIfShapeIsClicked(ctx, event);
    ctx.closePath();
    return isShapeClicked;
  };

  const getBoundingBox = (shape: Shape) => {
    let startPoint: Point = { x: 0, y: 0 };
    let endPoint: Point = { x: 0, y: 0 };
  
    switch (shape.type) {
      case 'line': {
        const line = shape as LineShape;
        startPoint = {
          x: Math.min(line.startPoint.x, line.endPoint.x),
          y: Math.min(line.startPoint.y, line.endPoint.y),
        };
        endPoint = {
          x: Math.max(line.startPoint.x, line.endPoint.x),
          y: Math.max(line.startPoint.y, line.endPoint.y),
        };
        break;
      }
      case 'circle': {
        const circle = shape as CircleShape;
        startPoint = {
          x: circle.startPoint.x - circle.radius,
          y: circle.startPoint.y - circle.radius,
        };
        endPoint = {
          x: circle.startPoint.x + circle.radius,
          y: circle.startPoint.y + circle.radius,
        };
      break;
      }
      case 'ellipse': {
        const ellipse = shape as EllipseShape;
        startPoint = {
          x: ellipse.startPoint.x - ellipse.radiusX,
          y: ellipse.startPoint.y - ellipse.radiusY,
        };
        endPoint = {
          x: ellipse.startPoint.x + ellipse.radiusX,
          y: ellipse.startPoint.y + ellipse.radiusY,
        };
      break;
      }
    }
  
    return { startPoint, endPoint };
  };

// Draw a rectangle around the shape
export const drawSelectionHighlight = (canvas: HTMLCanvasElement, shape: Shape) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return; 
  const { startPoint, endPoint } = getBoundingBox(shape);
  ctx.beginPath();
  ctx.rect(startPoint.x - 5, startPoint.y - 5, endPoint.x - startPoint.x + 10, endPoint.y - startPoint.y + 10);
  ctx.strokeStyle = "#091CBD";
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 5]); 
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.closePath();
}

export const draw = (canvas: HTMLCanvasElement, shapes: Shape[], event: React.MouseEvent<HTMLCanvasElement> | undefined) => {
    let clickedShapeIndex;
    const ctx = canvas.getContext('2d');
    if (!ctx) return; 

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach((shape, index) => {
        let isShapeClicked;
        switch (shape.type) {
          case 'line':
            isShapeClicked = drawLine(ctx, shape as LineShape, event);
            break;
          case 'circle':
            isShapeClicked = drawCircle(ctx, shape as CircleShape, event);
            break;
          case 'ellipse':
            isShapeClicked = drawEllipse(ctx, shape as EllipseShape, event);
            break;
          default:
            break;
        }
        if (isShapeClicked) {
          clickedShapeIndex = index;
        }
      });
      return clickedShapeIndex;
}

export const adjustCanvasAndDraw = (canvas: HTMLCanvasElement, shapes: Shape[]) => {
  if (!canvas) return; 
  const container = canvas.parentNode as HTMLElement;
  canvas.height = container?.clientHeight;
  canvas.width = container?.clientWidth;
  draw(canvas, shapes, undefined);
}
