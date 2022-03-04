import { SignedPayload } from "@thirdweb-dev/sdk";

export default function useClaimLink(claim?: SignedPayload) {
  if (!claim) {
    return "";
  }

  const str = JSON.stringify(claim);
  const base64 = Buffer.from(str).toString("base64");

  return `${window.location.origin}/claim?sig=${base64}`;
}
