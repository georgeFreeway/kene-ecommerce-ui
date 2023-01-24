import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelectors";
import { login } from "../features/authSlice";

const Login = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [emailBorder, setEmailBorder] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<string>('');
    const [passwordBorder, setPasswordBorder] = useState<boolean>(false);

    //redux
    const dispatch = useAppDispatch();
    const { isLoadingLogin, isErrorLogin, isLoginMessage, isSuccessLogin, user } = useAppSelector((state) => state.auth);

    const resetError = () => {
        setEmailError('');
        setPasswordError('');
        setEmailBorder(false);
        setPasswordBorder(false);
    }

    const resetField = () => {
        setEmail('');
        setPassword('');
    }

    //logining a user in
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        resetError();
        e.preventDefault();

        if (!email){
            setEmailError('Email Field cannot be empty!');
            setEmailBorder(true);
            return;
        }

        if (!password){
            setPasswordBorder(true);
            setPasswordError('Incorrect password!😩');
            return;
        }
        const userData = {email, password};

        //login user
        dispatch(login(userData));
        resetField();
    }

    return (
        <div className="mb-20">
            <h1 className="font-mono mb-5">LOGIN</h1>
            <form onSubmit={handleLogin}>
                <div className="mt-5 mb-1">
                    <label className="font-mono block text-xs">EMAIL</label>
                    <input 
                        type='email' 
                        className="border-2 border-black outline-none w-full md:w-96 p-2"
                        style={{ borderColor: emailBorder ? 'red' : 'black' }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <p className="text-xs font-mono text-red-700">{emailError}</p>

                <div className="mt-5 mb-1">
                    <label className="font-mono block text-xs">PASSWORD</label>
                    <input 
                        type='password' 
                        className="border-2 border-black outline-none w-full md:w-96 p-2"
                        style={{ borderColor: passwordBorder ? 'red' : 'black' }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <p className="text-xs font-mono text-red-700">{passwordError}</p>

                <Link to='/forgot-password' className="text-xs font-mono block mt-2">forgot password?</Link>

                <button 
                    className="px-2 py-2 bg-black text-xs text-white md:w-96 w-full mt-5 cursor-pointer"
                    disabled={isLoadingLogin === true}>
                    LOGIN
                </button>
                {isLoadingLogin && <p className="mt-2 font-mono text-sm">Logining, Please wait...</p>}
            </form>
            {isLoginMessage.includes('400') || isLoginMessage.includes('401') && <p className="mt-2 text-xs font-mono text-red-700">Incorrect Email and Password, did you forget your details?. 😞</p>}
            {isErrorLogin && <p className="mt-2 text-xs font-mono text-red-700">failed to login 😤</p>}
            {isSuccessLogin && user && <Link to='/' className="mt-2 text-xs font-mono animate-pulse block">WELCOME BACK TO SOLE LUXURY. CLICK TO CONTINUE SHOPPING {'>>>'}</Link>}
            {user && <Link to='/checkout' className="mt-2 text-xs font-mono animate-pulse">PROCEED TO CHECKOUT {'>>>'}</Link>}
        </div>
    )
}

export default Login;