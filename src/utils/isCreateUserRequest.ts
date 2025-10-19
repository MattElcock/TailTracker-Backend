import { IncomingMessageWithBody } from "@/types.js";
import { Kind, OperationTypeNode } from "graphql";
import { parse } from "graphql";

const isCreateUserRequest = (req: IncomingMessageWithBody) => {
  const { definitions } = parse(req.body.query);

  if (definitions.length !== 1) return false;

  const definition = definitions[0];
  if (definition.kind !== Kind.OPERATION_DEFINITION) return false;
  if (definition.operation !== OperationTypeNode.MUTATION) return false;

  const selection = definition.selectionSet.selections;
  if (selection.length !== 1) return false;

  const rootField = selection[0];
  if (rootField.kind !== Kind.FIELD) return false;
  if (rootField.name.value !== "createUser") return false;

  return true;
};

export { isCreateUserRequest };
