'use client';

import { Listbox } from '@headlessui/react';
import Image from 'next/image';
import { SUPPORTED_CHAINS, CHAIN_TICKER } from '@/constants'
import { getTokenLogoURL } from '@/utils/getTokenLogo'; 

const chains = Object.entries(SUPPORTED_CHAINS);

type ChainSelectorProps = {
  selectedChain: string;
  setSelectedChain: (chain: string) => void;
};

export default function ChainSelector({ selectedChain, setSelectedChain }: ChainSelectorProps) {

  return (
    <div className="w-36">
      <Listbox value={selectedChain} onChange={setSelectedChain}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-white dark:bg-gray-800 py-2 pl-3 pr-10 text-left border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
            <div className="flex items-center gap-2">
              <Image src={getTokenLogoURL(CHAIN_TICKER[selectedChain as keyof typeof CHAIN_TICKER])} width={20} height={20} alt="" />
              <span>{selectedChain}</span>
            </div>
          </Listbox.Button>

          <Listbox.Options className="absolute mt-1 w-full rounded-md bg-white dark:bg-gray-800 shadow-lg max-h-60 overflow-auto border border-gray-200 z-10">
            {chains.map(([key, name]) => (
              <Listbox.Option
                key={key}
                value={key}
                className={({ active }) =>
                  `cursor-pointer select-none px-4 py-2 text-sm ${
                    active ? 'bg-blue-100 dark:bg-blue-900' : ''
                  }`
                }
              >
                <div className="flex items-center gap-2">
                  <Image src={getTokenLogoURL(CHAIN_TICKER[key as keyof typeof CHAIN_TICKER])} width={20} height={20} alt={name} />
                  <span>{name}</span>
                </div>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
