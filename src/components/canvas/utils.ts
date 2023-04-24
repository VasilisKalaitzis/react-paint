const colorFormatToCSS = (color: ColorFormat): string => `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;

export const drawLine = (ctx: CanvasRenderingContext2D, shape: LineShape) => {
    const { startPoint, endPoint, properties } = shape;
    ctx.beginPath();
    ctx.lineWidth = properties.lineWidth.value as number;
    ctx.strokeStyle = colorFormatToCSS(properties.color.value as ColorFormat);
    ctx.stroke();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.closePath();
  };
  
export const drawCircle = (ctx: CanvasRenderingContext2D, shape: CircleShape) => {
    const { startPoint, radius, properties } = shape;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = colorFormatToCSS(properties.color.value as ColorFormat);
    ctx.stroke();
    ctx.fillStyle = colorFormatToCSS(properties.fillColor.value as ColorFormat);
    ctx.fill();
    ctx.closePath();
  };
  
export const drawEllipse = (ctx: CanvasRenderingContext2D, shape: EllipseShape) => {
    const { startPoint, radiusX, radiusY, properties } = shape;
    ctx.beginPath();
    ctx.ellipse(startPoint.x, startPoint.y, radiusX, radiusY, 0, 0, 2 * Math.PI);
    ctx.strokeStyle = colorFormatToCSS(properties.color.value as ColorFormat);
    ctx.stroke();
    ctx.fillStyle = colorFormatToCSS(properties.fillColor.value as ColorFormat);
    ctx.fill();
    ctx.closePath();
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
