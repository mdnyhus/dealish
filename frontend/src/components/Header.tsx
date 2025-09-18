import {useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import PostalCodeInput from './PostalCodeInput';
import {formatPostalCodeForTitle} from '../utils/PostalCodeUtils';

export default function Header() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const postalCode = formatPostalCodeForTitle(
    searchParams.get('postalCode') || ''
  );
  const [editing, setEditing] = useState(false);

  return (
    <header className='bg-blue-950 flex justify-between items-center p-4 md:px-8 relative'>
      <h1
        className='text-2xl md:text-3xl font-bold text-blue-500 cursor-pointer'
        onClick={() => navigate('/')}
      >
        Dealish
      </h1>

      {/* Centered postal code or input */}
      <div className='absolute left-1/2 transform -translate-x-1/2'>
        {!editing && postalCode && (
          <span
            className='cursor-pointer hover:underline'
            onClick={() => setEditing(true)}
          >
            {postalCode}
          </span>
        )}
        {editing && (
          <PostalCodeInput
            initialValue={postalCode}
            onValidSubmit={() => setEditing(false)}
            theme='dark'
            layout='inline'
          />
        )}
      </div>

      <button className='bg-black text-white px-3 py-1 md:px-5 md:py-2 rounded-lg text-sm md:text-base hover:bg-gray-800 transition'>
        Login
      </button>
    </header>
  );
}
