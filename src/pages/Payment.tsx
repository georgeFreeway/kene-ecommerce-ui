import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelectors";
import { paymentMethod } from "../features/cartSlice";

const Payment = () => {
    //redux
    const dispatch = useAppDispatch();
    const { payment } = useAppSelector((state) => state.cart);
    const [pay, setPay] = useState<string>('PAYSTACK' || payment);
    const navigate = useNavigate();

    const handlePayment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(paymentMethod(pay));
        navigate('/order');
    }

    return (
        <div>
            <h1 className="font-mono text-center">PAYMENT</h1>
            <div className="md:flex justify-center p-5">
                <form onSubmit={handlePayment}>
                    <h1 className="font-mono mb-2">SELECT PAYMENT METHOD</h1>
                    <div>
                        <select className="border-2 border-black outline-none w-full md:w-96 p-2" onChange={(e) => setPay(e.target.value)}>
                            <option value={pay}>{pay}</option>
                        </select>
                    </div>

                    <button 
                        className="px-2 py-2 bg-black text-xs text-white w-full md:w-96 mt-3">
                        CONTINUE
                    </button>
                </form>
            </div>
        </div>

    )
}

export default Payment;