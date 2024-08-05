import React from 'react'

interface Props {
  params: { id: string }
  className?: string
}

const ProductPage: React.FC<Props> = ({ params: { id }, className }) => {
  return <div className={className}>{id}</div>
}

export default ProductPage
