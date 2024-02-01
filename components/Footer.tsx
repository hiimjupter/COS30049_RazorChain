/**
 * Update: Responsive!
 * This is the footer
 */
import { Container, Image, Divider, Text, ButtonGroup, IconButton, Stack } from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Logo from '../assets/[RazorChain]FullLogo.svg'

export default function Footer() {
    return (
        <Container as="footer" role="contentinfo" maxW={"100%"} height={"100px"} mt={'20'}>
            <Divider />
            <Container maxW={"1440px"} py={4}>
                <Stack spacing={{ base: '10', md: '2' }}>
                    <Stack direction={{ base: "column", md: "row" }} align="center" justify={"center"} spacing={{ base: '4', md: '0' }}>
                        <Image boxSize={{ base: "100px", md: "150px" }} h={"12vh"} src={Logo.src} alt="RazorChain Logo" mr={'15'} />
                        <ButtonGroup variant="tertiary">
                            <IconButton as="a" href="#" aria-label="LinkedIn" icon={<FaLinkedin />} />
                            <IconButton as="a" href="#" aria-label="GitHub" icon={<FaGithub />} />
                            <IconButton as="a" href="#" aria-label="Twitter" icon={<FaTwitter />} />
                        </ButtonGroup>
                    </Stack>
                    <Text fontSize="sm" color="fg.subtle" align={"center"}>
                        © {new Date().getFullYear()} RazorChain DApp, Inc. All rights reserved.
                    </Text>
                </Stack>
            </Container>
        </Container>
    )
};
