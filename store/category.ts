import { create } from "zustand"
import { devtools } from "zustand/middleware"

const initialState = {
  activeId: 1,
}

export const useCategoryStore = create<typeof initialState>()(
  devtools(
    () => initialState,
    {
      name: "categoryStore",
    })
)

export const setActiveId = (id: number) => {
  useCategoryStore.setState({ activeId: id })
}