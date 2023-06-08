"use client"
import { useFetch } from '@/hooks/useFetch'
import { getCategories } from '@/services'
import React from 'react'
import { Error, Loading } from '.';
import Link from 'next/link';

const SideBar = () => {
  const { data: categories, isLoading, error } = useFetch(getCategories);
  if(isLoading) return <Loading />
  if(error) return <Error />
  return (
    <div className='sticky top-3 bg-white p-3 rounded-sm'>
      {categories && <h3 className='font-semibold text-xl'>Read More Title</h3>}
      {categories && categories.map(category => (
        <div key={category.id} className='mt-3'>
          <Link href={`/category/${category.name}`} className='hover:text-blue-600 transition duration-300'>{category.name}</Link>
        </div>
      ))}
    </div>
  )
}

export default SideBar