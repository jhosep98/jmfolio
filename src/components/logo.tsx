import { cn } from '@/lib/utils'

export const Logo = ({ className }: { className?: string }) => (
  <span className={cn('text-foreground font-bold text-2xl', className)}>JMFolio</span>
)
