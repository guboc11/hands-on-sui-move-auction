import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
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
import { useState } from "react";
import { Transaction } from "@mysten/sui/transactions";
import { PACKAGE } from "./config";

export function AuctionDashboard() {
  const account = useCurrentAccount();
  const [item, setItem] = useState("");
  const [auction, setAuction] = useState("");
  const [bid, setBid] = useState("");

  const { mutate: signAndExcuteTransaction } = useSignAndExecuteTransaction();

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
              <Button
                onClick={() => {
                  const tx = new Transaction();
                  tx.moveCall({
                    package: PACKAGE,
                    module: "auction",
                    function: "create_item",
                  });
                  signAndExcuteTransaction({ transaction: tx });
                }}
              >
                create_item
              </Button>
            </Box>
            <Flex gap="4">
              <Button>create_auction</Button>
              <TextField.Root
                value={item}
                onChange={(e) => setItem(e.target.value)}
              >
                <TextField.Slot>item</TextField.Slot>
              </TextField.Root>
            </Flex>
            <Flex gap="4">
              <Button>create_bid</Button>
            </Flex>
            <Flex gap="4">
              <Button>bid</Button>
              <TextField.Root
                value={auction}
                onChange={(e) => setAuction(e.target.value)}
              >
                <TextField.Slot>auction</TextField.Slot>
              </TextField.Root>
              <TextField.Root
                value={bid}
                onChange={(e) => setBid(e.target.value)}
              >
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
