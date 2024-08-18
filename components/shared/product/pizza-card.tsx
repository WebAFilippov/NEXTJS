import { cn } from '@/shared/lib/utils'
import React from 'react'
import { Info } from 'lucide-react'
import { ProductFull } from '@/@types'
import { Title } from '../title'
import { Button, Popover } from '@/components/ui'
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface Props {
  product: ProductFull
  onOpenChange: () => void
  className?: string
}

export const PizzaCard: React.FC<Props> = ({ product, onOpenChange, className }) => {
  const addProductToBasket = () => {
    onOpenChange()
  }

  return (
    <div className={cn(className, 'flex')}>
      {/* Изображение карточки */}
      <div className='w-[530px]'>
        <img
          src={product.variants[0].imageUrl}
          alt={product.name}
          className='transition-all z-10 duration-300 w-[350px] h-[350px] mt-[128px] mx-auto'
        />
      </div>

      {/* Информация о карточке */}
      <div className='w-[394px] bg-[#FCFCFC] rounded-r-[20px] flex flex-col p-[30px]'>
        <div className='flex justify-between relative'>
          <Title
            text={product.name}
            size='md'
            className='font-dodo font-medium text-black text-[24px] leading-7 flex-1 pr-[30px]'
          />
          <Popover>
            <PopoverTrigger className='absolute top-1 right-0'>
              <Info className='w-[24px] h-[24px] text-black cursor-pointer flex-start stroke-[2.25] hover:scale-105' />
            </PopoverTrigger>
            <PopoverContent
              side='bottom'
              sideOffset={12}
              align='end'
              alignOffset={-12}
              className='w-[250px] p-[12px] rounded-[10px] bg-[#373535] flex flex-col gap-3 text-white font-medium text-[12px] leading-[14px]'
            >
              <h2 className='font-dodo opacity-50'>Пищевая ценность на 100 г</h2>

              <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
              </ul>

              <ul>
                <li>5</li>
              </ul>
            </PopoverContent>
          </Popover>
        </div>

        <Button
          loading={false}
          onClick={addProductToBasket}
          className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'
        >
          Добавить в корзину за {product.variants[0]?.price} ₽
        </Button>
      </div>
    </div>
  )
}
