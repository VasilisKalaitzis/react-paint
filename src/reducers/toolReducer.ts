import { ToolAction, ToolActionTypes } from "../actions/toolActions";

const initialState: ToolState = {
  activeTool: 'line',
};

export const toolReducer = (state = initialState, action: ToolAction): ToolState => {
  switch (action.type) {
    case ToolActionTypes.CHANGE_ACTIVE_TOOL:
      return { activeTool: action.payload };
    default:
      return state;
  }
};
