"use client";
import React from 'react';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useAccount,
  useSendTransaction,
  useSignMessage,
  useWaitForTransactionReceipt,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { parseEther } from "viem";
import { toast } from "sonner";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import MUSD_CONTRACT from "../../contracts/mUSD.json";
import CLAIM_CONTRACT from "../../contracts/claim.json"
import { Card, Tab, TabGroup, TabList, TabPanels } from "@tremor/react";
import { UserGroupIcon, UserIcon } from "@heroicons/react/24/outline";
import InputComponent from "@/components/InputWidget";

export default function Claim() {
  const {address}=useAccount();
  const {open}=useWeb3Modal();
  const [contractName,setcontractName]=useState<string>("");
  const [loading,setLoading]=useState(false);
  const handleConnect = () => {
    open();
  };
  const {writeContract, data:hash}=useWriteContract();
  const {
    isLoading: isConfirming,
    error,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isConfirming) {
      toast.loading("Transaction Pending");
    }
    toast.dismiss();

    if (isConfirmed) {
      toast.success("Transaction Successful", {
        action: {
          label: "View on Etherscan",
          onClick: () => {
            window.open(`https://sepolia.etherscan.io/tx/${hash}`);
          },
        },
      });
    }
    if (error) {
      toast.error("Transaction Failed");
    }
  }, [isConfirming, isConfirmed, error, hash]);


  return (
    <main className='flex flex-row justify-center align-center'>
        <Card className='max-w-md mx-auto rounded-3xl lg:mt-0 mt-14 bg-background'>
            <div className='flex flex-col justify-center h-96 w-96'>
              {!address? (
                <Button onClick={handleConnect}>Connect Wallet</Button>
                ) : (
                <>
                  <Button
                    onClick={()=>writeContract({
                      abi:CLAIM_CONTRACT,
                      address:"0x3A23b1EdD60851aB69ab941B54528c385b0C1dFC",
                      functionName:'claim',
                    })}
                    disabled={isConfirming}
                    className="rounded-2xl px-6 mt-12">Claim
                  </Button>
                </>
              )}
            </div>
        </Card>
    </main>
    
  )
}
