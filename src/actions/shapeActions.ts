export enum ShapeActionTypes {
  CREATE_SHAPE = 'CREATE_SHAPE',
  MODIFY_SHAPE = 'MODIFY_SHAPE',
}

interface CreateShapeAction {
  type: ShapeActionTypes.CREATE_SHAPE;
  payload: Shape;
}

interface ModifyShapeAction {
  type: ShapeActionTypes.MODIFY_SHAPE;
  payload: ShapeModification;
}

export type ShapeAction = CreateShapeAction | ModifyShapeAction;

const getCircleData = (circle: Shape) => {
  const {startPoint, endPoint } = circle;
  const diffX = startPoint.x - endPoint.x;
  const diffY = startPoint.y - endPoint.y;
  const radius = Math.sqrt(diffX * diffX + diffY * diffY);
  return {...circle, radius};
}

const getEllipseData = (ellipse: Shape) => {
  const {startPoint, endPoint } = ellipse;
  const radiusX = Math.abs(startPoint.x - endPoint.x);
  const radiusY = Math.abs(startPoint.y - endPoint.y);
  return {...ellipse, radiusX, radiusY};
};

export const createShape = (shape: Shape) => {
  let payload = shape;
  switch (shape.type) {
    case 'line':
      break;
    case 'circle':
      payload = getCircleData(shape);
      break;
    case 'ellipse':
      payload = getEllipseData(shape);
      break;
  }
  return {
    type: ShapeActionTypes.CREATE_SHAPE,
    payload
  }
}

export const modifyShape = (index: number, shape: Shape) => {
  let payload = { shape, index };
  switch (shape.type) {
    case 'line':
      break;
    case 'circle':
      payload = { ...payload, shape: getCircleData(shape)};
      break;
    case 'ellipse':
      payload = { ...payload, shape: getEllipseData(shape)};
      break;
  }
  return {
    type: ShapeActionTypes.MODIFY_SHAPE,
    payload
  }
}