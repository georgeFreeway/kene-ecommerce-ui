import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelectors";
import { registerUsers } from "../features/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [gender, setGender] = useState<string>('Male');
    const [checked, setIsChecked] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<string>('');
    const [emailBorder, setEmailBorder] = useState<boolean>(false);
    const [usernameError, setUserNameError] = useState<string>('');
    const [userNameBorder, seUserNameBorder] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<string>('');
    const [passwordBorder, setPasswordBorder] = useState<boolean>(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
    const [confirmBorder, setConfirmBorder] = useState<boolean>(false);
    const [checkedError, setCheckedError] = useState<string>('');

    //redux
    const dispatch = useAppDispatch();
    const { isLoadingRegister, isSuccessRegister, isErrorRegister, isRegisterMessage, user } = useAppSelector((state) => state.auth);

    const navigate = useNavigate();

    const resetError = () => {
        setEmailError('');
        setUserNameError('');
        setPasswordError('');
        setConfirmPasswordError('');
        setCheckedError('');
        setEmailBorder(false);
        seUserNameBorder(false);
        setPasswordBorder(false);
        setConfirmBorder(false);
    }

    const resetField = () => {
        setEmail('')
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setGender('Male');
        setIsChecked(false);
    }

    //registering a user
    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        resetError();
        e.preventDefault();

        if (!email){
            setEmailError('A valid Email Address is required!');
            setEmailBorder(true);
            return;
        }

        if (!username){
            seUserNameBorder(true);
            setUserNameError('Username cannot be empty!');
            return;
        }

        if (!password  || password.length <= 6){
            setPasswordBorder(true);
            setPasswordError('Password must be atleast 6 characters long!');
            return;
        }

        if (!confirmPassword || confirmPassword !== password){
            setConfirmBorder(true);
            setConfirmPasswordError('Passwords do not match!');
            return;
        }

        if(!checked){
            return setCheckedError('You must agree with our terms and conditions!');
        }
        const userData = { email, username, password, confirmPassword, gender, checked };
        dispatch(registerUsers(userData));
        resetField();


       setTimeout(() => {
        navigate('/verify-email');
       }, 3000);
    }


    return (
        <div className="mb-20">
            <h1 className="font-mono">NEW CUSTOMER</h1>
            <form onSubmit={handleRegister}>
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
                    <label className="font-mono block text-xs">USERNAME</label>
                    <input 
                        type='text' 
                        className="border-2 border-black outline-none w-full md:w-96 p-2"
                        style={{ borderColor: userNameBorder ? 'red' : 'black' }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <p className="text-xs font-mono text-red-700">{usernameError}</p>

                <div className="flex justify-center mt-5 gap-5 items-center">
                    <div>
                        <input 
                            className="accent-black" 
                            type='radio' 
                            value='Male'
                            checked={gender === 'Male'} 
                            onChange={(e) => setGender(e.target.value)}
                        />
                        <label className="font-mono text-sm"> MALE</label>
                    </div>

                    <div>
                        <input 
                            className="accent-black" 
                            type='radio' 
                            value='Female'
                            checked={gender === 'Female'} 
                            onChange={(e) => setGender(e.target.value)}
                        />
                        <label className="font-mono text-sm"> FEMALE</label>
                    </div>
                </div>

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

                <div className="mt-5 mb-1">
                    <label className="font-mono block text-xs">CONFIRM PASSWORD</label>
                    <input 
                        type='password' 
                        className="border-2 border-black outline-none w-full md:w-96 p-2"
                        style={{ borderColor: confirmBorder ? 'red' : 'black' }}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <p className="text-xs font-mono text-red-700">{confirmPasswordError}</p>


                <div className="flex items-center gap-2 mt-5 mb-1">
                    <input 
                        type='checkbox' 
                        className="h-5 w-5 accent-black"
                        checked={checked} 
                        onChange={(e) => setIsChecked(e.target.checked)}
                    />
                    <p className="font-mono text-xs">I AGREE TO THE TERMS AND CONDITIONS OF SOLE LUXURY</p>
                </div>
                <p className="text-xs font-mono text-red-700">{checkedError}</p>

                {!isLoadingRegister && <button 
                    className="px-2 py-2 bg-black text-xs text-white md:w-96 w-full mt-5">
                    REGISTER
                </button>}
                {isLoadingRegister && <button 
                    className="px-2 py-2 bg-black text-xs text-white md:w-96 w-full mt-5"
                    disabled>
                    REGISTER
                </button>}
                {isLoadingRegister && <p className="mt-2 font-mono text-sm">Registering, Please wait...</p>}
            </form>
            {isRegisterMessage.includes('409') && <p className="mt-2 text-xs font-mono text-red-700">Email Already taken. Please choose another. 🙏</p>}
            {isErrorRegister && <p className="mt-2 text-xs font-mono text-red-700">Unable to register 😩</p>}
            {isSuccessRegister && user && <Link to='/' className="mt-2 text-xs font-mono animate-pulse">WELCOME TO SOLE LUXURY. LET'S SEE WHAT YOU MIGHT LIKE 🎉 🎊</Link>}
        </div>
    )
}

export default Register;