import { BranchType } from "./branchType";

export interface Branch {
  name: string | null;
  url: string | null;
  type: BranchType;
}
