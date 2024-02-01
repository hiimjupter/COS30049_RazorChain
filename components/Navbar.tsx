/**
 * Update: Responsive!
 * This is the navbar
 */
import Logo from '../assets/[RazorChain]FullLogo.svg'
import { Container, Flex, Text, Image, Stack, useBreakpointValue } from "@chakra-ui/react";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Link from "next/link"


export default function Navbar() {
    const address = useAddress();
    const isMobile = useBreakpointValue({ base: true, md: false }); // Add this line

    return (
        <Container maxW={"1440px"} py={4}>
            <Flex flexDirection={{ base: "column", md: "row" }} justifyContent={"space-between"} alignItems={"center"}>
                <Link href={"/"}>
                    <Image boxSize={"200px"} h={"10vh"} w={"15vh"} src={Logo.src} alt="RazorChain Logo" mr={'15'} />
                </Link>
                {/**
                 * Must connect Wallet to see  the linking pages
                 */}
                {address && (
                    <Stack direction={isMobile ? "column" : "row"} spacing={4}> {/* Modify this line */}
                        <Link href={"/about"}>
                            <Text fontWeight={"bold"} mr={8}>Verified Tokens</Text>
                        </Link>
                        <Link href={"/transfer"}>
                            <Text fontWeight={"bold"} mr={8}>Transfer</Text>
                        </Link>
                        <Link href={"/claim"}>
                            <Text fontWeight={"bold"} mr={8}>Faucet</Text>
                        </Link>
                        <Link href={"/profile/${address}"}>
                            <Text fontWeight={"bold"}>My Account</Text>
                        </Link>
                    </Stack>
                )}
                <ConnectWallet />
            </Flex>
        </Container>
    )
}
