/**
 * Update: Responsive!
 * This is a component to use in /pages/transfer + /pages/profile/[walletAddres]
 * This is the transaction history component
 */
import { useContract, useContractEvents, useAddress } from "@thirdweb-dev/react"
import { TRANSFER_CONTRACT_ADDRESS } from "../const/addresses"
import { Box, Heading, Card, Text, Flex, Spinner, Tag, Code, Stack } from "@chakra-ui/react";
import { ethers } from "ethers"
import { useEffect, useState } from "react"

export default function Events() {
    // Get the current user's wallet address
    const address = useAddress();
    // Shorten the address displayed
    function truncateAddress(address: string) {
        return `${address.substring(0, 12)}...${address.substring(address.length - 4)}`;
    };
    // RPC of Sepolia chain, one node of the whole chain (decentralized)
    const RPC = "https://1rpc.io/sepolia";
    // Intergrate ethers library with Sepolia RPC
    const provider = new ethers.providers.JsonRpcProvider(RPC);

    const {
        contract
    } = useContract(TRANSFER_CONTRACT_ADDRESS);
    // Important: useContractEvents --> returns important data such as transactionHash, blockNumber, from-to wallet address,... (look at ContractEvent of ThirdWeb to know more!)
    const {
        data: events,
        isLoading: isEventsLoading
    } = useContractEvents(
        contract,
        "TransactionCompleted",
        // Filter the blocks
        {
            queryFilter: {
                // Things happen in 1-2 days recently
                fromBlock: -7000
            }
        }
    );

    const [eventCards, setEventCards] = useState<JSX.Element[] | null>(null);
    // After the getting the events using API, display the component
    useEffect(() => {
        if (!isEventsLoading && events) {
            // Use Async and Await API
            const fetchEventCards = async () => {
                const cards = await Promise.all(
                    // Loop through events map, with each index
                    events
                    // Filter the events, only display the transaction if the current user's wallet address matches the to or from address
                    .filter((event: any) => event.data.sender === address || event.data.receiver === address)
                    // Structure the events based on index
                    .map(async (event: any) => {
                        // Get block number
                        const block = await provider.getBlock(event.transaction.blockNumber);
                        return (
                            // Structure of each Transaction History Card
                            <Card p={8} my={4} boxShadow="2xl" borderRadius="lg" bg="gray.50" w={{ base: "100%", md: "auto" }}>
                                <Stack spacing={2}>
                                    <Text fontSize={"md"}>Transaction Hash: <Code fontWeight={"semibold"}>{truncateAddress(event.transaction.transactionHash)}</Code></Text>
                                    <Flex flexDirection={{ base: "column", md: "row" }} alignItems={"center"}>
                                        <Text mr={2} fontSize={"md"}>Status</Text>
                                        <Tag size="lg" borderRadius="full" variant="solid" colorScheme="yellow" fontSize={"md"} color={"black.500"}>{event.eventName}</Tag>
                                    </Flex>
                                    <Text fontSize={"md"}>Block Number: <Code fontWeight={"semibold"}>{event.transaction.blockNumber}</Code></Text>
                                    <Flex flexDirection={{ base: "column", md: "row" }} alignItems={"center"}>
                                        <Text mr={2} fontSize={"md"}>From</Text>
                                        <Tag size="lg" borderRadius="full" variant="solid" colorScheme="yellow" fontSize={"md"} color={"black.500"}>{truncateAddress(event.data.sender)}</Tag>
                                        <Text mx={2} fontSize={"lg"}>To</Text>
                                        <Tag size="lg" borderRadius="full" variant="solid" colorScheme="yellow" fontSize={"md"} color={"black.500"}>{truncateAddress(event.data.receiver)}</Tag>
                                    </Flex>
                                    <Text fontSize={"md"}>Message: <Box as="span" fontWeight="semibold">"{event.data.message}"</Box></Text>
                                    <Text fontSize={"md"}>Amount: <Box as="span" fontWeight="semibold">{ethers.utils.formatEther(event.data.amount)}</Box></Text>
                                    <Text fontSize={"md"}>Timestamp: <Box as="span" fontWeight="semibold">{new Date(block.timestamp * 1000).toLocaleString()}</Box></Text>
                                </Stack>
                            </Card>
                        );
                    })
                );
                // Sort the transaction history based on chronological order (latest first)
                setEventCards(cards.reverse());
            };
            fetchEventCards();
        }
    }, [isEventsLoading, events, address]);

    return (
        <Box mt={20} w="100%">
            <Heading fontSize={"xl"}>Recent Transfer:</Heading>
            {!isEventsLoading ? eventCards : <Spinner />}
        </Box>
    )
}
