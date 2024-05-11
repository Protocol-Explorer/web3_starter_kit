"use client";
import { useReadContract } from "wagmi";
import { counterAddress, counterAbi } from "@/constants";

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
    <div>
      {isLoading ? <div>Loading</div> : <p>Counter: {counter?.toString()}</p>}
    </div>
  );
}

export default Counter;
