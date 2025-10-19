import { IncomingMessageWithBody } from "@/types.js";

const isIntrospectionQuery = (req: IncomingMessageWithBody) => {
  if (req.body.operationName === "IntrospectionQuery") {
    return true;
  } else {
    return false;
  }
};

export { isIntrospectionQuery };
