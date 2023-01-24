import { FaWindowClose} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MenuProp, items } from '../customTypes/types';

const Menu = ({ closeMenu }: MenuProp) => {
    const handleMenu = () => {
        closeMenu();
    }

  return (
    <div className='md:hidden w-screen h-screen flex items-start justify-between p-4'>
        <ul>
            
            {items.map((item) => (
                <li className='mb-3 font-mono text-xs' key={item.name}>
                    <Link to={item.path}>
                        {item.name}
                    </Link>
                </li>
            ))}
        </ul>
        <FaWindowClose className='cursor-pointer' onClick={handleMenu}/>
    </div>
  )
}

export default Menu;