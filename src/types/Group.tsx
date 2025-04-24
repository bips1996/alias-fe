import { User } from "./User";

export interface Group {
  id: number;
  name: string;
  description: string;
  members: User[];
}
