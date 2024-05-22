import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useWriteContract } from "wagmi";
import VRT_CONTRACT from "../../contracts/vtoken.json";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  swapType: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, swapType }) => {
  const { writeContractAsync, isSuccess, isError: error } = useWriteContract();

  useEffect(() => {
    if (isSuccess === true) {
      onClose();
    }
    if (error) {
      console.error("Transaction Failed");
    }
  }, [isSuccess, error, onClose]);

  if (!isOpen) return null;

  const handleApprove = () => {
    const abi = VRT_CONTRACT;
    const address = swapType === "vrt" 
      ? "0x9d1F0652927E16d6d8b0AfA9F270C33Fb4869087"
      : "0xd011E96c10cD0eCb82a38CEdE921906Ee5e981EA"; // Replace with actual VTTD contract address

    writeContractAsync({
      abi,
      address,
      functionName: "approve",
      args: [
        "0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E",
        "10000000000000000000000000",
      ],
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-secondary rounded-lg shadow-lg p-6 w-full max-w-md">
        {children}
        <div className="flex flex-row justify-between">
          <Button
            onClick={onClose}
            className="mt-4 py-2 px-4 bg-[#020817] text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={handleApprove}
            className="mt-4 py-2 px-4 bg-[#020817] text-white"
          >
            Approve {swapType.toUpperCase()}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
