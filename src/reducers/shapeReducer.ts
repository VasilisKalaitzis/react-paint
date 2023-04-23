import { ShapeAction, ShapeActionTypes } from "../actions/shapeActions";

const initialState: ShapeState = {
  shapeList: []
};

export const shapeReducer = (state = initialState, action: ShapeAction): ShapeState => {
  switch (action.type) {
    case ShapeActionTypes.CREATE_SHAPE:
      return { shapeList: [...state.shapeList, action.payload] };
    case ShapeActionTypes.MODIFY_SHAPE:
      const { index, shape } = action.payload;
      const newShapes = [...state.shapeList];
      newShapes[index] = { ...newShapes[index], ...shape };
      return { ...state, shapeList: newShapes };
    default:
      return state;
  }
};
