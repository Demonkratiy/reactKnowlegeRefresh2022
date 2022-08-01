import axios from 'axios';
import React, { useState } from 'react';
import { IProduct } from '../interface';
import { ErrorPlaceholder } from './ErrorPlaceholder';

const productData: IProduct = {
  title: 'test product',
  price: 13.5,
  description: 'lorem ipsum set',
  image: 'https://i.pravatar.cc',
  category: 'electronic',
  rating: {
    rate: 41,
    count: 4,
  },
};

interface CreateProductProps {
  onCreate: (product: IProduct) => void;
}

export function CreateProduct({ onCreate }: CreateProductProps) {
  const [value, setValue] = useState('');
  const [validState, setValidState] = useState('');

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setValidState('');

    if (value.trim().length === 0) {
      setValidState('Please enter valid title');
      return;
    }

    productData.title = value;
    const response = await axios.post<IProduct>('https://fakestoreapi.com/products', productData);

    onCreate(response.data);
  };

  const changeHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type='text'
        className='border py-2 px-4 mb-2 w-full outline-0'
        placeholder='Enter product title...'
        value={value}
        onChange={changeHandler}
      />

      {validState && <ErrorPlaceholder error={validState} />}

      <button type='submit' className='py-2 px-4 border bg-yellow-400 hover:text-yellow-600'>
        Create
      </button>
    </form>
  );
}
