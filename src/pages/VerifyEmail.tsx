import React, { useState } from "react";
import axios from "axios";
import { useAppSelector } from "../hooks/useTypedSelectors";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
    const [ code, setCode ] = useState<string>('');
    const [ codeError, setCodeError ] = useState<string>('');
    const [ codeBorder, setCodeBorder ] = useState<boolean>(false);
    const [ message, setMessage ] = useState<string>('');

    const { user } = useAppSelector(state => state.auth);
    const navigate = useNavigate();

    const resetError = () => {
        setCodeBorder(false);
        setCodeError('');
    }

    const resetField = () => {
        setCode('');
    }

    const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
        resetError();
        e.preventDefault();

        if(!code || code.length !== 36){
            setCodeBorder(true);
            setCodeError('Please input the valid code');
            return;
        }
        const response = await axios.post(`http://localhost:8000/api/sole-luxury/users/verify-users/${user?._id}`, { code });
        const result = await response.data.message;
        setMessage(result);
        resetField();

        if(response.statusText === 'OK'){
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    }
    return (
        <div className="p-5 md:text-center">
            <h1 className="mb-2">WELCOME, {user?.username.toUpperCase()}</h1>
            <form onSubmit={handleVerify}>
                <div className="mb-1">
                    <label className="font-mono block text-sm mb-3">WE SENT A VERIFICATION CODE TO YOUR EMAIL ACCOUNT. USE IT TO VERIFY YOUR ACCOUNT HERE.</label>
                    <input 
                        type='text' 
                        className="border-2 border-black outline-none w-full md:w-96 p-2"
                        placeholder="0ace8f52-be07-4440-8862-9fdb104eeb03"
                        style={{ borderColor: codeBorder ? 'red' : 'black' }}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                </div>
                <p className="text-xs font-mono text-red-700">{codeError}</p>
    
                <button 
                    className="px-2 py-2 bg-black text-xs text-white w-full md:w-96 mt-3"
                    >
                    SUBMIT CODE
                </button>
            </form>
            <p className="mt-2 text-xs font-mono text-gray-900">{message}</p>
        </div>

    )
}

export default VerifyEmail;