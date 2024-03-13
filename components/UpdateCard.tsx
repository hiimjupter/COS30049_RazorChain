import { Card, Heading, Input, Text, Box } from "@chakra-ui/react";
import { useAddress, useContract } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";
import UpdateButton from "./UpdateButton";
import { USER_INFO_UPDATE } from "../const/addresses";

export default function UpdateCard() {
    const address = useAddress();
    const { contract } = useContract(USER_INFO_UPDATE);

    const [formData, setFormData] = useState({ name: '', stu_id: '', email: '', phone_number: '' });

    // const { data: events, isLoading: isEventsLoading } = useContractEvents(
    //     contract,
    //     "InfoUpdated",
    //     {
    //         queryFilter: {
    //             filters: { addr: address },
    //             order: "desc",
    //         },
    //         subscribe: true,
    //     }
    // );

    useEffect(() => {
        // Only set form data if it's empty
        if (!formData.name && !formData.stu_id && !formData.email && !formData.phone_number) {
            const latestName = "Latest Full Name";
            const latestStu = "Latest Student ID";
            const latestEmail = "Latest Email";
            const latestPhone = "Lastest Phone Number";

            setFormData({ name: latestName, stu_id: latestStu, email: latestEmail, phone_number: latestPhone });
        }
    });

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
            <InputField label="Student ID" value={formData.stu_id} onChange={(event) => handleChange(event, "stu_id")} />
            <InputField label="Email Address" value={formData.email} onChange={(event) => handleChange(event, "email")} />
            <InputField label="Phone Number" value={formData.phone_number} onChange={(event) => handleChange(event, "phone_number")} />
            <Box mt={8}>
                {address ? (
                    <UpdateButton
                        name={formData.name}
                        stu_id={formData.stu_id}
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
