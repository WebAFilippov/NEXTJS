import { DefaultIngredient, Ingredient, Product, ProductVariant } from '@prisma/client'

export type ProductWithVariantsIngredients = Product & {
  variants: ProductVariant[]
  defaultIngredients: DefaultIngredient[]
}
