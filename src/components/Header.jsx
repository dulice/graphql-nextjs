import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className=' bg-slate-200 px-3'>
      <div className='container mx-auto flex justify-between items-center py-3'>
        <Link href={'/'} className='font-bold'>BlogCms</Link>
        <div>
            
        </div>
      </div>
    </div>
  )
}

export default Header