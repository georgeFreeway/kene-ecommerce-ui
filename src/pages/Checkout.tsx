import { useState } from "react";
import { AddressType, states } from "../customTypes/types";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useTypedSelectors";
import { saveAddress } from "../features/cartSlice";

const Checkout = () => {
    //redux
    const dispatch = useAppDispatch();
    const userAddress: AddressType = JSON.parse(`${localStorage.getItem('address')}`) || {};

    const navigate = useNavigate();
    const [address, setAddress] = useState<string>(userAddress.address || "");
    const [addressError, setAddressError] = useState<string>('');
    const [addressBorder, setAddressBorder] = useState<boolean>(false);
    const [state, setState] = useState<string>(userAddress.state || "ENUGU");
    const [motorpark, setMotorpark] = useState<string>(userAddress.motorpark || "");
    const [motorparkError, setMotorparkError] = useState<string>('');
    const [motorparkBorder, setMotorparkBorder] = useState<boolean>(false);

    const resetError = () => {
        setAddressError('');
        setAddressBorder(false);
        setMotorparkError('');
        setMotorparkBorder(false);
    }

    const handleShipping = (e: React.FormEvent<HTMLFormElement>) => {
        resetError();
        e.preventDefault();

        if (!address || address.length < 6){
            setAddressError('A valid Address is required!');
            setAddressBorder(true);
            return;
        }else if(!address.includes('street' || 'Street')){
            setAddressError('Please provide your street or Street name');
            setAddressBorder(true);
            return;
        }

        if (!motorpark){
            setMotorparkError('Please input a notable motor-park');
            setMotorparkBorder(true);
            return;
        }

        const shipAddress = { address, state, motorpark };
        dispatch(saveAddress(shipAddress));
        navigate('/payment');


    }

    return (
        <div>
            <h1 className="font-mono text-center">SHIPPING</h1>
            <div className="md:flex justify-center p-5">
                <form onSubmit={handleShipping}>
                    <div className="mt-5 mb-1">
                        <label className="font-mono block text-xs">ADDRESS</label>
                        <input 
                            type='text'
                            className="border-2 border-black outline-none w-full md:w-full p-2"
                            style={{ borderColor: addressBorder ? 'red' : 'black' }}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <p className="text-xs font-mono text-red-700">{addressError}</p>

                    <div className="mt-5 mb-1">
                        <label className="font-mono block text-xs">STATE</label>
                        <select
                            className="border-2 border-black outline-none w-full md:w-full p-2"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            >
                            {states.map((dstate, i) => (
                                <option key={i} value={dstate}>{dstate}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-5 mb-1">
                        <label className="font-mono block text-xs">PROMINENT MOTOR PARK</label>
                        <input 
                            type='text'
                            className="border-2 border-black outline-none w-full md:w-96 p-2"
                            style={{ borderColor: motorparkBorder ? 'red' : 'black' }}
                            value={motorpark}
                            onChange={(e) => setMotorpark(e.target.value)}
                        />
                    </div>
                    <p className="text-xs font-mono text-red-700">{motorparkError}</p>

                    <button 
                        className="px-2 py-2 bg-black text-xs text-white md:w-96 w-full mt-5">
                        CONTINUE
                    </button>
                </form>
            </div>
        </div>
    )

}

export default Checkout;