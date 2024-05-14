"use client";
import CustomTab from "@/components/CustomTab";
import { Card } from "@tremor/react";
import React, { useState } from "react";
import VUSD_to_EMC from "@/components/varq/VUSD_to_EMC";
import EMC_to_VUSD from "@/components/varq/EMC_to_VUSD";

export default function Varq() {
  const [activeTab, setActiveTab] = useState<string>("deposit");

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
            <h1>vUSD: 1000</h1>
            <h1>vTTD: 7000</h1>
            <h1>vRT: 1000</h1>
          </div>
        </div>
      </Card>
    </div>
  );
}
