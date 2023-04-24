import { ShapeAction, ShapeActionTypes } from "../actions/shapeActions";

const initialState: ShapeState = {
  shapeList: [],
  selectedShapeIndex: undefined,
};

export const shapeReducer = (state = initialState, action: ShapeAction): ShapeState => {
  switch (action.type) {
    case ShapeActionTypes.CREATE_SHAPE:
      return { shapeList: [...state.shapeList, action.payload] };
    case ShapeActionTypes.MODIFY_SHAPE: {
      const { index, shape } = action.payload;
      const newShapes = [...state.shapeList];
      newShapes[index] = { ...newShapes[index], ...shape };
      return { ...state, shapeList: newShapes };
    }
    case ShapeActionTypes.SELECT_SHAPE_BY_INDEX: 
      return { ...state, selectedShapeIndex: action.payload };
    case ShapeActionTypes.DELETE_SHAPE: {
      const index = action.payload || state.selectedShapeIndex;
      if (index !==undefined && state.shapeList[index]) {
        const newShapes = [...state.shapeList];
        newShapes.splice(index, 1);
        return {...state, shapeList: newShapes, selectedShapeIndex: undefined};
      }
      return state;
    }
    default:
      return state;
  }
};
