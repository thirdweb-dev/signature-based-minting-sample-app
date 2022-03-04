import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";
import { generateSignature } from "../../lib/generateSignature";

const RPC_URL = process.env.RPC_URL as string;
const NEXT_PUBLIC_CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS as string;

const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    process.env.PKEY as string,
    ethers.getDefaultProvider(RPC_URL)
  ),
  {
    readonlySettings: {
      rpcUrl: RPC_URL,
    },
  }
);

const module = sdk.getNFTCollection(NEXT_PUBLIC_CONTRACT_ADDRESS);

export default async function qr(req: NextApiRequest, res: NextApiResponse) {
  const result = await generateSignature(module);
  return res.status(200).json(result);
}