/**
 * Update: Responsive!
 * This is a component to use in /pages/transfer
 * This looks like a form when many components attached
 */
import { Box, Card, Flex, Heading, Input, Text, Select } from "@chakra-ui/react";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { CLAIM_TOKEN_CONTRACT_ADDRESS, TRANSFER_CONTRACT_ADDRESS, TRANSFER_TOKEN_ADDRESS } from "../const/addresses";
import { useState } from "react";
import TokenSelection from "./TokenSelection";
import TokenBalance from "./TokenBalance";
import TransferButton from "./TransferButton";

export default function TransferCard() {
    // Get the wallet address (sender)
    const address = useAddress();
    // Use hook to apply and interact with contract
    const {
        contract
    } = useContract(TRANSFER_CONTRACT_ADDRESS);
    // Read function of contract to view the information of the contract such as owner, verifiedTokensList
    const {
        // Get back an array of verifiedTokens (array of contract address)
        data: verifiedTokens,
        isLoading: isVerifiedTokensLoading,
    } = useContractRead(contract, "getVerifiedTokens");

    const [selectedToken, setSelectedToken] = useState("");
    const [filter, setFilter] = useState("both"); // Add this line

    // Form for user input
    const [formData, setFormData] = useState({
        receiver: '', // Empty string
        amount: '',
        message: '',
    });

    // Function to handle change of input, continuously keep track with input in each field
    const handleChange = (e: any, name: any) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: e.target.value
        }))
    }

    const handleTokenSelection = (tokenAddress: string) => {
        setSelectedToken(tokenAddress);
    }

    // Filter tokens based on the filter selection
    // Filter tokens based on the filter selection
    let filteredTokens = [];
    if (verifiedTokens) {
        filteredTokens = verifiedTokens.filter((tokenAddress: string) => {
            if (filter === "transfer" && tokenAddress !== TRANSFER_TOKEN_ADDRESS) {
                return false;
            }
            if (filter === "claim" && tokenAddress !== CLAIM_TOKEN_CONTRACT_ADDRESS) {
                return false;
            }
            return true;
        });
    }


    return (
        <Card w={{ base: "100%", md: "50%"}} p={20}>
            <Heading>Transfer</Heading>

            <Text mt={4}>Filter Token:</Text>

            <Select defaultValue="both" onChange={(e) => setFilter(e.target.value)} focusBorderColor="yellow">
                <option value="both">All available tokens</option>
                <option value="transfer">Transfer-only Protocol</option>
                <option value="claim">Mintable Protocol</option>
            </Select>


            <Flex flexDirection={"row"} mt={4}>
                {!isVerifiedTokensLoading && filteredTokens.map((tokenAddress: string) => (
                    <Box key={tokenAddress} onClick={() => handleTokenSelection(tokenAddress)}>
                        <TokenSelection
                            tokenAddress={tokenAddress}
                            isSelected={selectedToken === tokenAddress}
                        />
                    </Box>
                ))}
            </Flex>

            <TokenBalance tokenAddress={selectedToken} />
            <Text mt={4}>Send to:</Text>
            {/**
             * Input fields: Receiver -> Amount -> Message
             */}
            <Input
                placeholder="0x000000000"
                type="text"
                value={formData.receiver}
                onChange={(event) => handleChange(event, "receiver")}
            />
            <Text mt={4}>Amount:</Text>
            <Input
                placeholder="0.0"
                type="number"
                value={formData.amount}
                onChange={(event) => handleChange(event, "amount")}
            />
            <Text mt={4}>Message:</Text>
            <Input
                placeholder="Enter your message here"
                type="text"
                value={formData.message}
                onChange={(event) => handleChange(event, "message")}
            />
            <Box mt={8}>
                {address ? (
                    <TransferButton
                        tokenAddress={selectedToken}
                        receiver={formData.receiver}
                        amount={formData.amount.toString()}
                        message={formData.message}
                    />
                ) : (
                    <Text>Please connect your wallet to make a transfer.</Text>
                )}
            </Box>
        </Card>
    )
}
