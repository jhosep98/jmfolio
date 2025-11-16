import bcrypt from 'bcrypt'
import { PrismaClient } from '@/app/generated/prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clean existing data
  await prisma.transaction.deleteMany()
  await prisma.position.deleteMany()
  await prisma.goal.deleteMany()
  await prisma.user.deleteMany()

  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = await bcrypt.hash('password', salt)

  // Create users
  const user1 = await prisma.user.create({
    data: {
      email: 'john@example.com',
      password: hashedPassword,
      name: 'John Doe',
    },
  })

  const user2 = await prisma.user.create({
    data: {
      email: 'sarah@example.com',
      password: hashedPassword,
      name: 'Sarah Smith',
    },
  })

  // Create positions for user1
  const applePosition = await prisma.position.create({
    data: {
      userId: user1.id,
      ticker: 'AAPL',
      name: 'Apple Inc.',
      type: 'STOCK',
      quantity: 50,
      avgPrice: 150.25,
      currentPrice: 175.5,
    },
  })

  const btcPosition = await prisma.position.create({
    data: {
      userId: user1.id,
      ticker: 'BTC',
      name: 'Bitcoin',
      type: 'CRYPTO',
      quantity: 0.5,
      avgPrice: 42000,
      currentPrice: 58000,
    },
  })

  const vooPosition = await prisma.position.create({
    data: {
      userId: user1.id,
      ticker: 'VOO',
      name: 'Vanguard S&P 500 ETF',
      type: 'ETF',
      quantity: 25,
      avgPrice: 380,
      currentPrice: 420,
    },
  })

  // Create positions for user2
  const googPosition = await prisma.position.create({
    data: {
      userId: user2.id,
      ticker: 'GOOGL',
      name: 'Alphabet Inc.',
      type: 'STOCK',
      quantity: 30,
      avgPrice: 125.5,
      currentPrice: 140.25,
    },
  })

  const ethPosition = await prisma.position.create({
    data: {
      userId: user2.id,
      ticker: 'ETH',
      name: 'Ethereum',
      type: 'CRYPTO',
      quantity: 5,
      avgPrice: 2200,
      currentPrice: 3100,
    },
  })

  // Create transactions for user1
  await prisma.transaction.create({
    data: {
      userId: user1.id,
      positionId: applePosition.id,
      type: 'BUY',
      quantity: 30,
      pricePerUnit: 145,
      fees: 2.99,
      total: 30 * 145 + 2.99,
      notes: 'Initial purchase',
      date: new Date('2024-01-15'),
    },
  })

  await prisma.transaction.create({
    data: {
      userId: user1.id,
      positionId: applePosition.id,
      type: 'BUY',
      quantity: 20,
      pricePerUnit: 158.75,
      fees: 2.99,
      total: 20 * 158.75 + 2.99,
      notes: 'Adding to position',
      date: new Date('2024-03-20'),
    },
  })

  await prisma.transaction.create({
    data: {
      userId: user1.id,
      positionId: btcPosition.id,
      type: 'BUY',
      quantity: 0.5,
      pricePerUnit: 42000,
      fees: 50,
      total: 0.5 * 42000 + 50,
      notes: 'First crypto purchase',
      date: new Date('2024-02-10'),
    },
  })

  await prisma.transaction.create({
    data: {
      userId: user1.id,
      positionId: vooPosition.id,
      type: 'BUY',
      quantity: 25,
      pricePerUnit: 380,
      fees: 0,
      total: 25 * 380,
      notes: 'Retirement account contribution',
      date: new Date('2024-01-05'),
    },
  })

  // Create transactions for user2
  await prisma.transaction.create({
    data: {
      userId: user2.id,
      positionId: googPosition.id,
      type: 'BUY',
      quantity: 40,
      pricePerUnit: 120,
      fees: 3.5,
      total: 40 * 120 + 3.5,
      date: new Date('2024-02-01'),
    },
  })

  await prisma.transaction.create({
    data: {
      userId: user2.id,
      positionId: googPosition.id,
      type: 'SELL',
      quantity: 10,
      pricePerUnit: 135,
      fees: 3.5,
      total: 10 * 135 - 3.5,
      notes: 'Taking profits',
      date: new Date('2024-04-15'),
    },
  })

  await prisma.transaction.create({
    data: {
      userId: user2.id,
      positionId: ethPosition.id,
      type: 'BUY',
      quantity: 5,
      pricePerUnit: 2200,
      fees: 25,
      total: 5 * 2200 + 25,
      date: new Date('2024-03-01'),
    },
  })

  // Create goals
  await prisma.goal.create({
    data: {
      userId: user1.id,
      title: 'Retirement Fund',
      targetAmount: 100000,
      deadline: new Date('2030-12-31'),
    },
  })

  await prisma.goal.create({
    data: {
      userId: user1.id,
      title: 'Emergency Fund',
      targetAmount: 25000,
      deadline: new Date('2025-06-30'),
    },
  })

  await prisma.goal.create({
    data: {
      userId: user2.id,
      title: 'House Down Payment',
      targetAmount: 50000,
      deadline: new Date('2026-12-31'),
    },
  })

  await prisma.goal.create({
    data: {
      userId: user2.id,
      title: 'First $10k',
      targetAmount: 10000,
      achieved: true,
      achievedAt: new Date('2024-03-15'),
    },
  })

  console.log('✅ Seed data created successfully')
  console.log(`- ${await prisma.user.count()} users`)
  console.log(`- ${await prisma.position.count()} positions`)
  console.log(`- ${await prisma.transaction.count()} transactions`)
  console.log(`- ${await prisma.goal.count()} goals`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
