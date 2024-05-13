"use client";
import { useReadContract } from "wagmi";
import { counterAddress, counterAbi } from "@/constants";
import { WriteContract } from "@/components/WriteCounter";

function Counter() {
  const {
    data: counter,
    status,
    isLoading,
    error,
  } = useReadContract({
    abi: counterAbi,
    address: counterAddress,
    functionName: "number",
  });
  return (
    <main>
      <section className="py-12 flex flex-col items-center text-center gap-8">
        <h1 className="text-4xl font-bold">Example Counter DApp</h1>
        <p className="text-2xl text-muted-foreground">
          {isLoading ? <>Loading...</> : <>Counter: {counter?.toString()}</>}
        </p>
      </section>
      <div className="flex gap-6 items-center justify-center">
        <WriteContract />
      </div>
    </main>
  );
}

export default Counter;
