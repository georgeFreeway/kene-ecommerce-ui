import { useState } from 'react';
import { Link } from 'react-router-dom';
import { items } from '../customTypes/types';
import { FaWindowClose } from 'react-icons/fa';

//components
import Login from './Login';
import Register from './Createuser';

const RegisterPage = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false)

  const openMenu = () => {
    setShowMenu(true)
  }

  const closeMenu = () => {
    setShowMenu(false)
  }

  return (
    <div className="md:flex justify-evenly mt-5 p-5">
      <div className="hidden md:block">
        {!showMenu && (
          <button
            className="md:block px-4 py-2 bg-black text-white text-sm font-mono w-24"
            onClick={openMenu}
          >
            MENU
          </button>
        )}

        {showMenu && (
          <div className="flex items-start gap-8 justify-between p-4">
            <ul>
              {items.map((item) => (
                <li className="mb-3 font-mono text-xs" key={item.name}>
                  <Link to={item.path}>{item.name}</Link>
                </li>
              ))}
            </ul>
            <FaWindowClose className="cursor-pointer" onClick={closeMenu} />
          </div>
        )}
      </div>

      {/* login */}
      <Login />

      {/* Register*/}
      <Register />
    </div>
  )
}

export default RegisterPage;
