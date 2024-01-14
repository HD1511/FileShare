"use client"

import React from 'react';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

export default function GetStartedPage() {
  return (
    <>
      <div className='h-[calc(70vh-4rem)] flex flex-col justify-center m-10'>
        <div className='p-18 flex flex-col items-center'>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-500 tracking-wider py-10 sm:p-10 md:p-10">
            Upload, Save & Share
          </h1>
          <div className='break-all sm:text-lg md:mx-40 lg:mx-72 text-gray-600'>
            Drag and drop your file directly on our cloud and share it with your friends securely with password and send it on email
          </div>
          <div className='w-full flex justify-center mt-10'>
            <Link href={'/upload'} className='w-full sm:w-[350px]'>
              <Button fullWidth={true} color='primary' variant='flat'>Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}