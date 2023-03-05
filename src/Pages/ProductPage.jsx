import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const ProductPage = () => {
  const { productId } = useParams()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [product, setProduct] = useState()

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:5005/products/${productId}`)
      const parsed = await response.json()
      if (parsed === null) {
        navigate('/404')
      } else {
        console.log(parsed)
        setProduct(parsed)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [productId])

  const handleDelete = async () => {
    await fetch(`http://localhost:5005/products/delete/${productId}`, {
      method: 'DELETE',
    })
    navigate('/')
  }

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <h1>{product.title}</h1>
      <p>Price: {product.price}</p>
      <Link to={`/products/update/${product._id}`}>
        <button type='button'>Update</button>
      </Link>
      <button type='button' onClick={handleDelete}>
        Delete
      </button>
    </>
  )
}

export default ProductPage