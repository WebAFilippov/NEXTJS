import {
  DefaultIngredient,
  Product,
  ProductVariant,
  DetailInfoProduct,
  Ingredient,
} from '@prisma/client'

export interface ProductVariantFull extends ProductVariant {
  detailInfo?: DetailInfoProduct
  ingredients?: Ingredient[]
}

export interface ProductWithVariantsIngredients extends Product {
  variants: ProductVariant[]
  defaultIngredients: DefaultIngredient[]
}

export interface ProductFull extends Product {
  variants: ProductVariantFull[]
  defaultIngredients?: DefaultIngredient[]
}
