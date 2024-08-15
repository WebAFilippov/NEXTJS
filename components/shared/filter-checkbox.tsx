import React from 'react'
import { Checkbox } from '../ui/checkbox'

export interface FilterChecboxProps {
  value: string
  endAdornment?: React.ReactNode
  onCheckedChange?: (checked: boolean) => void
  checked?: boolean
  name: string
}

export const FilterCheckbox: React.FC<FilterChecboxProps & { titleList: string }> = ({
  value,
  titleList,
  endAdornment,
  onCheckedChange,
  checked,
  name,
}) => {
  return (
    <div className='flex items-center space-x-2'>
      <Checkbox
        onCheckedChange={onCheckedChange}
        checked={checked}
        value={value}
        className='rounded-[8px] w-6 h-6'
        id={`checkbox-${titleList}-${String(value)}`}
      />
      <label
        htmlFor={`checkbox-${titleList}-${String(value)}`}
        className='leading-none cursor-pointer flex-1'
      >
        {name}
      </label>
      {endAdornment}
    </div>
  )
}
