"use strict";

import { SchemaServiceClient } from "./authzedapi/authzed/api/v1alpha1/schema.grpc-client";
import * as util from "./util";

function NewClient(
  token: string,
  endpoint = util.authzedEndpoint,
  opts: boolean | util.ClientOpts = { insecure: false }
) {
  if (typeof opts === "boolean" || opts instanceof Boolean) {
    opts = {
      insecure: opts as boolean,
    };
  }

  const creds = util.createClientCreds(token, opts);
  const schema = new SchemaServiceClient(endpoint, creds);
  return schema;
}

export * from "./authzedapi/authzed/api/v1alpha1/schema";

export { NewClient };
export default {
  NewClient,
};
