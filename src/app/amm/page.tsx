"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useAccount,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { parseEther } from "viem";
import { toast } from "sonner";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import MUSD_CONTRACT from "../../contracts/mUSD.json";
import { Card, Tab, TabGroup, TabList, TabPanels } from "@tremor/react";
import { UserGroupIcon, UserIcon } from "@heroicons/react/24/outline";
import InputComponent from "@/components/amm/InputWidget";
import DisabledInputComponent from "@/components/amm/DisabledInput";

export default function AmmPage() {
  const { isConnected } = useAccount();
  const { address } = useAccount();
  const { open } = useWeb3Modal();
  const [vRT, setvRT] = useState<number>(0);
  const [vTTD, setvTTD] = useState<number>(0);
  const [Swap, setSwap] = useState<boolean>(false);

  const handleConnect = () => {
    open();
  };
  const handleSwap = () => {
    setSwap(!Swap);
  };

  const { data: name } = useReadContract({
    address: "0xbCCc252A134cEf81be20DF52F27D9029507F3605",
    abi: MUSD_CONTRACT,
    functionName: "name",
  });
  const { writeContract } = useWriteContract();

  useEffect(() => {
    setvRT(parseFloat((vTTD * 0.67).toFixed(2)));
  }, [vTTD]);

  useEffect(() => {
    setvTTD(parseFloat((vRT / 0.67).toFixed(2)));
  }, [vRT]);

  return (
    <main>
      <Card className="max-w-md mx-auto rounded-3xl lg:mt-0 mt-14 bg-background">
        <TabGroup>
          <TabList className="my-2">
            <Tab
              className="px-4 rounded-2xl hover:bg-secondary"
              icon={UserGroupIcon}
            >
              Swap
            </Tab>
            <Tab
              className="px-4 rounded-2xl hover:bg-secondary"
              icon={UserIcon}
            >
              Limit Order
            </Tab>
            <Tab
              className="px-4 rounded-2xl hover:bg-secondary"
              icon={UserIcon}
            >
              Pool
            </Tab>
          </TabList>
        </TabGroup>
        {/* <InputComponent type="pay" label="vRT" value={vRT} setValue={setvRT} />
        <div className="flex justify-center mb-2">
          <button className="btn btn-accent hover:bg-secondary p-2 rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
              />
            </svg>
          </button>
        </div>
        <InputComponent
          type="receive"
          label="vTTD"
          value={vTTD}
          setValue={setvTTD}
        /> */}
        {Swap ? (
          <>
            <InputComponent
              type="pay"
              label="vRT"
              value={vRT}
              setValue={setvRT}
            />
            <div className="flex justify-center mb-2">
              <button onClick={handleSwap} className="btn btn-accent hover:bg-secondary p-2 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                  />
                </svg>
              </button>
            </div>
            <DisabledInputComponent type="receive" label="vTTD" initialValue={vTTD} currency="vTTD"
            />
          </>
        ) : (
          <>
            <InputComponent
              type="pay"
              label="vTTD"
              value={vTTD}
              setValue={setvTTD}
            />
            <div className="flex justify-center mb-2">
              <button onClick={handleSwap} className="btn btn-accent hover:bg-secondary p-2 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                  />
                </svg>
              </button>
            </div>
            <DisabledInputComponent type="receive" label="vRT" initialValue={vRT} currency="vRT" />
          </>
        )}
        <div className="flex justify-center">
          {!isConnected ? (
            <Button onClick={handleConnect}>Connect Wallet</Button>
          ) : (
            <Button className="rounded-2xl px-6">Swap</Button>
          )}
        </div>
      </Card>
    </main>
  );
}
