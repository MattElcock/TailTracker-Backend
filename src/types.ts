import { DBUser } from "db/Users/types";

export interface Context {
  user: Omit<DBUser, "firebase_id">;
}
