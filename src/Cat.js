import { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { colors, codes } from './data';

const Cat = () => {
  const history = useHistory();
  const [colorNum, setColorNum] = useState(0);
  const [statusChange, setStatusChange] = useState(localStorage.getItem('catStatus')||'418');
  const [status, setStatus] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setStatusChange(status);
    setStatus('');
  };

  useEffect(() => {
    const myInterval = setInterval(() => {
        setColorNum((num) => ++num % colors.length)
      }, 5000)
    return () => clearInterval(myInterval)
  }, [])

  useEffect(() => {
    if (statusChange === '') {
      alert('Please enter a valid code')
      setStatusChange('404')
      return
    }

    if (!codes.includes(Number(statusChange))) {
      alert(`code ${statusChange} does not exist in cat status api`)
      setStatusChange(404)
    }

  }, [statusChange])

  useEffect(() => {
    localStorage.setItem('catStatus', statusChange)
  }, [statusChange])

  return (
    <div
      className='cat-container'
      style={{
        backgroundColor: colors[colorNum],
        transition: 'background-color 4s',
      }}
    >
      <h1>Cat Status</h1>
      <button onClick={() => history.push('/')}>Home</button>
      <div className='image-container'>
        <img src={`https://http.cat/${statusChange}`} alt='404' />
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='cStatus'>
          <input
            type='number'
            id='cStatus'
            onChange={e => setStatus(e.target.value)}
            placeholder='find new status'
            value={status}
          />
        </label>
        <button type='submit'>Change Status</button>
      </form>
    </div>
  );
};

export default Cat;