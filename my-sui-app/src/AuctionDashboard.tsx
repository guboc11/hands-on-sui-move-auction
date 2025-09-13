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
            <Flex gap="4">
              <Button>create_auction</Button>
              <TextField.Root>
                <TextField.Slot>item</TextField.Slot>
              </TextField.Root>
            </Flex>
            <Flex gap="4">
              <Button>create_bid</Button>
            </Flex>
            <Flex gap="4">
              <Button>bid</Button>
              <TextField.Root>
                <TextField.Slot>auction</TextField.Slot>
              </TextField.Root>
              <TextField.Root>
                <TextField.Slot>bid</TextField.Slot>
              </TextField.Root>
            </Flex>
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
