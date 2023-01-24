import React, { useEffect, useState } from 'react';
import { getProducts } from '../features/productSlice';
import { useAppDispatch, useAppSelector } from '../hooks/useTypedSelectors';
import { items } from '../customTypes/types';

//components
import Products from '../components/Products';
import { Link } from 'react-router-dom';
import { FaWindowClose } from 'react-icons/fa';

const Home: React.FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const { products, isLoading, error } = useAppSelector((state) => state.products);

  const openMenu = () => {
    setShowMenu(true);
  }

  const closeMenu = () => {
    setShowMenu(false);
  }

  return (
    <div>
      {isLoading && <p className='text-black font-mono text-xs p-5'>LOADING...</p>}

      {error && <p className='text-red-700 font-mono text-xs p-5'>SERVER ERROR :(</p>}

      <div className='flex justify-between p-5'>
        {/* first box */}
        <div className='hidden md:block w-64'>
          {!showMenu && <button 
            className='md:block px-4 py-2 bg-black text-white text-sm font-mono w-24'
            onClick={openMenu}>MENU
          </button>}

          {showMenu && <div className='flex items-start justify-between p-4'>
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
        
        {/* second box with products */}
        <div className='md:flex'>
          {products && products.map((product) => (
            <Products product={product} key={product._id} />
          ))}
        </div>

      </div>
    </div>
  )
}

export default Home;