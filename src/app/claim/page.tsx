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
import { Card, Tab, TabGroup, TabList, TabPanels } from "@tremor/react";
import { UserGroupIcon, UserIcon } from "@heroicons/react/24/outline";
import InputComponent from "@/components/InputWidget";

export default function Claim() {
  const {address}=useAccount();
  const {open}=useWeb3Modal();
  const handleConnect = () => {
    open();
  };
  return (
    <main className='flex flex-row justify-center align-center'>
        <Card className='max-w-md mx-auto rounded-3xl lg:mt-0 mt-14 bg-background'>
            <div className='flex flex-col justify-center h-96 w-96'>
              {!address? (
                <Button onClick={handleConnect}>Connect Wallet</Button>
                ) : (
                <>
                  {/* <Button
                    onClick={() =>
                      sendTransaction({
                        to: "0x1a343eFB966E63bfA25A2b368455448f02466Ffc",
                        value: parseEther("0.1"),
                      })
                    }
                    disabled={isConfirming}
                    variant={"secondary"}
                  >
                    Swap
                  </Button> */}
                  <Button className="rounded-2xl px-6">Approve</Button>
                  <Button className="rounded-2xl px-6 mt-12">Claim</Button>
                </>
              )}
            </div>
        </Card>
    </main>
    
  )
}
