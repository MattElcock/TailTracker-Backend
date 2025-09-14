import { DBUser } from "@/db/Users/types.js";

export interface Context {
  user: Omit<DBUser, "firebase_id">;
}
