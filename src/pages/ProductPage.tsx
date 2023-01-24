import { useEffect, useState } from 'react';
import { getSingleProduct } from '../features/productSlice';
import { useAppDispatch, useAppSelector } from '../hooks/useTypedSelectors';
import { useParams, Link } from 'react-router-dom';
import { addToCart } from '../features/cartSlice';
import { items } from '../customTypes/types';
import { FaWindowClose, FaPlus, FaMinus } from 'react-icons/fa';

const ProductPage = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const { _id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSingleProduct(_id!));
  }, [dispatch, _id]);

  const { product, isLoading, error } = useAppSelector((state) => state.products);

  const handleCart = () => {
    dispatch(addToCart(product));
    setIsClicked(true);
  }

  const openMenu = () => {
    setShowMenu(true);
  }

  const closeMenu = () => {
    setShowMenu(false);
  }

  const openDescription = () => {
    setShowDescription(true);
  }

  const closeDescription = () => {
    setShowDescription(false);
  }

  return (
    <div className='flex p-5 mt-5 justify-around'>
      {isLoading && <p className='text-black font-mono text-sm'>LOADING...</p>}

      {error && <p className='text-red-700 font-mono text-sm'>NETWORK ERROR</p>}
      
      {/* first box */}
      <div className='hidden md:block w-52'>
        {!showMenu && <button 
            className='md:block px-4 py-2 bg-black text-white text-sm font-mono w-32'
            onClick={openMenu}>MENU
        </button>}

        {showMenu && <div className=' flex items-start justify-between p-4'>
          <ul>
            {items.map((item) => (
              <li className='mb-3 font-mono text-xs' key={item.name}>
                <Link to={item.path}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <FaWindowClose className='cursor-pointer' onClick={closeMenu}/>
        </div>}
      </div>

      {/* second box */}
      <div className='md:flex gap-5 items-start p-4'>
        <img src='' alt='product-image' className='mb-5'/>

        <div className='w-64'>
          <h1 className='text-3xl font-mono'>SOLE LUXURY</h1>
          <p className='font-bold font-mono'>$ {product.price}</p>
          <p className='font-mono text-sm mt-5'>{product.name}</p>
          {!showDescription && <FaPlus className='h-3 mt-2 cursor-pointer' onClick={openDescription} />}
          {showDescription && <p className='font-mono text-sm mt-2'>{product.description}.</p>}
          {showDescription && <FaMinus className='cursor-pointer h-3' onClick={closeDescription} />}

          <button 
            className='block px-4 py-2 bg-black text-white text-sm font-mono w-32 mt-5' 
            disabled={product.countInStock < 1}
            onClick={handleCart}>ADD TO CART
          </button>
          {product.countInStock < 1 && <p className='text-sm font-semibold font-mono mt-3'>OUT OF STOCK</p>}

          {isClicked && <button className='px-4 py-2 bg-black text-white text-sm font-mono w-32 mt-5'>ADDED !</button>}
        </div>

      </div>

    </div>
  )
}

export default ProductPage;