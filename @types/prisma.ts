import { Ingredient, Product, ProductVariant } from '@prisma/client'

export type ProductWithVariantsIngredients = Product & {
  variants: ProductVariant[]
  ingredients: Ingredient[]
}
