/**
 * Update: Responsive!
 * This is This is a component to use in /components/TransferCard
 * It is the token balance
 */
import { Box, Text } from "@chakra-ui/react";
import { useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";

type Props = {
    tokenAddress: string;
};

const TokenBalance: React.FC<Props> = ({ tokenAddress }) => {
    // Need wallet address to check balance for
    const address = useAddress();
    // Check balance of specific token using token Address
    const {
        contract
    } = useContract(tokenAddress);
    // Get the token balance
    const {
        data: balance,
        isLoading: isBalanceLoading
    } = useTokenBalance(contract, address)

    return (
        <Box mt={4}>
            {!isBalanceLoading && (
                <Text>Balance: {balance?.displayValue}</Text>
            )}
        </Box>
    )
};

export default TokenBalance;
