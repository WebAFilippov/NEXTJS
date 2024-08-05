import { Product } from '@prisma/client'
import { axiosInstance } from './axios-instance'
import { ApiRoutes } from './axios-route'

export const search = async (search: string): Promise<Product[]> => {
  return (await axiosInstance.get<Product[]>(ApiRoutes.SEARCH_URL, { params: { search } })).data
}
