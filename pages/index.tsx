/**
 * Update: Responsive!
 * This is Home page, redirect by clicked on the Logo on navbar
 */
import { Box, Button, Container, Flex, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { MediaRenderer } from "@thirdweb-dev/react";
import { NextPage } from "next";
import Link from "next/link";
import { TRANSFER_CRYPTO_URL, STEPS_URL } from "../const/addresses"
import FeatureCard from "../components/FeatureCard";


const Home: NextPage = () => {
  return (
    <Container maxW={"1440px"} py={4}>
      <Flex flexDirection={{ base: "column", md: "row" }} h={{ base: "auto", md: "60vh" }}>
        <Flex flexDirection={"column"} justifyContent={"center"} w={{ base: "100%", md: "60%" }}>
          <Stack spacing={4}>
            <Heading fontSize={"xl"}>Transfer Token</Heading>
            <Heading fontSize={"6xl"}>
              Send tokens to your friends and family with ease!
            </Heading>
            <Text fontSize={"xl"}>
              Select from loads of tokens to transfer.
            </Text>
            <Link href={"/transfer"}>
              <Button colorScheme={"blue"}>Make a Transfer</Button>
            </Link>
          </Stack>
        </Flex>
        <Box mt={{ base: 4, md: 0 }} w={{ base: "100%", md: "40%" }}>
          <MediaRenderer
            src={TRANSFER_CRYPTO_URL}
            height="100%"
            width="100%"
            alt="RazorChain Logo"
          />
        </Box>
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={4}>
        <Flex>
          <MediaRenderer
            src={STEPS_URL}
            height="100%"
            width="80%"
            alt="RazorChain Logo"
          />
        </Flex>
        <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
          <Stack spacing={4}>
            <FeatureCard
              step={"01"}
              title={"Select a Token"}
              desc={"Select from a bunch of verified tokens from the drop down to send to your friends and family."}
            />
            <FeatureCard
              step={"02"}
              title={"Who to Send To"}
              desc={"Enter the wallet address of the person you want to send the token to. This is non-reversible so make sure you enter the right address."}
            />
            <FeatureCard
              step={"03"}
              title={"Write a Message"}
              desc={"Write a message to go along with your token transfer. This is recommended since it's always nice to send a message to your friends and family."}
            />
          </Stack>
        </Flex>
      </SimpleGrid>
    </Container>
  );
};

export default Home;
