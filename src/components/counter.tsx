'use client'

import type * as React from 'react'
import { useCounterStore } from '@/providers/counter-store-provider'
import { Button } from './ui/button'

const Counter: React.FC = () => {
  const { count, incrementCount, decrementCount } = useCounterStore((state) => state)

  return (
    <div className='flex flex-col gap-4 items-start'>
      Count: {count}
      <Button type='button' onClick={incrementCount}>
        Increment Count
      </Button>
      <Button type='button' onClick={decrementCount}>
        Decrement Count
      </Button>
    </div>
  )
}

export default Counter
