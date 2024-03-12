import { Card, Heading, Input, Text, Box } from "@chakra-ui/react";
import { useAddress, useContract, useContractEvents } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";
import UpdateButton from "./UpdateButton";
import { USER_INFO_UPDATE } from "../const/addresses";

export default function UpdateCard() {
    const address = useAddress();
    const { contract } = useContract(USER_INFO_UPDATE);

    const [formData, setFormData] = useState({ name: '', email: '', phone_number: '' });

    const { data: events, isLoading: isEventsLoading } = useContractEvents(
        contract,
        "InfoUpdated",
        {
            queryFilter: {
                filters: { addr: address },
                order: "desc",
            },
            subscribe: true,
        }
    );

    useEffect(() => {
        if (!isEventsLoading && events && events.length > 0) {
            const latestName = events[0].data.name;
            const latestEmail = events[0].data.email;
            const latestPhone = events[0].data.phone_number;

            setFormData({ name: latestName, email: latestEmail, phone_number: latestPhone });
        }
    }, [isEventsLoading, events]);

    const handleChange = (e: any, name: any) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: e.target.value
        }));
    }

    return (
        <Card w={{ base: "100%", md: "50%"}} p={20}>
            <Heading>User Information</Heading>
            <InputField label="Full name" value={formData.name} onChange={(event) => handleChange(event, "name")} />
            <InputField label="Email Address" value={formData.email} onChange={(event) => handleChange(event, "email")} />
            <InputField label="Phone Number" value={formData.phone_number} onChange={(event) => handleChange(event, "phone_number")} />
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

const InputField = ({ label, value, onChange }: { label: string, value: string, onChange: (event: any) => void }) => (
    <>
        <Text mt={4}>{label}:</Text>
        <Input
            placeholder={`Your ${label.toLowerCase()}`}
            type="text"
            value={value}
            onChange={onChange}
        />
    </>
);
