import { ProductProp } from '../customTypes/types';
import { Link } from 'react-router-dom';

//product list

const Products = ({ product }: ProductProp) => {
  return (
    <div className='p-2 mb-5'>
      <Link to={`/products/${product._id}`}>
        <h1 className='font-mono text-sm'>{product.name.toUpperCase()}</h1>
        <p className='font-mono text-sm mb-2'>{product.brand.toUpperCase()}</p>
        <h1 className='font-semibold text-sm'>$ {product.price}</h1> 
      </Link>
    </div>
  )
}

export default Products