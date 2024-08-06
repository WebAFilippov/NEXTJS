import { Api } from '@/services/api-client'
import { Ingredient } from '@prisma/client'
import { useEffect, useState } from 'react'

interface ReturnData {
  items: Ingredient[]
  loading: boolean
}

export const useFilterIndgredients = (): ReturnData => {
  const [items, setItems] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Api.ingredients
      .getAll()
      .then((response) => setItems(response))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false))
  }, [])

  return {
    items,
    loading,
  }
}
