import { NextRequest, NextResponse } from 'next/server';
import { CMC_API_KEY } from '@/constants';

export async function POST(req: NextRequest) {
  const { symbols } = await req.json();

  if (!Array.isArray(symbols) || symbols.length === 0) {
    return NextResponse.json({ error: 'Invalid symbols array' }, { status: 400 });
  }

  const validSymbols = symbols.filter((s: string) => /^[A-Z0-9]{2,10}$/.test(s));

  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${validSymbols.join(',')}&convert=USD`;

  try {
    const res = await fetch(url, {
      headers: {
        'X-CMC_PRO_API_KEY': CMC_API_KEY,
      },
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: err }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data.data);
  } catch (error) {
    return NextResponse.json({ error: 'Server error fetching CMC data' }, { status: 500 });
  }
}
