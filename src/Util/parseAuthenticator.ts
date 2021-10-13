import protobuf from 'protobufjs';
import { Base32 } from './base32';

export const parseAuthenticator = async (importString: string) => {

    const root = await protobuf.load("authenticator.proto");
    const MigrationPayload = root.lookupType("googleauth.MigrationPayload");
    const msg = MigrationPayload.decode(Buffer.from(decodeURIComponent(importString), "base64"));
    
    const data = MigrationPayload.toObject(msg, {
        longs: String,
        enums: String,
        bytes: String
    });

    const base32 = new Base32();

    const allAccounts = data.otpParameters.map((account: any) => {
        const secret = base32.encode( Buffer.from(account.secret, "base64") );
        return {
            ...account,
            secret: secret
        }
    });

    return allAccounts;
}
