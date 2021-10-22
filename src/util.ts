import * as grpc from "@grpc/grpc-js";
import { VerifyOptions } from "@grpc/grpc-js/build/src/channel-credentials";

export interface ClientOpts {
  insecure?: boolean;
  rootCerts?: Buffer | null;
  privateKey?: Buffer | null;
  certChain?: Buffer | null;
  verifyOptions?: VerifyOptions;
}

function createClientCreds(
  token: string,
  opts: ClientOpts
): grpc.ChannelCredentials {
  const metadata = new grpc.Metadata();
  metadata.set("authorization", "Bearer " + token);

  const creds = [];
  if (!opts.insecure) {
    creds.push(
      grpc.credentials.createFromMetadataGenerator((_, callback) => {
        callback(null, metadata);
      })
    );
  }

  return grpc.credentials.combineChannelCredentials(
    opts.insecure
      ? grpc.credentials.createInsecure()
      : grpc.credentials.createSsl(
          opts.rootCerts,
          opts.privateKey,
          opts.certChain,
          opts.verifyOptions
        ),
    ...creds
  );
}

const authzedEndpoint = "grpc.authzed.com:443";

export { createClientCreds, authzedEndpoint };
export default { createClientCreds, authzedEndpoint };
