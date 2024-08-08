import { cn } from '@/shared/lib/utils'
import { ArrowDown } from 'lucide-react'
import React from 'react'

interface Props {
  className?: string
}

export const SortPopup: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 h-[52px] rounded-2xl cursor-pointer bg-gray-50 px-5 font-bold',
        className,
      )}
    >
      <ArrowDown size={16} />
      <b>Сортировка:</b>
      <b className='text-primary'>популярности</b>
    </div>
  )
}
