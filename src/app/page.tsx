"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  useAccount,
  useSendTransaction,
  useSignMessage,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseEther } from "viem";
import { toast } from "sonner";
import { useWeb3Modal } from "@web3modal/wagmi/react";

export default function Home() {
  const { isConnected } = useAccount();
  const { signMessage } = useSignMessage();
  const { sendTransaction, data: hash } = useSendTransaction();
  const { open } = useWeb3Modal();
  const handleConnect = () => {
    open();
  };
  const {
    isLoading: isConfirming,
    error,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isConfirmed) {
      toast.success("Transaction Successful", {
        action: {
          label: "View on Etherscan",
          onClick: () => {
            window.open(`https://explorer-testnet.morphl2.io/tx/${hash}`);
          },
        },
      });
    }
    if (error) {
      toast.error("Transaction Failed");
    }
  }, [isConfirmed, error, hash]);

  return (
    <main>
      <section className="py-12 flex flex-col items-center text-center gap-8">
        <h1 className="text-4xl font-bold">Web3 Starter Kit</h1>
        <p className="text-2xl text-muted-foreground">
          Build your dapp frontends with the latest tools.
        </p>
      </section>
      <div className="flex gap-6 items-center justify-center">
        {!isConnected ? (
          <Button onClick={handleConnect}>Connect Wallet</Button>
        ) : (
          <>
            <Button onClick={handleConnect}>Info</Button>
            <Button onClick={() => signMessage({ message: "gm" })}>
              {" "}
              Say GM{" "}
            </Button>
            <Button
              onClick={() =>
                sendTransaction({
                  to: "0xd5Ba400e732b3d769aA75fc67649Ef4849774bb1",
                  value: parseEther("0.1"),
                })
              }
              disabled={isConfirming}
              variant={"secondary"}
            >
              Tip .1 Eth
            </Button>
          </>
        )}
      </div>
    </main>
  );
}
