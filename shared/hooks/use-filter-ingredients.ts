import { Api } from '@/shared/services/api-client'
import { Ingredient } from '@prisma/client'
import { useEffect, useState } from 'react'

interface ReturnData {
  items: Ingredient[]
  loading: boolean
}

export const useFilterIndgredients = (): ReturnData => {
  const [items, setItems] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState(true)

  // api/ingredients/getAll - все ингредиенты в фильтр чекбоксов
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
