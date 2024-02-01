/**
 * Update: Responsive!
 * This is a Verified Tokens page
 */
import { Box, Button, Container, Flex, Heading, Stack, Text, useToken } from "@chakra-ui/react";
import { MediaRenderer } from "@thirdweb-dev/react";
import Link from "next/link";
import { RAZORCOIN, CATINU, TRANSFER_TOKEN_ADDRESS, CLAIM_TOKEN_CONTRACT_ADDRESS } from "../const/addresses"
import { useContract, useTokenSupply } from "@thirdweb-dev/react";

export default function About() {
    // Get RZC token smart wallet address
    const {
        contract: RazorCoin
    } = useContract(TRANSFER_TOKEN_ADDRESS);
    // Get SCI token smart wallet address
    const {
        contract: CatInu
    } = useContract(CLAIM_TOKEN_CONTRACT_ADDRESS);
    // Get total supply of RZC
    const {
        data: rzcTotalSupply,
    } = useTokenSupply(RazorCoin);
    // Get total supply of SCI
    const {
        data: sciTotalSupply,
    } = useTokenSupply(CatInu);


    return (
        <Container maxW={"1440px"} py={4}>
        <Flex flexDirection={{ base: "column", md: "row" }} h={{ base: "auto", md: "50vh" }}>
            <Flex flexDirection={"column"} justifyContent={"center"} w={{ base: "100%", md: "60%" }}>
            <Stack spacing={4}>
                <Heading fontSize={"xl"}>Total Circulating Supply: {rzcTotalSupply?.displayValue}</Heading>
                <Heading fontSize={"6xl"}>
                    ${rzcTotalSupply?.symbol}
                </Heading>
                <Text fontSize={"xl"}>
                    {rzcTotalSupply?.name} is an ERC20-standardized peer-to-peer cryptocurrency, favored and circulated within Swinburne. This token is used as budget for developing the operation and infrastructure of the project!
                </Text>
                <Link href={"/transfer"}>
                <Button colorScheme={"blue"}>Make a Transfer</Button>
                </Link>
            </Stack>
            </Flex>
            <Box mt={{ base: 4, md: 0 }} w={{ base: "100%", md: "40%" }}>
                <MediaRenderer
                    src={RAZORCOIN}
                    height="100%"
                    width="100%"
                    alt="RazorChain Logo"
                />
            </Box>
        </Flex>
        <Flex flexDirection={{ base: "column-reverse", md: "row" }} h={{ base: "auto", md: "50vh" }}>
            <Box mt={{ base: 4, md: 0 }} w={{ base: "100%", md: "40%" }}>
                <MediaRenderer
                    src={CATINU}
                    height="100%"
                    width="100%"
                    alt="RazorChain Logo"
                />
            </Box>
            <Flex flexDirection={"column"} justifyContent={"center"} w={{ base: "100%", md: "60%" }}>
            <Stack spacing={4}>
                <Heading fontSize={"xl"}>Total Circulating Supply: {sciTotalSupply?.displayValue}</Heading>
                <Heading fontSize={"6xl"}>
                    ${sciTotalSupply?.symbol}
                </Heading>
                <Text fontSize={"xl"}>
                    {sciTotalSupply?.name} the main currency to trade for Swinburne's merchandise and vouchers. Each wallet can claim up to 100 ${sciTotalSupply?.symbol} tokens. After claiming phase, this token can be topped up by achieving 'Best Performance' awards!
                </Text>
                <Link href={"/claim"}>
                <Button colorScheme={"blue"}>Claim now</Button>
                </Link>
            </Stack>
            </Flex>
        </Flex>
        </Container>
    );
};

