"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  useAccount,
  useSendTransaction,
  useSignMessage,
} from "wagmi";
import { parseEther } from "viem";
import { useWeb3Modal } from "@web3modal/wagmi/react";

export default function Home() {
  const { isConnected } = useAccount();
  const { signMessage } = useSignMessage();
  const { sendTransaction } = useSendTransaction();
  const { open } = useWeb3Modal();
  const handleConnect = () => {
    open();
  };

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
                  to: "0x1a343eFB966E63bfA25A2b368455448f02466Ffc",
                  value: parseEther("0.1"),
                })
              }
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
