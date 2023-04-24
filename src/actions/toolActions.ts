export enum ToolActionTypes {
  CHANGE_ACTIVE_TOOL = 'CHANGE_ACTIVE_TOOL',
  SET_TOOL_PROPERTIES = 'SET_TOOL_PROPERTIES',
}
  
interface ChangeActiveTool {
  type: ToolActionTypes.CHANGE_ACTIVE_TOOL;
  payload: AvailableTools;
}
  
interface SetToolProperties {
  type: ToolActionTypes.SET_TOOL_PROPERTIES;
  payload: ToolProperties;
}

export type ToolAction = ChangeActiveTool | SetToolProperties;
  
export const changeActiveTool = (tool: AvailableTools) => ({
  type: ToolActionTypes.CHANGE_ACTIVE_TOOL,
  payload: tool,
});

export const setToolProperties = (properties: ToolProperties) => ({
  type: ToolActionTypes.SET_TOOL_PROPERTIES,
  payload: properties,
});
