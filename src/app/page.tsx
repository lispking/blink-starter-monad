// src/app/page.tsx

"use client";

import {
  Blink,
  useBlink,
  useActionsRegistryInterval,
} from "@dialectlabs/blinks";

import "@dialectlabs/blinks/index.css";

import { useEvmWagmiAdapter } from "@dialectlabs/blinks/hooks/evm";

import { ConnectKitButton, useModal } from "connectkit";

export default function Home() {
  // Actions registry interval
  useActionsRegistryInterval();

  // ConnectKit modal
  const { setOpen } = useModal();

  // Wagmi adapter, used to connect to the wallet
  const { adapter } = useEvmWagmiAdapter({
    onConnectWalletRequest: async () => {
      setOpen(true);
    },
  });

  // Action we want to execute in the Blink
  const { blink, isLoading } = useBlink({
    url: "evm-action:http://donate-mon.netlify.app/api/actions/donate-mon",
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground p-4 sm:p-8">
      <div className="mb-8">
        <ConnectKitButton />
      </div>
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-xl p-6 bg-white dark:bg-neutral-800">
        {isLoading || !blink ? (
          <span className="text-lg font-semibold text-foreground/80">Loading...</span>
        ) : (
          // Blink component, used to execute the action
          <Blink blink={blink} adapter={adapter} securityLevel="all" />
        )}
      </div>
    </main>
  );
}
