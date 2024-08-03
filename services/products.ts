import { Product } from '@prisma/client'
import { axiosInstance } from './axios-instance'

export const search = async (search: string) => {
  return (await axiosInstance.get<Product[]>('/products/search', { params: { search } })).data
}
