import { prisma } from '../utils/prisma';
import { decrypt } from '../utils/encryption';
import { getAccountData } from "../services/exchange.service";

type ExchangeName = "binance" | "okx" | "bybit" | "bitget" | "bingx";
type ExchangeKeys = {
  apiKey: string;
  secretKey: string;
  passphrase?: string;
};

type BalanceType = {
  type: 'TRADING' | 'FUNDING' | 'EARN' | 'SPOT' | 'MARGIN' | 'LENDING' | 'FUTURES';
  [key: string]: any;
};

const categories = ['TRADING', 'FUNDING', 'EARN', 'SPOT', 'MARGIN', 'LENDING', 'FUTURES'];

export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user?.id;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const pageNum = parseInt(req.query.pageNum as string) || 1;

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    // Fetch user's CEX accounts
    const cexAccounts = await prisma.cexAccount.findMany({
      where: { userId, status: 'active' },
      include: { exchange: true }
    });

    if (!cexAccounts.length) {
      return res.json(createEmptyResponse(pageSize, pageNum));
    }

    // Process all accounts in parallel
    const allData = await Promise.all(
      cexAccounts.map(async (account) => {
        try {
          const keys: ExchangeKeys = {
            apiKey: account.encrypted ? decrypt(account.apiKey) : account.apiKey,
            secretKey: account.apiSecret 
              ? (account.encrypted ? decrypt(account.apiSecret) : account.apiSecret)
              : '',
            passphrase: account.passphrase
              ? (account.encrypted ? decrypt(account.passphrase) : account.passphrase)
              : undefined
          };

          const exchangeName = account.exchange.name.toLowerCase() as ExchangeName;
          return await getAccountData(exchangeName, keys);
        } catch (err) {
          console.error(`Error fetching data for account ${account.id}:`, err);
          return null;
        }
      })
    );

    // Filter out failed requests and flatten the data
    const validData = allData.filter(Boolean).flat() as BalanceType[];

    // Categorize the data
    const categorized = categorizeData(validData, pageSize, pageNum);

    res.json(categorized);
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

function createEmptyResponse(pageSize: number, pageNum: number) {
  return categories.reduce((acc, category) => {
    acc[category] = {
      total: 0,
      pageSize,
      list: [],
      pageNum
    };
    return acc;
  }, {} as Record<string, any>);
}

function categorizeData(data: BalanceType[], pageSize: number, pageNum: number) {
  const result: Record<string, any> = {};

  // Initialize all categories
  categories.forEach(category => {
    const filtered = data.filter(item => item.type === category);
    result[category] = {
      total: filtered.length,
      pageSize,
      list: paginate(filtered, pageSize, pageNum),
      pageNum
    };
  });

  // Add ALL category
  result.ALL = {
    total: data.length,
    pageSize,
    list: paginate(data, pageSize, pageNum),
    pageNum
  };

  return result;
}

function paginate(array: any[], pageSize: number, pageNum: number) {
  return array.slice((pageNum - 1) * pageSize, pageNum * pageSize);
}