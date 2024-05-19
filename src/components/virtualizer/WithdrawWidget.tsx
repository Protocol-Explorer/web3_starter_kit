import React, { useState } from "react";
import { Button } from "../ui/button";
import InputComponent from "@/components/virtualizer/Input";
import Modal from "./Modal";
import DisabledInputComponent from "./DisabledInput";
import VIRTUALISER_CONTRACT from "../../contracts/virtualizer.json"
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import MUSD_CONTRACT from "../../contracts/mUSD.json";
import { parseEther } from "viem";

export default function DepositWidget() {
  const { address } = useAccount();
  const [vUSD, setvUSD] = useState<number>(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const { writeContract, isError } = useWriteContract();
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const { open } = useWeb3Modal();
  const handleConnect = () => {
    open();
  };

  const { data: approved } = useReadContract({
    abi: MUSD_CONTRACT,
    address: "0xbCCc252A134cEf81be20DF52F27D9029507F3605",
    functionName: "allowance",
    args: [address, "0x0a90769a8B53515C5F671eD7379DF3Ed2bDE910e"],
  });

  const approve_str = approved?.toString();
  const transfer_vUSD = String(parseEther(vUSD.toString()));

  const handleWithdraw = () => {
    if (approve_str === "0") {
      openModal();
    } else {
      writeContract({
        abi: VIRTUALISER_CONTRACT,
        address: "0x0a90769a8B53515C5F671eD7379DF3Ed2bDE910e",
        functionName: "unwrap",
        args: [transfer_vUSD],
      });

      console.log("Transferring:", transfer_vUSD);
    }
  };

  return (
    <div>
      <div className="flex rounded-2xl items-left flex-col flex-grow pt-4">
        <div>
          <div className={`flex mx-2 text-accent`}>
            <InputComponent
              label="vUSD"
              type="withdraw"
              initialValue={vUSD}
              onValueChange={setvUSD}
            />
          </div>
        </div>
      </div>

      <div className="mx-2">
        {!address ? (
          <Button className="w-full" onClick={handleConnect}>
            Connect Wallet
          </Button>
        ) : (
          <>
            <Button className="w-full" onClick={handleWithdraw}>
              Withdraw
            </Button>
          </>
        )}

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <DisabledInputComponent
            label="vUSD"
            heading="Approve amount of funds that can be transferred"
            initialValue={1000000}
            currency="vUSD"
          />
        </Modal>
      </div>
    </div>
  );
}
