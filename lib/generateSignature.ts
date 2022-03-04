import { NFTCollection } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

export const generateSignature = async (module: NFTCollection) => {
  const { payload, signature } = await module.signature.generate({
    metadata: {
      name: `Some New NFT ${btoa(Math.random().toString()).substr(10, 5)}`,
      properties: {
        issuedAt: Math.floor(Date.now() / 1000),
      },
    },
    price: 0,
    currencyAddress: ethers.constants.AddressZero,
    mintStartTime: new Date(0),
    mintEndTime: new Date(Date.now() + 60 * 1000),
    to: "0x0000000000000000000000000000000000000000",
  });

  return {
    payload,
    signature,
  };
};
