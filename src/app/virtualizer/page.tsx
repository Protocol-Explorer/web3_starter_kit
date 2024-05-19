"use client";
import { Card } from "@tremor/react";
import React, { useEffect, useState } from "react";
import CustomTab from "@/components/CustomTab";
import DepositWidget from "@/components/virtualizer/DepositWidget";
import WithdrawWidget from "@/components/virtualizer/WithdrawWidget";
import { useAccount, useReadContract } from "wagmi";
import MUSD_CONTRACT from "../../contracts/mUSD.json"
import VUSD_CONTRACT from "../../contracts/vtoken.json"
import Modal from "@/components/virtualizer/Modal";



export default function Virtualizer() {
  const [activeTab, setActiveTab] = useState<string>("deposit");
  const user_address = useAccount().address;
  const [mUSDCbalance, setmUSDC_Balance] = useState<string>("");
  const [vUSDBalance, setVUSD_Balance] = useState<string>("");
  

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  const {data: balance} = useReadContract({
    abi: MUSD_CONTRACT,
    address: "0xbCCc252A134cEf81be20DF52F27D9029507F3605",
    functionName: "balanceOf",
    args: [user_address]
  })

  const {data: vUSD_balance} = useReadContract({
    abi: VUSD_CONTRACT,
    address: "0x99C9AFc5F81984684bd015Ab2300fD7F316a92cF",
    functionName: "balanceOf",
    args: [user_address]
  })

  console.log("VUSD:", vUSD_balance)
  const vUSD_string = String(vUSD_balance)
  const formatVUSD_balance = vUSD_string?.slice(0, -18)

  const string_balance = balance?.toString()
  const formatMUSD_balance = string_balance?.slice(0, -18)

  useEffect(() => {
    if (formatMUSD_balance) {
      setmUSDC_Balance((formatMUSD_balance));
    }
  }, [formatMUSD_balance]);

  useEffect(() => {
    if (formatVUSD_balance) {
      setVUSD_Balance((formatVUSD_balance));
    }
  }, [formatVUSD_balance]);
  return (
    <div className="flex items-center flex-col flex-grow pt-6 lg:pt-12">
      <Card className="max-w-md mx-auto rounded-3xl lg:mt-0 mt-14 bg-background">
        <div className="justify-center flex mb-6">
          <CustomTab
            label="Deposit"
            isActive={activeTab === "deposit"}
            onClick={() => handleTabChange("deposit")}
          />
          <CustomTab
            label="Withdraw"
            isActive={activeTab === "withdraw"}
            onClick={() => handleTabChange("withdraw")}
          />
        </div>
        <div>
          {activeTab === "deposit" && (
            <div>
              <DepositWidget />
            </div>
          )}
          {activeTab === "withdraw" && (
            <div>
              <WithdrawWidget />
            </div>
          )}
        </div>
        <div className="p-2 flex flex-col w-full">
          <div className="flex justify-center">
            <h1 className="mt-4 mb-2">Balance:</h1>
          </div>
          <div className="flex flex-row justify-evenly">
            <h1>mUSDC: {mUSDCbalance}</h1>
            <h1>vUSD: {vUSDBalance}</h1>
          </div>
        </div>
      </Card>
    </div>
  );
}
