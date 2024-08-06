import React from 'react'

const ProductPage = ({ params: { id } }: { params: { id: string } }) => {
  return <div>{id}</div>
}

export default ProductPage
