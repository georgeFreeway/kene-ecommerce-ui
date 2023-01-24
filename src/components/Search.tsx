import { useState } from 'react';
import { FaSearch, FaWindowClose } from 'react-icons/fa';

type SearchProp = {
  closeSearch: () => void
}

const Search= ({ closeSearch }: SearchProp) => {
  const handleClose = () => {
    closeSearch();
  }
  return (
    <div className='text-center w-full p-4 flex justify-center space-x-2'>
      <FaWindowClose 
        className='cursor-pointer'
        onClick={handleClose}
      />
      <input 
        type='text' 
        className='w-96 border-b-2 border-black outline-none'
      />
      <FaSearch 
        className='cursor-pointer'
      />
    </div>
  )
}

export default Search;