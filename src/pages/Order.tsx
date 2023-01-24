import { AddressType, PaymentMethod } from '../customTypes/types';
import { useAppSelector, useAppDispatch } from '../hooks/useTypedSelectors';

const Order = () => {
    const { cartitems } = useAppSelector((state) => state.cart);
    const userAddress: AddressType = JSON.parse(`${localStorage.getItem('address')}`) || {};
    const payment: PaymentMethod = JSON.parse(`${localStorage.getItem('paymentmethod')}`) || '';

    return (
        <div className='px-5 py-5'>
            <div className='mb-5'>
                <h1 className='font-mono text-2xl'>SHIPPING TO</h1>
                <p className='font-mono text-sm'>{userAddress.address}</p>
                <p className='font-mono text-sm'>NOTABLE MOTOR PARK - {userAddress.motorpark}</p>
                <p className='font-mono text-sm'>{userAddress.state} STATE</p>
            </div>

            <div className='mb-5'>
                <h1 className='font-mono text-2xl'>PAYMENT METHOD</h1>
                <p className='font-mono text-sm'>{payment}</p>
            </div>

            <div>
                <h1 className='font-mono text-2xl'>ORDERED ITEMS</h1>
                {cartitems && cartitems.map((item, index) => (
                    <div key={index} className='p-2'>
                        <div className='flex items-start gap-8'>
                            <div>
                                <img src={item.image} alt='item-photo' />
                            </div>
                            <div>
                                <h1 className='font-mono text-sm font-semibold'>{item.name}</h1>
                                <p className='font-mono text-xs'>{item.brand}</p>
                                <p className='font-mono text-xs'>{item.category}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Order;