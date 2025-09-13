import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { useAuctionQuery } from "./useAuctionQuery";
import { PACKAGE } from "./config";

export function AuctionObjects() {
  const account = useCurrentAccount();
  const { auctionObjects } = useAuctionQuery();
  const { data, isPending, error } = useSuiClientQuery(
    "queryEvents",
    {
      query: {
        MoveEventType: `${PACKAGE}::auction::AuctionCreatedEvent`,
      },
    },
    {
      enabled: !!account,
    },
  );
  if (!account) {
    return;
  }

  if (error) {
    return <Flex>Error: {error.message}</Flex>;
  }

  if (isPending || !data) {
    return <Flex>Loading...</Flex>;
  }

  return (
    <Flex direction="column" my="2">
      {data.data.length === 0 ? (
        <Text>No Auction objects</Text>
      ) : (
        <Heading size="4">Auction Objects</Heading>
      )}
      {auctionObjects?.map((auction) => (
        <Box
          id={auction.data?.objectId}
          style={{
            border: "1px solid #e2e8f0", // gray-300
            borderRadius: "8px",
            padding: "8px",
            marginBottom: "8px",
          }}
        >
          <Text>{JSON.stringify(auction.data?.content, null, 2)}</Text>
        </Box>
      ))}
    </Flex>
  );
}
