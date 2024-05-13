"use client";
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
import MUSD_CONTRACT from "../contracts/mUSD.json";
import { Card, Tab, TabGroup, TabList, TabPanels } from "@tremor/react";
import { UserGroupIcon, UserIcon } from "@heroicons/react/24/outline";
import InputComponent from "@/components/InputWidget";

export default function Home() {
  const { isConnected } = useAccount();
  const { address } = useAccount();
  const { open } = useWeb3Modal();
  const [vUSD, setVUSD] = useState<number>(0);
  const [other, setOther] = useState<number>(0);

  const handleConnect = () => {
    open();
  };
  // const {
  //   isLoading: isConfirming,
  //   error,
  //   isSuccess: isConfirmed,
  // } = useWaitForTransactionReceipt({
  //   hash,
  // });

  // useEffect(() => {
  //   if (isConfirming) {
  //     toast.loading("Transaction Pending");
  //   }
  //   toast.dismiss();

  //   if (isConfirmed) {
  //     toast.success("Transaction Successful", {
  //       action: {
  //         label: "View on Etherscan",
  //         onClick: () => {},
  //       },
  //     });
  //   }
  //   if (error) {
  //     toast.error("Transaction Failed");
  //   }
  // }, [isConfirming, isConfirmed, error]);

  const { data: name } = useReadContract({
    address: "0xbCCc252A134cEf81be20DF52F27D9029507F3605",
    abi: MUSD_CONTRACT,
    functionName: "name",
  });
  const { writeContract } = useWriteContract();

  return (
    <main>
      <section className="py-12 flex flex-col items-center text-center gap-8">
        <h1 className="text-4xl font-bold">Web3 Starter Kit</h1>
      </section>

      <Card className="max-w-md mx-auto rounded-3xl lg:mt-0 mt-14 bg-secondary ">
        <TabGroup>
          <TabList className="my-2">
            <Tab icon={UserGroupIcon}>Swap</Tab>
            <Tab icon={UserIcon}>Limit Order</Tab>
          </TabList>
        </TabGroup>
        <InputComponent
          type="pay"
          label="vUSDC"
          value={vUSD}
          setValue={setVUSD}
        />
        <div className="flex justify-center mb-2">
          <button className="btn btn-accent">
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
          label="other"
          value={other}
          setValue={setOther}
        />
        <div className="flex justify-center">
          {!isConnected ? (
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
              <Button>Swap</Button>
            </>
          )}
        </div>
      </Card>
    </main>
  );
}
