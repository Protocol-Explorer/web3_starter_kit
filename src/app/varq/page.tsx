"use client";
import CustomTab from "@/components/CustomTab";
import { Card } from "@tremor/react";
import React, { useState } from "react";
import VUSD_to_EMC from "@/components/varq/VUSD_to_EMC";
import EMC_to_VUSD from "@/components/varq/EMC_to_VUSD";
import VARQ_CONTRACT from "../../contracts/varq.json";
import VTOKEN_CONTRACT from "../../contracts/vtoken.json";
import { useAccount, useReadContract, useWriteContract } from "wagmi";

export default function Varq() {
  const user_address = useAccount().address;
  const [activeTab, setActiveTab] = useState<string>("deposit");
  const { data: vUSD_balance } = useReadContract({
    abi: VTOKEN_CONTRACT,
    address: "0x99C9AFc5F81984684bd015Ab2300fD7F316a92cF",
    functionName: "balanceOf",
    args: [user_address],
  });
  const { data: vTTD_balance } = useReadContract({
    abi: VTOKEN_CONTRACT,
    address: "0xd011E96c10cD0eCb82a38CEdE921906Ee5e981EA",
    functionName: "balanceOf",
    args: [user_address],
  });
  const { data: vRT_balance } = useReadContract({
    abi: VTOKEN_CONTRACT,
    address: "0x9d1F0652927E16d6d8b0AfA9F270C33Fb4869087",
    functionName: "balanceOf",
    args: [user_address],
  });

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };
  return (
    <div className="flex items-center flex-col flex-grow pt-6 lg:pt-12">
      <Card className="max-w-md mx-auto rounded-3xl lg:mt-0 mt-14 bg-background">
        <div className="justify-center flex mb-6">
          <CustomTab
            label="USD to EMC"
            isActive={activeTab === "deposit"}
            onClick={() => handleTabChange("deposit")}
          />
          <CustomTab
            label="EMC to USD"
            isActive={activeTab === "withdraw"}
            onClick={() => handleTabChange("withdraw")}
          />
        </div>
        <div>
          {activeTab === "deposit" && (
            <div>
              <VUSD_to_EMC />
            </div>
          )}
          {activeTab === "withdraw" && (
            <div>
              <EMC_to_VUSD />
            </div>
          )}
        </div>
        <div className="p-2 flex flex-col w-full">
          <div className="flex justify-center">
            <h1 className="mt-4 mb-2">Balance:</h1>
          </div>
          <div className="flex flex-row justify-between">
            <h1>vUSD: {(Number(vUSD_balance) / 10 ** 18).toFixed(2)}</h1>
            <h1>vTTD: {(Number(vTTD_balance) / 10 ** 18).toFixed(2)}</h1>
            <h1>vRT: {(Number(vRT_balance) / 10 ** 18).toFixed(2)}</h1>
          </div>
        </div>
      </Card>
    </div>
  );
}
