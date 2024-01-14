import React from 'react';

import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <>
      <div className='h-[calc(100vh-4rem)] grid place-items-center'>
        <Spinner size='lg' label='Loading...'/>
      </div>
    </>
  );
}
