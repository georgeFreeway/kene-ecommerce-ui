import { setIsClose } from '../features/modalSlice';
import { clearState } from '../features/cartSlice'
import { useAppDispatch } from '../hooks/useTypedSelectors';

const Modal = () => {
  const dispatch = useAppDispatch();
  
  return (
    <div className='fixed h-screen bg-zinc-200 opacity-90 insert-0 z-50 w-screen'>
      <div className='pt-24 pb-24 text-center border-2 border-gray-300 w-96 mx-auto mt-24 bg-white rounded-md'>
        <p className='text-sm font-mono mb-2'>ARE YOU SURE YOU WANT TO CLEAR YOUR CART?</p>
        <div className='flex justify-center gap-5'>
          <button 
            className='px-4 py-2 bg-black text-white text-sm font-mono'
            onClick={() => {
              dispatch(clearState());
              dispatch(setIsClose());
            }}>CLEAR CART
          </button>
          <button 
            className='px-4 py-2 bg-black text-white text-sm font-mono'
            onClick={() => dispatch(setIsClose())}>CANCEL
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal;