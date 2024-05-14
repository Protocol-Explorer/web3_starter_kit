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
  const [contractName,setcontractName]=useState<string>("");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState<Error|null>(null);
  const handleConnect = () => {
    open();
  };
  /*interface ReadContractCall{
    data?:string;
    error?:any;
    isError?:boolean;
    isLoading?:boolean;
  }
  const handleApproveCall = async ()=>{
    console.log('handling happening');
    try{
      setLoading(true);
      setError(null);

      const result:ReadContractCall= await useWriteContract({
        address:"0xbCCc252A134cEf81be20DF52F27D9029507F3605",
        abi:MUSD_CONTRACT,
        functionName:'approve',
        args:[address,"10000000000000000000"]
      })
      if(result.isError){
        throw new Error(result.error)
      }
      setcontractName(result.data || '')
    }catch(error){
      setError(error instanceof Error ? error : new Error(String(error)));
      console.log(error)
    }finally{
      setLoading(false);
    }
  };*/
  const {writeContract}=useWriteContract();
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
                      abi:MUSD_CONTRACT,
                      address:"0xbCCc252A134cEf81be20DF52F27D9029507F3605",
                      functionName:'approve',
                      args:["0x38776466c8Fd3bA4f4bAc99403aDFA381C4e2e43",parseEther("10")]
                    })}
                    className='rounded-2xl px-6"'
                  >
                    Approve
                  </Button>
                  <Button className="rounded-2xl px-6 mt-12">Claim</Button>
                </>
              )}
            </div>
        </Card>
    </main>
    
  )
}
