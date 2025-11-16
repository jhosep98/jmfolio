import { BarChart3, Receipt, Target, TrendingUp } from 'lucide-react'
import type * as React from 'react'
import { AnimatedGroup } from '@/components/ui/animated-group'

type Feature = {
  icon: typeof TrendingUp
  title: string
  description: string
}

type FeaturesSectionProps = {
  dict: {
    title: string
    subtitle: string
    multiAsset: { title: string; description: string }
    transactions: { title: string; description: string }
    goals: { title: string; description: string }
    realtime: { title: string; description: string }
  }
}

const transitionVariants = {
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', bounce: 0.3, duration: 0.8 },
    },
  },
} as const

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ dict }) => {
  const features: Feature[] = [
    {
      icon: TrendingUp,
      title: dict.multiAsset.title,
      description: dict.multiAsset.description,
    },
    {
      icon: Receipt,
      title: dict.transactions.title,
      description: dict.transactions.description,
    },
    {
      icon: Target,
      title: dict.goals.title,
      description: dict.goals.description,
    },
    {
      icon: BarChart3,
      title: dict.realtime.title,
      description: dict.realtime.description,
    },
  ]

  return (
    <section id='features' className='py-24 md:py-32'>
      <div className='mx-auto max-w-7xl px-6'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-3xl font-semibold tracking-tight md:text-4xl'>{dict.title}</h2>
          <p className='text-muted-foreground mt-4 text-lg'>{dict.subtitle}</p>
        </div>

        <AnimatedGroup
          variants={{
            container: {
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2,
                },
              },
            },
            ...transitionVariants,
          }}
          className='mt-16 grid gap-8 md:grid-cols-2 lg:gap-12'
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className='bg-muted/50 group relative rounded-2xl border p-8 transition-all hover:shadow-lg'
              >
                <div className='bg-primary/10 mb-4 inline-flex rounded-xl p-3'>
                  <Icon className='text-primary size-6' />
                </div>
                <h3 className='mb-2 text-xl font-semibold'>{feature.title}</h3>
                <p className='text-muted-foreground text-sm leading-relaxed'>
                  {feature.description}
                </p>
              </div>
            )
          })}
        </AnimatedGroup>
      </div>
    </section>
  )
}

export default FeaturesSection
