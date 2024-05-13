import React, { useState } from "react";
import { Button } from "../ui/button";
import InputComponent from "@/components/virtualizer/Input";

export default function DepositWidget() {
  const [mUSDC, setmUSDC] = useState<number>(0);
  const [vUSD, setvUSD] = useState<number>(0);
  return (
    <div >
      <div className="flex rounded-2xl items-left flex-col flex-grow pt-4">
        <div>
          <div className={`flex mx-2 text-accent`}>
            <InputComponent label="mUSDC" type="deposit" initialValue={mUSDC} onValueChange={setmUSDC}/>
          </div>
          <div className={`flex mx-2 text-accent`}>
            <InputComponent label="vUSD" type="deposit" initialValue={vUSD} onValueChange={setvUSD}/>
          </div>
        </div>
      </div>

      <div className="mx-2">
        <Button
          className="w-full"
          // onClick={() => {
          //   deposit_ttdc();
          //   handleBttdcChange(null, true);
          // }}
        >
          Deposit
        </Button>
      </div>
    </div>
  );
}
