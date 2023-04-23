import { Root } from "react-dom";

declare module "react-dom" {
  function createRoot(container: Element | Document | null): Root;
}
