import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <section>
      <h1>Home page</h1>
      <Link to='/'>Home</Link>
      <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link>
    </section>
  )
}

export default Home