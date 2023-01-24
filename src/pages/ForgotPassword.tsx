import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelectors";
import { forgotPassword } from "../features/authSlice";

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>('');
    const [forgotEmailError, setForgotEmailError] = useState<string>('');
    const [forgotEmailBorder, setForgotEmailBorder] = useState<boolean>(false);

    //redux
    const dispatch = useAppDispatch();
    const { isLoadingForgotEmail, isErrorForgotEmail, isForgotEmailMessage, isSuccessForgotEmail } = useAppSelector(state => state.auth);

    const resetError = () => {
        setForgotEmailError('');
        setForgotEmailBorder(false);
    }

    const resetField = () => {
        setEmail('');
    }

    const handlePasswordRecovery = (e: React.FormEvent<HTMLFormElement>) => {
        resetError();
        e.preventDefault();
        if(!email){
            setForgotEmailError('Please input your valid Email Address');
            setForgotEmailBorder(true);
            return;
        }

        const userEmail = { email };
        dispatch(forgotPassword(userEmail));
        resetField();
    }

    return (
        <div className="p-5 md:text-center">
            <form onSubmit={handlePasswordRecovery}>
                <div className="mb-1">
                    <label className="font-mono block text-sm mb-3">PLEASE ENTER YOUR EMAIL ADDRESS</label>
                    <input 
                        type='text' 
                        className="border-2 border-black outline-none w-full md:w-96 p-2"
                        style={{ borderColor: forgotEmailBorder ? 'red' : 'black' }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <p className="text-xs font-mono text-red-700">{forgotEmailError}</p>

                <button 
                    className="px-2 py-2 bg-black text-xs text-white w-full md:w-96 mt-3"
                    disabled={isLoadingForgotEmail === true}>
                    SEND CODE
                </button>
            </form>
            {isErrorForgotEmail && <p className="font-mono text-xs text-red-700 mt-1">{isForgotEmailMessage}</p>}
            {!isErrorForgotEmail && <p className="font-mono text-xs text-black mt-1 animate-pulse">{isForgotEmailMessage}</p>}
            <Link to='/register' className="text-xs font-mono block mt-3">create a new account instead?</Link>
            
        </div>
        
    )
}

export default ForgotPassword;