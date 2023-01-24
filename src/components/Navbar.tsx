import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHamburger, FaShoppingBag, FaSearch } from 'react-icons/fa';
import { useAppSelector, useAppDispatch } from '../hooks/useTypedSelectors';
import { logout } from '../features/authSlice';

//components
import Search from './Search';
import Menu from './Menu';

const Navbar = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const { amount } = useAppSelector(state => state.cart);
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const [isMenu, setIsMenu] = useState<boolean>(false);

    const openSearch = () => {
        setIsSearch(true);
    }

    const closeSearch = () => {
        setIsSearch(false);
    }
    
    const openMenu = () => {
        setIsMenu(true);
    }

    const closeMenu = () => {
        setIsMenu(false);
    }
    
    return (
        <header>
            {isMenu && <Menu closeMenu={closeMenu} />}
            {isSearch && <Search closeSearch={closeSearch} />}
            {!isSearch && !isMenu && <nav className='flex items-center justify-between p-3 w-screen'>
                <div className='hidden md:flex'>
                    <Link to=''>
                        <p className='text-sm font-mono'>SHIP TO YOU |</p>
                    </Link>
                    {!user && <Link to='/register'>
                        <p className='text-sm font-mono'>&nbsp;LOGIN</p>
                    </Link>}
                    {user && <p className='text-sm font-mono cursor-pointer' onClick={() => dispatch(logout())}>&nbsp;LOGOUT </p>}
                </div>
                {/* small screen menu button */}
                <FaHamburger className='md:hidden cursor-pointer' onClick={openMenu} />

                <div>
                    <Link to='/'>
                        <h1 className='text-3xl font-semibold font-mono'>SOLE LUXURY</h1>
                    </Link>
                </div>

                <div className='hidden md:flex items-center space-x-1'>
                    <Link to='/addtocart' className='text-sm font-mono'>BAG ( { amount } )</Link>
                    <input className='w-32 border-b-2 border-black outline-none' />
                    <FaSearch className='cursor-pointer'/>
                </div>
                {/* small screens */}
                <div className='flex space-x-2 items-center md:hidden'>
                    <Link to='/addtocart' className='flex items-center'>
                        <FaShoppingBag className='cursor-pointer'/> 
                        <p className='font-mono text-sm'>( { amount } )</p>
                    </Link>
                    <FaSearch className='cursor-pointer' onClick={openSearch}/>
                </div>
            </nav>}
        </header>
    )
}

export default Navbar;