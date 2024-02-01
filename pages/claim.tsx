/**
 * Update: Responsive!
 * This is Faucet page
 */
import { Box, Container, Flex, Heading, SimpleGrid, Stack, Text, useToast } from "@chakra-ui/react";
import { MediaRenderer, Web3Button, useContract, useContractMetadata, useAddress } from "@thirdweb-dev/react";
import { CLAIM_TOKEN_CONTRACT_ADDRESS, CLAIM_TOKEN_IMAGE } from "../const/addresses";

export default function ClaimPage() {
    // Get the SCI smart contract address
    const {
        contract
    } = useContract(CLAIM_TOKEN_CONTRACT_ADDRESS);
    // Get token's info: symbol, value,...
    const {
        data: contractMetadata,
    } = useContractMetadata(contract);
    // Fixed token claimed each time
    const claimAmount = 10;
    // Message prompted using useToast() by charkra ui
    const toast = useToast();

    return (
        <Container maxW={"1440px"} pt={10}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} h={{ base: "auto", md: "50vh"}}>
                <Flex justifyContent={"center"}>
                    <MediaRenderer
                        src={CLAIM_TOKEN_IMAGE}
                        height='80%'
                        width='80%'
                    />
                </Flex>
                <Flex flexDirection={"column"} justifyContent={"center"}>
                    <Stack spacing={8}>
                        <Heading fontSize={"5xl"}>Claim Swinburne {contractMetadata?.name}</Heading>
                        <Text fontSize={"xl"}>This is the main currency for to-be-developed NFTs trading. Use this token to test and try the transfer feature for future airdrop!</Text>
                        <Text fontWeight={"bold"}>{claimAmount} ${contractMetadata?.symbol} tokens each faucet and up to {claimAmount*10} ${contractMetadata?.symbol} tokens per wallet!</Text>
                        <Box>
                            <Web3Button
                                contractAddress={CLAIM_TOKEN_CONTRACT_ADDRESS}
                                action={(contract) => contract.erc20.claim(claimAmount)}
                                // Pop up pending message
                                onSubmit={() => toast({
                                    title: 'Claim Pending',
                                    description: 'Waiting for pending transactions!',
                                    status: 'loading',
                                })}
                                // Pop up successful message
                                onSuccess={() => toast({
                                    title: 'Claim Successful',
                                    description: "You have successfully claimed tokens!",
                                    status: 'success',
                                    duration: 9000,
                                    isClosable: true,
                                })}
                                // Pop up failed message
                                onError={() => toast({
                                    title: 'Claim Failed',
                                    description: "You are not eligible for claiming tokens!",
                                    status: 'error',
                                    duration: 9000,
                                    isClosable: true,
                                })}
                                style={{ backgroundColor: "orange", color: "black" }}
                            >Claim Token</Web3Button>
                        </Box>
                    </Stack>
                </Flex>
            </SimpleGrid>
        </Container>
    );
};
