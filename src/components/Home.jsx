import React from 'react'
import { Link } from 'react-router-dom'
import Contacts from './Contacts'

const Home = () => {
  return (
    <>
       <Link
       className='bg-slate-200 text-blue-500 font-semibold px-3 py-2 rounded'
       to='/create'
       >Add new contact</Link> 
       <Contacts/>
    </>
  )
}

export default Home