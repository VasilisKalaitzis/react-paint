export const drawLine = (ctx: CanvasRenderingContext2D, shape: LineShape) => {
    const { startPoint, endPoint } = shape;
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.stroke();
  };
  
export const drawCircle = (ctx: CanvasRenderingContext2D, shape: CircleShape) => {
    const { startPoint, radius } = shape;
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
    ctx.stroke();
  };
  
export const drawEllipse = (ctx: CanvasRenderingContext2D, shape: EllipseShape) => {
    const { startPoint, radiusX, radiusY } = shape;
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.ellipse(startPoint.x, startPoint.y, radiusX, radiusY, 0, 0, 2 * Math.PI);
    ctx.stroke();
  };

export const draw = (canvas: HTMLCanvasElement, shapes: Shape[]) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return; 

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach((shape) => {
        switch (shape.type) {
          case 'line':
            drawLine(ctx, shape as LineShape);
            break;
          case 'circle':
            drawCircle(ctx, shape as CircleShape);
            break;
          case 'ellipse':
            drawEllipse(ctx, shape as EllipseShape);
            break;
          default:
            break;
        }
      });
}
