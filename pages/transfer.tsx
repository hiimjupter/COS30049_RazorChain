/**
 * Update: Responsive!
 * This is Transfer page
 */
import { Container, Stack } from "@chakra-ui/react";
import TransferCard from "../components/TransferCard";
import Events from "../components/Events"

export default function TransferPage() {
    return (
        <Container maxW={"1440px"}>
            <Stack spacing={{ base: '4', md: '8' }} alignItems={"center"}>
                <TransferCard />
                <Events />
            </Stack>
        </Container>
    );
}
