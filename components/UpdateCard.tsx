/**
 * Update: Responsive!
 * This is a component to use in /pages/transfer
 * This looks like a form when many components attached
 */
import { Card, Heading, Input, Text, Box } from "@chakra-ui/react";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { useState } from "react";
import UpdateButton from "./UpdateButton";
import { USER_INFO_UPDATE } from "../const/addresses";


export default function UpdateCard() {
    const address = useAddress();

    // Form for user input
    const [formData, setFormData] = useState({
        name: '', // Empty string
        email: '',
        phone_number: '',
    });

    // Function to handle change of input, continuously keep track with input in each field
    const handleChange = (e: any, name: any) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: e.target.value
        }))
    }

    return (
        <Card w={{ base: "100%", md: "50%"}} p={20}>
            <Heading>User Information</Heading>

            <Text mt={4}>Full name:</Text>
            {/**
             * Input fields: Receiver -> Amount -> Message
             */}
            <Input
                placeholder="Your full name"
                type="text"
                value={formData.name}
                onChange={(event) => handleChange(event, "name")}
            />
            <Text mt={4}>Email Address:</Text>
            <Input
                placeholder="Your email"
                type="text"
                value={formData.email}
                onChange={(event) => handleChange(event, "email")}
            />
            <Text mt={4}>Phone Number:</Text>
            <Input
                placeholder="Your phone number"
                type="text"
                value={formData.phone_number}
                onChange={(event) => handleChange(event, "phone_number")}
            />
            <Box mt={8}>
                {address ? (
                    <UpdateButton
                        name={formData.name}
                        email={formData.email}
                        phone_number={formData.phone_number}
                    />
                ) : (
                    <Text>Please connect your wallet to make a transfer.</Text>
                )}
            </Box>
        </Card>
    )
}
