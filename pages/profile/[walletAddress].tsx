/**
 * Update: Responsive!
 * This is a My Account page
 */
import { Avatar, Container, Flex, Heading, SimpleGrid, Spinner, Tag, Text, Box, Stack } from "@chakra-ui/react";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { TRANSFER_CONTRACT_ADDRESS } from "../../const/addresses";
import UpdateCard from "../../components/UpdateCard";
import Events from "../../components/Events"
import BalanceCard from "../../components/BalanceCard";
import UpdateButton from "../../components/UpdateButton";

export default function AccountPage() {
    // Get current user's wallet address
    const address = useAddress();
    // Shorten the address
    function truncateAddress(address: string) {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    };
    // Get the transfer smart contract address
    const {
        contract: transferContract,
    } = useContract(TRANSFER_CONTRACT_ADDRESS);
    // Get function getVerifiedTokens that return list of Verified Tokens (smart contract: string)
    const {
        data: verifiedTokens,
        isLoading: isVerifiedTokensLoading,
    } = useContractRead(
        transferContract,
        "getVerifiedTokens"
    );

    return (
        <Container maxW={"1440px"} py={4}>
            {/**
             * Only display the my account page's components if wallet connected, otherwise, require the user to connect their wallet!
             */}
            {address ? (
                <Flex flexDirection={"row"}>
                    <Flex flexDirection={"column"} mr={{ base: 0, md: 8 }} p={10} mb={{ base: 4, md: 0 }}>
                        <Avatar size={{ base: "xl", md: "2xl" }} mb={4}/>
                        <Tag size="lg" borderRadius="full" variant="solid" colorScheme="yellow" fontSize={{ base: "sm", md: "md" }} color={"black.500"}>{truncateAddress(address)}</Tag>
                    </Flex>
                    <Flex flexDirection={"column"} w={"100%"}>
                        <Heading>Token Balances</Heading>
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mt={4}>
                                <BalanceCard
                                    symbol={"RZC"}
                                    balance={333}
                                />
                                <BalanceCard
                                    symbol={"SCI"}
                                    balance={888}
                                />
                        </SimpleGrid>
                    </Flex>
                </Flex>
            ) : (
                <Flex justifyContent={"center"}>
                    <Text>Connect Wallet</Text>
                </Flex>
            )}
            <Stack spacing={{ base: '4', md: '8' }} alignItems={"center"}>
                <UpdateCard />
            </Stack>
            <Box mt={20} w={"100%"}>
                <Events />
            </Box>
        </Container>
    );
}
