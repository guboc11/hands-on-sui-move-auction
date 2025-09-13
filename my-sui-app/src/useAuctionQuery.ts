import {
  getFullnodeUrl,
  SuiClient,
  SuiObjectResponse,
} from "@mysten/sui/client";
import { useEffect, useState } from "react";
import { PACKAGE } from "./config";

export function useAuctionQuery() {
  const [auctionObjects, setAuctionObjects] = useState<SuiObjectResponse[]>();

  async function getAuctionObjects() {
    const client = new SuiClient({ url: getFullnodeUrl("testnet") });
    const events = await client.queryEvents({
      query: {
        MoveEventType: `${PACKAGE}::auction::AuctionCreatedEvent`,
      },
      limit: 10,
    });

    const auctionIds: string[] = events.data.flatMap((event) => {
      const id = event.parsedJson?.auction_id;

      if (!id) return []; // 없으면 스킵
      if (Array.isArray(id)) return id; // 배열이면 그대로
      if (typeof id === "string") return [id]; // 문자열이면 배열로 감싸기

      return []; // 다른 타입은 무시
    });

    let auctions = await client.multiGetObjects({
      ids: auctionIds,
      options: { showContent: true },
    });
    console.log("holsdofhsodfhos", auctions);
    setAuctionObjects(auctions);
  }

  useEffect(() => {
    getAuctionObjects();
  }, []);

  return { auctionObjects: auctionObjects };
}
