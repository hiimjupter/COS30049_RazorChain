/**
 * Update: Responsive!
 * This is a component to use in /pages/profile/[walletAddress]
 * It is a card showing token symbol and wallet balance
 */
import { Card, Spinner, Stack, Text } from "@chakra-ui/react";
import { useAddress, useContract, useContractEvents, useContractMetadata, useTokenBalance } from "@thirdweb-dev/react";

// Must get tokenAddress to get verifiedTokensList
type Props = {
    tokenAddress: string;
};

export default function BalanceCard({ tokenAddress }: Props) {
    // Get current user's address
    const address = useAddress();
    // Get token smart contract address
    const {
        contract
    } = useContract(tokenAddress);
    // Get token's info such as name, symbol, decimals,...
    const {
        data: contractMetadata,
        isLoading: isContractMetadataLoading,
    } = useContractMetadata(contract);
    // Check wallet balance of current user according to that token
    const {
        data: tokenBalance,
        isLoading: isTokenBalanceLoading,
    } = useTokenBalance(contract, address);

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
            {!isContractMetadataLoading ? (
                <Stack textAlign={"center"}>
                    <Text fontWeight={"bold"} fontSize={"2xl"}>{contractMetadata?.symbol}</Text>
                    <Text>Balance:</Text>
                    {!isTokenBalanceLoading ? (
                        <Text fontSize={"3xl"} fontWeight={"bold"}>{tokenBalance?.displayValue}</Text>
                    ) : (
                        <Spinner />
                    )}
                </Stack>
            ) : (
                <Spinner />
            )}
        </Card>
    )
}
