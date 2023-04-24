import { ToolAction, ToolActionTypes } from "../actions/toolActions";

const initialState: ToolState = {
  activeTool: 'line',
  properties: {},
};

export const toolReducer = (state = initialState, action: ToolAction): ToolState => {
  switch (action.type) {
    case ToolActionTypes.CHANGE_ACTIVE_TOOL:
      return { ...state, activeTool: action.payload };
    case ToolActionTypes.SET_TOOL_PROPERTIES:
      return { ...state, properties: action.payload };
    default:
      return state;
  }
};
