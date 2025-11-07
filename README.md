# JMFolio

## Project Overview

JM Folio is a portfolio tracker application for managing investment positions across stocks, crypto, cash, and ETFs. Built with Next.js 16 (App Router), Prisma ORM with PostgreSQL, and shadcn/ui components.

## Common Commands

### Development
```bash
pnpm dev              # Start development server (http://localhost:3000)
pnpm build            # Build production bundle
pnpm start            # Start production server
```

### Code Quality
```bash
pnpm lint             # Run Biome linter with auto-fix (biome check --fix .)
pnpm format           # Format code with Biome (biome format --write .)
pnpm check            # Combined check and write (pnpm exec biome check --write)
```

### Database (Prisma)
```bash
npx prisma generate   # Generate Prisma Client (outputs to prisma/generated/prisma)
npx prisma migrate dev # Create and apply migration
npx prisma migrate deploy # Apply migrations in production
npx prisma db push    # Push schema changes without creating migration
npx prisma studio     # Open Prisma Studio GUI
npx tsx prisma/seed.ts # Run database seed script
```

### Docker
```bash
docker-compose up -d  # Start PostgreSQL container
docker-compose down   # Stop PostgreSQL container
```

## Architecture

### Tech Stack
- **Framework**: Next.js 16 with React 19 and React Compiler enabled
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS 4 with shadcn/ui (New York style)
- **State**: Zustand for client state management
- **Linting/Formatting**: Biome (replacing ESLint/Prettier)
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono

### Directory Structure
- `src/app/` - Next.js App Router pages and layouts
- `src/components/ui/` - shadcn/ui components
- `src/lib/` - Utilities (e.g., cn() utility for class merging)
- `prisma/schema.prisma` - Database schema
- `prisma/migrations/` - Database migrations
- `prisma/generated/prisma/` - Generated Prisma Client (gitignored)

### Database Schema

**User**: Auth and ownership (`id`, `email`, `password`, `name`)

**Position**: Investment holdings with tracking
- Links to User (cascade delete)
- Tracks `ticker`, `name`, `type` (AssetType enum), `quantity`, `avgPrice`, `currentPrice`
- Unique constraint on `[userId, ticker]`

**Transaction**: Buy/sell records
- Links to User and Position (cascade delete)
- `type` (BUY/SELL), `quantity`, `pricePerUnit`, `fees`, `total`
- Indexed on `userId`, `positionId`, and `date`

**Goal**: Financial targets
- Links to User (cascade delete)
- `title`, `targetAmount`, `deadline`, `achieved`, `achievedAt`

**Enums**: `AssetType` (STOCK, CRYPTO, CASH, ETF), `TransactionType` (BUY, SELL)

### Prisma Configuration
- Custom output directory: `prisma/generated/prisma/client`
- Import Prisma Client from `./generated/prisma/client` in seed files
- Import from `@prisma/client` elsewhere (configured in package.json)
- Uses classic engine mode via `prisma.config.ts`

### Code Style (Biome)
- **Formatter**: 2-space indent, 80-char line width (100 for JS)
- **JavaScript**: Single quotes, JSX single quotes, no semicolons where allowed, trailing commas
- **Linter**: Recommended rules, Next.js and React domains enabled
- **Auto-organize imports**: Enabled on save

### shadcn/ui Configuration
- Style: "new-york"
- Base color: neutral
- CSS variables: enabled
- RSC: enabled (React Server Components)
- Path aliases: `@/components`, `@/lib`, `@/hooks`, `@/components/ui`

## Development Workflow

1. **Database changes**: Edit `schema.prisma` → run `npx prisma migrate dev --name description` → generates client automatically
2. **Add UI components**: Use `npx shadcn@latest add <component>` to add shadcn components
3. **Styling**: Use Tailwind classes with `cn()` utility from `@/lib/utils` for conditional classes
4. **Code quality**: Run `pnpm check` before committing

## Important Notes

- React Compiler is enabled in `next.config.ts` - avoid manual memoization unless necessary
- Prisma Client imports from custom location in seed files: `./generated/prisma/client`
- Database has cascade deletes - deleting a User removes all their Positions, Transactions, and Goals
- Position average price (`avgPrice`) should be recalculated when new Transactions are added
- Current prices (`currentPrice` on Position) are manually updated - no automatic price fetching yet