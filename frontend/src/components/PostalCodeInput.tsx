import {useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {
  formatPostalCodeForUrl,
  POSTAL_CODE_QUERY_PARAM,
  validPostalCode,
} from '../utils/PostalCodeUtils';

interface PostalCodeInputProps {
  initialValue?: string;
  redirect?: string;
  theme?: 'dark' | 'light';
  layout?: 'stacked' | 'inline';
  onValidSubmit?: () => void;
}

export default function PostalCodeInput({
  initialValue = '',
  redirect,
  theme = 'light',
  layout = 'stacked',
  onValidSubmit,
}: PostalCodeInputProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!validPostalCode(value)) {
      setError('Invalid postal code format');
    } else {
      setError('');
      const urlCode = formatPostalCodeForUrl(value);
      if (redirect) {
        navigate(`${redirect}?${POSTAL_CODE_QUERY_PARAM}=${urlCode}`);
      } else {
        params.set(POSTAL_CODE_QUERY_PARAM, urlCode);
        navigate({
          pathname: location.pathname,
          search: params.toString(),
        });
      }
      onValidSubmit?.();
    }
  };

  const themeClasses = {
    dark: {
      input:
        'border-gray-600 bg-blue-950 text-white placeholder-gray-300 focus:ring-blue-400',
      errorText: 'text-red-400',
      button: 'bg-blue-500 text-white hover:bg-blue-600',
    },
    light: {
      input:
        'border-gray-300 bg-white text-black placeholder-gray-500 focus:ring-blue-400',
      errorText: 'text-red-600',
      button: 'bg-blue-950 text-white hover:bg-blue-800',
    },
  };
  const classes = themeClasses[theme];

  return (
    <div
      className={`flex ${
        layout === 'stacked'
          ? 'flex-col space-y-2'
          : 'flex-row items-center space-x-2'
      } w-full`}
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type='text'
        placeholder='Enter postal code'
        className={`border rounded-md p-2 w-full focus:outline-none focus:ring-2 transition ${
          classes.input
        } ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
      />
      {error && layout === 'stacked' && (
        <p className={classes.errorText + ' text-sm'}>{error}</p>
      )}
      <button
        onClick={handleSubmit}
        disabled={!value}
        className={`rounded-lg transition ${
          layout === 'stacked'
            ? 'px-6 py-2 text-sm md:text-lg'
            : 'px-4 py-1 text-sm'
        } ${classes.button} disabled:opacity-50`}
      >
        Submit
      </button>
    </div>
  );
}
