# JM-Folio - Quick Reference Guide

## 📋 Table of Contents
- [Docker Commands](#-docker-commands)
- [Prisma Commands](#-prisma-commands)
- [Next.js Development](#-nextjs-development)
- [Database Management](#-database-management)
- [Git Workflow](#-git-workflow)
- [Troubleshooting](#-troubleshooting)

---

## 🐳 Docker Commands

### Container Management
```bash
# Start PostgreSQL container
docker-compose up -d

# Stop PostgreSQL container
docker-compose down

# Restart containers
docker-compose restart

# View running containers
docker-compose ps

# Stop and remove containers + volumes (DELETES DATA)
docker-compose down -v
```

### Logs & Monitoring
```bash
# View logs
docker-compose logs -f postgres

# View last 100 lines
docker-compose logs --tail=100 postgres

# Check container status
docker-compose ps
```

### Database Access
```bash
# Connect to PostgreSQL shell
docker exec -it jmfolio-postgres psql -U jmfolio -d jmfolio

# Execute SQL file
docker exec -i jmfolio-postgres psql -U jmfolio -d jmfolio < query.sql

# Check PostgreSQL version
docker exec jmfolio-postgres psql -U jmfolio -c "SELECT version();"
```

### Backup & Restore
```bash
# Create backup with timestamp
docker exec jmfolio-postgres pg_dump -U jmfolio jmfolio > backup_$(date +%Y%m%d_%H%M%S).sql

# Create compressed backup
docker exec jmfolio-postgres pg_dump -U jmfolio jmfolio | gzip > backup_$(date +%Y%m%d).sql.gz

# Restore from backup
docker exec -i jmfolio-postgres psql -U jmfolio -d jmfolio < backup.sql

# Restore from compressed backup
gunzip -c backup.sql.gz | docker exec -i jmfolio-postgres psql -U jmfolio -d jmfolio
```

---

## 🔷 Prisma Commands

### Setup & Initialization
```bash
# Initialize Prisma (creates prisma/ folder)
npx prisma init

# Initialize with specific database
npx prisma init --datasource-provider postgresql
```

### Schema Management
```bash
# Generate Prisma Client (after schema changes)
npx prisma generate

# Validate schema file
npx prisma validate

# Format schema file
npx prisma format
```

### Migrations
```bash
# Create and apply migration
npx prisma migrate dev --name <migration_name>

# Create migration without applying
npx prisma migrate dev --create-only

# Apply pending migrations
npx prisma migrate deploy

# Reset database (DELETES ALL DATA)
npx prisma migrate reset

# Check migration status
npx prisma migrate status

# View migration history
npx prisma migrate diff
```

### Database Operations
```bash
# Push schema to database (dev only - no migrations)
npx prisma db push

# Pull database schema to Prisma
npx prisma db pull

# Seed database
npx prisma db seed
```

### Prisma Studio (Database GUI)
```bash
# Open Prisma Studio
npx prisma studio

# Open on specific port
npx prisma studio --port 5555

# Open with browser
npx prisma studio --browser chrome
```

### Debugging & Inspection
```bash
# Show Prisma version
npx prisma -v

# Show detailed schema info
npx prisma validate --schema prisma/schema.prisma

# Debug mode (shows SQL queries)
# Add to .env: DEBUG="prisma:*"
```

---

## ⚡ Next.js Development

### Development Server
```bash
# Start development server
npm run dev

# Start on different port
npm run dev -- -p 3001

# Start with turbopack (faster)
npm run dev -- --turbo
```

### Building & Production
```bash
# Build for production
npm run build

# Start production server
npm run start

# Start production on different port
npm run start -- -p 3001

# Analyze bundle size
npm run build -- --analyze
```

### Code Quality
```bash
# Run ESLint
npm run lint

# Fix ESLint errors automatically
npm run lint -- --fix

# Type check TypeScript
npm run type-check

# Format code with Prettier
npm run format

# Format check without writing
npm run format:check
```

### Dependency Management
```bash
# Install dependencies
npm install

# Install specific package
npm install <package-name>

# Install dev dependency
npm install -D <package-name>

# Update dependencies
npm update

# Check outdated packages
npm outdated

# Audit security vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

### Cache Management
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json && npm install

# Clear all cache (Next.js + node_modules)
rm -rf .next node_modules package-lock.json && npm install
```

---

## 🗄️ Database Management

### PostgreSQL Direct Access (without Docker)
```bash
# Connect to local PostgreSQL
psql -U jmfolio -d jmfolio

# Connect to remote database
psql -h hostname -U username -d database_name

# List all databases
psql -U jmfolio -l

# Execute SQL command
psql -U jmfolio -d jmfolio -c "SELECT * FROM users;"
```

### Common SQL Queries
```sql
-- List all tables
\dt

-- Describe table structure
\d table_name

-- List all users
SELECT * FROM "User";

-- Count records
SELECT COUNT(*) FROM "Position";

-- Delete all data from table
TRUNCATE TABLE "Transaction" CASCADE;

-- Drop table
DROP TABLE IF EXISTS "Goal" CASCADE;

-- View table size
SELECT pg_size_pretty(pg_total_relation_size('Position'));

-- Exit psql
\q
```

### Database Maintenance
```bash
# Vacuum database (cleanup)
docker exec jmfolio-postgres psql -U jmfolio -d jmfolio -c "VACUUM ANALYZE;"

# Check database size
docker exec jmfolio-postgres psql -U jmfolio -d jmfolio -c "SELECT pg_size_pretty(pg_database_size('jmfolio'));"

# List all connections
docker exec jmfolio-postgres psql -U jmfolio -d jmfolio -c "SELECT * FROM pg_stat_activity;"
```

---

## 🌿 Git Workflow

### Basic Commands
```bash
# Check status
git status

# Add files
git add .
git add <file-name>

# Commit changes
git commit -m "feat: description"

# Push to remote
git push origin main

# Pull latest changes
git pull origin main

# View commit history
git log --oneline
```

### Branch Management
```bash
# Create new branch
git checkout -b feature/feature-name

# Switch branches
git checkout branch-name

# List branches
git branch

# Delete branch
git branch -d branch-name

# Merge branch into current
git merge branch-name
```

### Undo Changes
```bash
# Discard changes in file
git checkout -- <file-name>

# Unstage file
git reset HEAD <file-name>

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# View changes
git diff
```

### Commit Message Conventions
```bash
# Types:
feat:     # New feature
fix:      # Bug fix
docs:     # Documentation changes
style:    # Code style changes (formatting)
refactor: # Code refactoring
test:     # Adding tests
chore:    # Maintenance tasks

# Examples:
git commit -m "feat: add position management feature"
git commit -m "fix: correct P/L calculation logic"
git commit -m "docs: update README with setup instructions"
```

---

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill process by PID
kill -9 <PID>

# Kill all processes on port 3000 (Linux/Mac)
npx kill-port 3000

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Database Connection Issues
```bash
# Test database connection
npx prisma db push

# Check PostgreSQL is running
docker-compose ps

# View PostgreSQL logs
docker-compose logs postgres

# Restart PostgreSQL
docker-compose restart postgres

# Verify DATABASE_URL
echo $DATABASE_URL
```

### Prisma Client Issues
```bash
# Regenerate Prisma Client
npx prisma generate

# Clear Prisma cache
rm -rf node_modules/.prisma

# Reinstall dependencies
npm install
```

### Build Errors
```bash
# Clear all caches and rebuild
rm -rf .next node_modules package-lock.json
npm install
npm run build

# Check TypeScript errors
npx tsc --noEmit

# Check for missing types
npm install -D @types/node @types/react @types/react-dom
```

### Environment Variables Not Loading
```bash
# Check file name (should be .env.local)
ls -la | grep .env

# Restart development server
# Ctrl+C to stop, then npm run dev

# Print all env variables (debug)
node -e "console.log(process.env)"
```

---

## 📝 Useful Tips

### Quick Setup
```bash
# Initial project setup (one-time)
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

### Daily Workflow
```bash
# Start work
git pull origin main
docker-compose up -d
npm run dev

# End work
git add .
git commit -m "feat: description"
git push origin main
docker-compose down
```

### Before Deployment
```bash
# Run all checks
npm run lint
npm run type-check
npm run build
npx prisma migrate deploy
```

### Keyboard Shortcuts (VS Code)
```
Ctrl+`          # Toggle terminal
Ctrl+Shift+`    # New terminal
Ctrl+P          # Quick file open
Ctrl+Shift+P    # Command palette
Ctrl+B          # Toggle sidebar
Ctrl+/          # Comment line
Ctrl+D          # Select next occurrence
```

---

## 🔗 Quick Links

- **Prisma Documentation**: https://www.prisma.io/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **PostgreSQL Documentation**: https://www.postgresql.org/docs
- **Docker Documentation**: https://docs.docker.com
- **Implementation Plan**: [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md)

---

**Last Updated**: January 2025
