import Link from "next/link"
import React from "react"
import { Title } from "./title"
import { Button } from "../ui"
import { Plus } from "lucide-react"

interface Props {
  id: string
  name: string
  price: number
  imageUrl: string
  className?: string
}

export const ProductCard: React.FC<Props> = ({ id, name, price, imageUrl, className }) => {
  return (
    <div className={className}>
      <Link href={`product/${id}`}>
        <div className="flex bg-secondary p-6 h-[260px] rounded-lg justify-center">
          <img src={imageUrl} alt={name} className="w-[215px] h-[215px]" />
        </div>

        <Title text={name} size="sm" className="font-bold mt-3 mb-1" />

        <p className="text-sm text-gray-400">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse tempora recusandae
          quisquam, earum unde cupiditate saepe amet odit ea iure?
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            <b>от {price} ₽</b>
          </span>

          <Button variant="secondary" className="text-base font-bold">
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  )
}
