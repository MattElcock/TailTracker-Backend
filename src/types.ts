import { DBUser } from "@/db/Users/types.js";
import { IncomingMessage } from "http";

export interface Context {
  user: Omit<DBUser, "firebase_id">;
}

export interface IncomingMessageWithBody extends IncomingMessage {
  body: {
    query: string;
    variables?: Record<string, any>;
    operationName?: string;
  };
}
