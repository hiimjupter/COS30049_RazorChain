/**
 * Update: Responsive!
 * This is a component to use in /pages/profile/[walletAddress]
 * It is a card showing token symbol and wallet balance
 */
import { Card, Spinner, Stack, Text } from "@chakra-ui/react";
import { useAddress, useContract, useContractEvents, useContractMetadata, useTokenBalance } from "@thirdweb-dev/react";

// Must get tokenAddress to get verifiedTokensList
type Props = {
    symbol: string;
    balance: number;
};

export default function BalanceCard({ symbol, balance }: Props) {
    // Get current user's address
    const address = useAddress();

    /**
     * const {
        data: events,
        isLoading: isEventsLoading,
    } = useContractEvents(
        contract,
        "get"
    );
     */

    return (
        <Card p={4} width={"100%"} height={"100%"} border={"2px solid"} borderColor={"gray.100"}>
            {/**
             * Check if contract meta is loading, display the stack after done
             * Show the symbol of token
             * Show the wallet balance after loading tokenbalance
             */}
            <Stack textAlign={"center"}>
                <Text fontWeight={"bold"} fontSize={"2xl"}>{symbol}</Text>
                <Text>Balance:</Text>
                <Text fontSize={"3xl"} fontWeight={"bold"}>{balance}</Text>
            </Stack>
        </Card>
    )
}
