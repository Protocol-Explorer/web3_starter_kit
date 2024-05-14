"use client";
import { Card } from "@tremor/react";
import React, { useState } from "react";
import CustomTab from "@/components/CustomTab";
import DepositWidget from "@/components/virtualizer/DepositWidget";
import WithdrawWidget from "@/components/virtualizer/WithdrawWidget";

export default function Virtualizer() {
  const [activeTab, setActiveTab] = useState<string>("deposit");

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };
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
      </Card>
      <div className="p-2 flex flex-col w-full">
        <div className="flex justify-center">
          <h1 className="mt-4">Balance:</h1>
        </div>
        <div className="flex flex-row justify-evenly">
          <h1>mUSDC: 1000</h1>
          <h1>vUSD: 1000</h1>
        </div>
      </div>
    </div>
  );
}
