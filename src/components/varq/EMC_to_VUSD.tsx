import React, { useState } from "react";
import InputComponent from "./Input";
import Image from "next/image";
import { Button } from "../ui/button";
import { useAccount, useWriteContract } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import VARQ_CONTRACT from "../../contracts/varq.json";
import { parseEther } from "viem";

export default function EMC_to_VUSD() {
  const address = useAccount();
  const handleConnect = () => {
    open();
  };
  const [VUSD, setVUSD] = useState<number>(0);
  const [VTTD, setVTTD] = useState<number>(0);
  const [VRT, setVRT] = useState<number>(0);
  const [isModalOpen,setModalOpen]=useState<boolean>(false);
  const {writeContract,error,isError}=useWriteContract();
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const { open } = useWeb3Modal();
  const transfer_VUSD=String(parseEther(VUSD.toString()));
  const transfer_VTTD=String(parseEther(VTTD.toString()));
  const transfer_VRT=String(parseEther(VRT.toString()));
  const handleEMCtoVUSD = () => {
    writeContract({
      abi: VARQ_CONTRACT,
      address: "0x077b8FEaAD247bdf4827B4D12bb9B938397FC529",
      functionName: "convertTokensToVUSD",
      args: [transfer_VTTD,transfer_VRT],
    });

    console.log("Transferring:",[VTTD,VRT] );
    
  };
    
  if(isError){
    console.log(error);
  }else{
    console.log("Transferring:",VUSD );
  };
  return (
    <div>
      <div className="flex rounded-2xl items-left flex-col flex-grow pt-4 mx-2 text-accent">
        <h1 className="text-primary ml-2">vTTD & vRT -{">"} vUSD</h1>
        <InputComponent
          label="vTTD"
          onValueChange={setVTTD}
          initialValue={VTTD}
        />
      </div>
      <div className="flex rounded-2xl items-left flex-col flex-grow mx-2 text-accent">
        <InputComponent label="vRT" onValueChange={setVRT} initialValue={VRT} />
      </div>

      {/* <div className="flex justify-center">
        <Image
          src="/arrow_down.svg"
          alt="VIFI Logo"
          className="dark:invert"
          width={30}
          height={24}
          priority
        />
      </div>
      <div className="flex rounded-2xl items-left flex-col flex-grow pt-4 mx-2 text-accent">
        <h1 className="text-primary ml-2">You receive</h1>
        <InputComponent
          label="vUSD"
          onValueChange={setVUSD}
          initialValue={VUSD}
        />
      </div> */}
      <div className="flex flex-col justify-center mx-2">
        {!address ? (
          <Button onClick={handleConnect}>Connect Wallet</Button>
        ) : (
          <>
            <Button className="rounded-2xl px-6" onClick={handleEMCtoVUSD}>Convert</Button>
          </>
        )}
      </div>
    </div>
  );
}
