import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'

function SearchInput() {
  return (
    <form action="">
      <div className='relative w-full max-w-md'>
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input className='pl-8 w-48 focus-visiable:ring-1' type='text' placeholder="Search..." />
      </div>
    </form>
  )
}

export default SearchInput