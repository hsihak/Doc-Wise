import React from 'react';
import { Header } from '../components/Header/Header';
import CheckMarkSvg from '../CheckMark.svg';
import { Button } from '@mui/material';

const Home = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='flex flex-1 items-center flex-col'>
        <h2 className='text-4xl py-6'>Simplify Your Document Tasks with Ease!</h2>
        <div className='grid grid-cols-3 w-2/4 justify-items-center'>
          <div className='flex flex-col items-center justify-between'>
            <ul>
              <li className='flex items-center my-2 text-xl'>
                <img src={CheckMarkSvg} alt='CheckMark Icon' className='mr-3 w-10 h-10' />
                Effortless Comparisons
              </li>
              <li className='flex items-center my-2 text-xl'>
                <img src={CheckMarkSvg} alt='CheckMark Icon' className='mr-3 w-10 h-10' />
                Highlighted Differences
              </li>
              <li className='flex items-center my-2 text-xl'>
                <img src={CheckMarkSvg} alt='CheckMark Icon' className='mr-3 w-10 h-10' />
                Instant Summaries
              </li>
            </ul>
            <div className='flex flex-col gap-4'>
              <Button variant='contained' sx={{
                  background: '#416E71',
                  width: '200px',
                  borderRadius: '10px'
                }}>
                Sign Up
              </Button>
              <Button variant='contained' sx={{
                  background: '#88A98D',
                  width: '200px',
                  borderRadius: '10px'
                }}>
                Log in
              </Button>

            </div>
          </div>
          <div className='flex items-center flex-col justify-center'>
            <div className='my-4 border-r border-gray-300 h-full'></div>
          </div>
          <div className='flex items-center flex-col'>
            <img src="src\assets\Pdf-Image.png" alt="" width="300px" height="300px" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
