/**
 * Update: Responsive!
 * This is This is a component to use in /components/TransferCard
 * This helps determine the state and the shape of verified token when be and not be clicked
 */
import { Box, Card, Spinner, Text } from "@chakra-ui/react";
import { useContract, useContractMetadata } from "@thirdweb-dev/react";

// Get two values: token address and (boolean) isSelected
type Props = {
    tokenAddress: string;
    isSelected?: boolean;
};

const TokenSelection: React.FC<Props> = ({ tokenAddress, isSelected }) => {
    // Get token contract address
    const {
        contract
    } = useContract(tokenAddress);
    // Get token info
    const {
        data: contractMetadata,
        isLoading: isContractMetadataLoading,
    } = useContractMetadata(contract);

    // Default state border
    let coinBorderColor = "gray.100";
    // Clicked state border
    if (isSelected) {
        coinBorderColor = "black.500";
    }

    return (
        <Card bg={"orange"} p={4} mr={{ base: 2, md: 2 }} border={"2px solid"} borderColor={coinBorderColor} w={{ base: "auto", md: "auto" }}>
            {!isContractMetadataLoading ? (
                <Box>
                    <Text>{contractMetadata?.symbol}</Text>
                </Box>
            ) : (
                <Spinner />
            )}
        </Card>
    );
};

export default TokenSelection;
