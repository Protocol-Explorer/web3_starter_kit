"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { parseEther } from "viem";
import { toast } from "sonner";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import MUSD_CONTRACT from "../../contracts/mUSD.json";
import { Card, Tab, TabGroup, TabList, TabPanels } from "@tremor/react";
import { UserGroupIcon, UserIcon } from "@heroicons/react/24/outline";
import InputComponent from "@/components/amm/InputWidget";
import DisabledInputComponent from "@/components/amm/DisabledInput";
import Modal from "@/components/amm/Modal";
import VTOKEN_CONTRACT from "../../contracts/vtoken.json";
import SWAP_CONTRACT from "../../contracts/swap.json";
import { parse } from "path";

export default function AmmPage() {
  const { isConnected } = useAccount();
  const { address } = useAccount();
  const { open } = useWeb3Modal();
  const [vRT, setvRT] = useState<number>(0);
  const [vTTD, setvTTD] = useState<number>(0);
  const [Swap, setSwap] = useState<string>("vrt");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const openModal = (type: string) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const vrt_to_vttd = [
    "0x9d1F0652927E16d6d8b0AfA9F270C33Fb4869087",
    "0xd011E96c10cD0eCb82a38CEdE921906Ee5e981EA",
    3000,
    address,
    Number(parseEther(vRT.toString())),
    1000000000000000,
    0,
  ];

  const vttd_to_vrt = [
    "0xd011E96c10cD0eCb82a38CEdE921906Ee5e981EA",
    "0x9d1F0652927E16d6d8b0AfA9F270C33Fb4869087",
    3000,
    address,
    Number(parseEther(vTTD.toString())),
    1000000000000000,
    0,
  ];

  const handleConnect = () => {
    open();
  };
  const handleSwapVrt = () => {
    setSwap("vrt");
  };
  const handleSwapVttd = () => {
    setSwap("vttd");
  };
  const { writeContractAsync } = useWriteContract();

  useEffect(() => {
    setvRT(parseFloat((vTTD / 0.97).toFixed(2)));
  }, [vTTD]);

  useEffect(() => {
    setvTTD(parseFloat((vRT * 0.97).toFixed(2)));
  }, [vRT]);

  const { data: vrt_approval } = useReadContract({
    abi: VTOKEN_CONTRACT,
    address: "0x9d1F0652927E16d6d8b0AfA9F270C33Fb4869087",
    functionName: "allowance",
    args: [address, "0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E"],
  });

  const { data: vttd_approval } = useReadContract({
    abi: VTOKEN_CONTRACT,
    address: "0xd011E96c10cD0eCb82a38CEdE921906Ee5e981EA",
    functionName: "allowance",
    args: [address, "0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E"],
  });

  const vrt_approve = vrt_approval?.toString();
  const vttd_approve = vttd_approval?.toString();

  const handleDeposit = async () => {
    switch (Swap) {
      case "vrt":
        if (vrt_approve !== "0") {
          try {
            await writeContractAsync({
              abi: SWAP_CONTRACT,
              address: "0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E",
              functionName: "exactInputSingle",
              args: [vrt_to_vttd],
            });
            console.log("Transferring:", vRT);
          } catch (error) {
            console.error("Transaction error:", error);
          }
        } else {
          openModal('vrt');
        }
        break;

      case "vttd":
        if (vttd_approve !== "0") {
          try {
            await writeContractAsync({
              abi: SWAP_CONTRACT,
              address: "0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E",
              functionName: "exactInputSingle",
              args: [vttd_to_vrt],
            });
            console.log("Transferring:", vTTD);
          } catch (error) {
            console.error("Transaction error:", error);
          }
        } else {
          openModal('vttd');
        }
        break;

      default:
        console.error("Invalid Swap value:", Swap);
    }
  };

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
        {Swap === 'vrt' ? (
          <>
            <InputComponent
              type="pay"
              label="vRT"
              value={vRT}
              setValue={setvRT}
            />
            <div className="flex justify-center mb-2">
              <button
                onClick={handleSwapVttd}
                className="btn btn-accent hover:bg-secondary p-2 rounded-xl"
              >
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
            <DisabledInputComponent
              type="receive"
              label="vTTD"
              initialValue={vTTD}
              currency="vTTD"
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
              <button
                onClick={handleSwapVrt}
                className="btn btn-accent hover:bg-secondary p-2 rounded-xl"
              >
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
            <DisabledInputComponent
              type="receive"
              label="vRT"
              initialValue={vRT}
              currency="vRT"
            />
          </>
        )}
        <div className="flex justify-center">
          {!isConnected ? (
            <Button onClick={handleConnect}>Connect Wallet</Button>
          ) : (
            <Button className="rounded-2xl px-6" onClick={handleDeposit}>
              Swap
            </Button>
          )}
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal} swapType={modalType}>
          <p>Approve the contract to proceed with the swap.</p>
        </Modal>
      </Card>
    </main>
  );
}
