// lib/moralis.ts
import Moralis from 'moralis';
import { MORALIS_API_KEY } from '@/constants';

export async function initMoralis() {
  if (!Moralis.Core.isStarted) {
    await Moralis.start({ apiKey: MORALIS_API_KEY });
  }
}
