import { PrismaClient } from './generated/prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'demo@jmfolio.com',
      name: 'Demo User',
    },
  })

  const portfolio = await prisma.portfolio.create({
    data: {
      userId: user.id,
      name: 'My Portfolio',
    },
  })

  await prisma.position.createMany({
    data: [
      {
        portfolioId: portfolio.id,
        ticker: 'SPY',
        name: 'S&P 500 ETF',
        type: 'ETF',
        quantity: 0.317,
        avgPrice: 694,
        currentPrice: 694,
      },
      {
        portfolioId: portfolio.id,
        ticker: 'BTC',
        name: 'Bitcoin',
        type: 'CRYPTO',
        quantity: 0.001,
        avgPrice: 116166,
        currentPrice: 116166,
      },
    ],
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
