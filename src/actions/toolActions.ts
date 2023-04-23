export enum ToolActionTypes {
    CHANGE_ACTIVE_TOOL = 'CHANGE_ACTIVE_TOOL'
  }
  
interface ChangeActiveTool {
    type: ToolActionTypes.CHANGE_ACTIVE_TOOL;
    payload: AvailableTools;
  }

export type ToolAction = ChangeActiveTool;
  
export const changeActiveTool = (tool: AvailableTools) => ({
  type: ToolActionTypes.CHANGE_ACTIVE_TOOL,
  payload: tool,
});
