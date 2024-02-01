/**
 * Update: Responsive!
 * This is This is a component to use in /components/TransferCard
 * This his the web3 button. Clicked to transfer
 * This button handle many events --> a seperate important component
 */
import { Web3Button, useContract } from "@thirdweb-dev/react";
import { TRANSFER_CONTRACT_ADDRESS } from "../const/addresses";
import { ethers } from "ethers";
import { useToast, Box } from "@chakra-ui/react";

// Determine required info depended on the selected token
type Props = {
    tokenAddress: string;
    receiver: string;
    amount: string;
    message: string;
};

const TransferButton: React.FC<Props> = ({ tokenAddress, receiver, amount, message }) => {
    // Get the token contract (selected token)
    const {
        contract: tokenContract
    } = useContract(tokenAddress, "token");
    // Get the transfer contract
    const {
        contract: transferContract
    } = useContract(TRANSFER_CONTRACT_ADDRESS)
    // Message prompted using useToast()
    const toast = useToast();

    return (
        <Box w={{ base: "100%", md: "auto" }}>
            <Web3Button
                contractAddress={TRANSFER_CONTRACT_ADDRESS}
                // ERC20 standards require Token contract approval before Transfer contract approved
                action={async (contract) => {
                    // Allowance for token Contract
                    await tokenContract?.setAllowance(
                        TRANSFER_CONTRACT_ADDRESS,
                        // Amount to be set: gwei - user can choose
                        ethers.utils.parseEther(amount).toString()
                    );
                    // Allowance for transfer Contract
                    await transferContract?.call(
                        "transfer",
                        [
                            tokenAddress,
                            receiver,
                            ethers.utils.parseEther(amount),
                            message
                        ]
                    );
                }}
                // Pop up pending message
                onSubmit={() => toast({
                    title: 'Transfer Pending',
                    description: 'Waiting for pending transactions!',
                    status: 'loading',
                })}
                // Pop up successful message
                onSuccess={() => toast({
                    title: 'Transfer Successful',
                    description: "You have successfully transferred tokens!",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })}
                // Pop up failed message
                onError={() => toast({
                    title: 'Transfer Failed',
                    description: "You have failed transferred tokens!",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })}
                style={{ backgroundColor: "orange", color: "black" }}
            >Transfer Token</Web3Button>
        </Box>
    );
};

export default TransferButton;
