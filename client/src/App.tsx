import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DoctorList from './components/DoctorList'
import Home from './components/Home'
import Navbar from './components/Navbar'
import LoginForm from './components/forms/LoginForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Navbar />
        <div className='container-md'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/doctors' element={<DoctorList />} />
            <Route path='/login' element={<LoginForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
