import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useTypedSelectors';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { removeItem, decreaseItem, increaseItem } from '../features/cartSlice';
import { setIsOpen } from '../features/modalSlice';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartitems, total } = useAppSelector(state => state.cart);
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const handleCheckOut = () => {
    navigate('/checkout');
  }

  return (
    <div className='p-5'>
      {cartitems && cartitems.map((item) => (
        <div className='mb-2 border-b-2 border-gray-200 pb-3' key={item._id}>
          <h1 className='font-semibold text-sm font-mono'>{item.name.toUpperCase()}</h1>
          <p className='mb-2 text-sm font-mono font-semibold'>$ {item.price}</p>
          <div className='flex space-x-1 mb-3'>
            <FaPlus 
              className='h-4 border-2 border-gray-900 cursor-pointer' 
              onClick={() => dispatch(increaseItem(item))}
            />
            <p className='text-sm font-mono'>{item!.rating}</p>
            <FaMinus 
              className='h-4 border-2 border-gray-900 cursor-pointer'
              onClick={() => {
                if(item?.rating === 1){
                  dispatch(removeItem(item));
                }
                dispatch(decreaseItem(item));
              }}
            />
          </div>
          <button 
            className='px-2 py-2 bg-black text-white text-sm'
            onClick={() => dispatch(removeItem(item))}
            >REMOVE FROM CART
          </button>
        </div>
      ))}

      {cartitems.length < 1 && <p className='font-mono text-sm mb-5 text-center'>NO ITEMS IN YOUR CART</p>}
      <div className='flex justify-around items-center border-b-2 border-gray-700'>
        <h2 className='font-mono text-sm mt-5'>TOTAL</h2>
        <p className='font-mono text-sm mt-5'>${total}</p>
      </div>
      {!user && <Link to='/register' className='text-sm font-mono animate-pulse font-semibold block'>YOU NEED TO BE LOGGED IN TO CHECK OUT</Link>}
      <Link to='/' className='text-sm font-mono font-bold'>CONTINUE SHOPPING</Link>
      <div className='flex gap-5 justify-center text-center pb-5'>
        <button 
          className='px-2 py-2 bg-black text-sm font-mono text-white mt-5'
          onClick={() => dispatch(setIsOpen())}
          disabled={cartitems.length < 1}>CLEAR CART
        </button>

        <button 
          className='px-2 py-2 bg-black text-sm font-mono text-white mt-5'
          onClick={handleCheckOut}
          disabled={cartitems.length < 1}>CHECK OUT
        </button>
      </div>
    </div>
  )
}

export default CartPage;