/**
 * Update: Responsive!
 * This is This is a component to use in /components/TransferCard
 * This his the web3 button. Clicked to transfer
 * This button handle many events --> a seperate important component
 */
import { Web3Button, useContract } from "@thirdweb-dev/react";
import { USER_INFO_UPDATE } from "../const/addresses";
import { useToast, Box } from "@chakra-ui/react";

// Determine required info depended on the selected token
type Props = {
    name: string;
    email: string;
    phone_number: string;
};

const UpdateButton: React.FC<Props> = ({ name, email, phone_number }) => {
    // Get the transfer contract
    const {
        contract: updateContract
    } = useContract(USER_INFO_UPDATE)
    // Message prompted using useToast()
    const toast = useToast();

    return (
        <Box w={{ base: "100%", md: "auto" }}>
            <Web3Button
                contractAddress={USER_INFO_UPDATE}
                // ERC20 standards require Token contract approval before Transfer contract approved
                action={async() => {
                    // Allowance for transfer Contract
                    await updateContract?.call(
                        "updateUserInfo",
                        [
                            name,
                            email,
                            phone_number
                        ]
                    );
                }}
                // Pop up pending message
                onSubmit={() => toast({
                    title: 'Update Pending',
                    description: 'Waiting for update transactions!',
                    status: 'loading',
                    duration: 1500,
                    isClosable: true,
                })}
                // Pop up successful message
                onSuccess={() =>
                    toast({
                        title: 'Update Successful',
                        description: "You have successfully updating personal information!",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    })}
                // Pop up failed message
                onError={(error) =>
                    toast({
                        title: 'Update Failed',
                        description: error.message.split('\n').find(line => line.startsWith('Reason:')),
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    })}
                style={{ backgroundColor: "orange", color: "black" }}
            >Update Info</Web3Button>
        </Box>
    );
};

export default UpdateButton;
