'use client'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Variant {
  name: string
  value: number
  disabled?: boolean
}

interface Props {
  items: Variant[]
  selectedVarintId: Variant['value']
  onClick?: (value: Variant['value']) => void
  className?: string
}

export const GroupVariants: React.FC<Props> = ({ items, selectedVarintId, onClick, className }) => {
  return (
    <div
      className={cn(
        'flex flex-1 items-center justify-between bg-[#f1f0f5] p-1 select-none rounded-3xl overflow-auto',
        className,
      )}
    >
      {items.map((item) => (
        <button
          key={item.value}
          className={cn(
            'flex flex-1 justify-center items-center px-5 h-[30px] text-sm rounded-3xl transition-all duration-300 cursor-pointer',
            {
              'bg-white shadow-custom': selectedVarintId === item.value,
              'text-gray-500 opacity-50 cursor-not-allowed': item.disabled,
            },
          )}
          onClick={() => onClick?.(item.value)}
        >
          {item.name}
        </button>
      ))}
    </div>
  )
}
