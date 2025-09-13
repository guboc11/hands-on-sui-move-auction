import { useCurrentAccount } from "@mysten/dapp-kit";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import { OwnedObjects } from "./OwnedObjects";
import { AuctionObjects } from "./AuctionObjects";

export function AuctionDashboard() {
  const account = useCurrentAccount();

  return (
    <Container my="2">
      <Heading mb="2">Auction Dashboard</Heading>

      {account ? (
        <div>
          <Flex direction="column">
            <Text>Wallet connected</Text>
            <Text>Address: {account.address}</Text>
          </Flex>
          <Flex direction="column" gap="4">
            <Box>
              <Button>create_item</Button>
            </Box>
            <Box>
              <Button>create_auction</Button>
            </Box>
            <Box>
              <Button>create_bid</Button>
            </Box>
            <Box>
              <Button>bid</Button>
            </Box>
          </Flex>
        </div>
      ) : (
        <Text>Wallet not connected</Text>
      )}

      <Heading mb="2">Auction Objects</Heading>
      <AuctionObjects />

      <Heading mb="2">Owned Objects</Heading>
      <OwnedObjects />
    </Container>
  );
}
