import axios from "axios";

import { AcquiredIdToken, Manifest, VCRequest } from "../types";
import { saveVC } from "./repository/vc";
import { Signer } from "./signer";
import { getVCTypeFromJWT } from "./utils";

interface IIssueResponse {
  data: {
    vc: string;
  };
}

export const issue = async (
  signer: Signer,
  vcRequest: VCRequest,
  manifest: Manifest,
  acquiredAttestation: AcquiredIdToken
): Promise<void> => {
  const issueRequestIdToken = await signer.siop({
    aud: manifest.input.credentialIssuer,
    contract: manifest.display.contract,
    attestations: acquiredAttestation,
  });
  const issueResponse = await axios.post<string, IIssueResponse>(manifest.input.credentialIssuer, issueRequestIdToken, {
    headers: { "Content-Type": "text/plain" },
  });
  const vc = issueResponse.data.vc;
  const vcType = getVCTypeFromJWT(vc);

  // TODO: formatは動的に設定する
  saveVC(vcRequest.presentation_definition.input_descriptors[0].issuance[0].manifest, {
    format: "jwt_vc",
    vc: vc,
    manifest,
    type: vcType,
  });
};
