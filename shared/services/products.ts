import { axiosInstance } from './axios-instance'
import { ApiRoutes } from './axios-route'
import { ProductWithVariantsIngredients } from '@/@types'

export const search = async (search: string): Promise<ProductWithVariantsIngredients[]> => {
  return (
    await axiosInstance.get<ProductWithVariantsIngredients[]>(ApiRoutes.SEARCH_URL, {
      params: { search },
    })
  ).data
}
