import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import { Flex, Heading, Text } from "@radix-ui/themes";

export function OwnedObjects() {
  const account = useCurrentAccount();
  const { data, isPending, error } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address as string,
      options: { showContent: true, showType: true },
      filter: {
        Package:
          "0xbf3dd44668fcc8cbc740f8a3ed5fb2af0d02abbe3a8fbf452331921e82dfc6b9",
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
        <Text>No objects owned by the connected wallet</Text>
      ) : (
        <Heading size="4">Objects owned by the connected wallet</Heading>
      )}
      {data.data.map((object) => (
        <Flex
          key={object.data?.objectId}
          direction="column"
          style={{
            border: "1px solid #e2e8f0", // gray-300
            borderRadius: "8px",
            padding: "8px",
            marginBottom: "8px",
          }}
        >
          <Text>Object Type: {JSON.stringify(object.data?.type)}</Text>
          <Text>Object ID: {object.data?.objectId}</Text>
        </Flex>
      ))}
    </Flex>
  );
}
