/**
 * Update: Responsive!
 * This is a component to use in /pages/index
 * This is the step-by-step instruction of how to transfer token from one to another
 */
import { Card, Flex, Heading, Stack, Text } from "@chakra-ui/react";

// Interface props which require step, title and description
type Props = {
    step: string;
    title: string;
    desc: string;
};

const FeatureCard: React.FC<Props> = ({ step, title, desc }) => {
    return (
        <Card px={8} py={10}>
            <Stack spacing={8}>
                <Flex flexDirection={"row"} alignItems={"center"}>
                    <Text fontSize={"lg"} mr={4}>{step}</Text>
                    <Heading fontSize={"2xl"}>{title}</Heading>
                </Flex>
                <Text fontSize={"lg"} ml={10}>
                    {desc}
                </Text>
            </Stack>
        </Card>
    )
};

export default FeatureCard;
