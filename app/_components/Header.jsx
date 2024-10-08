import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


function Header() {
  return (
    <div className='flex justify-between p-5 shadow-sm'><Image src={'/logo.svg'} width={150} height={90}/>
    <Link href='/dashboard'><Button>Get Started</Button></Link>
    </div>
  )
}

export default Header