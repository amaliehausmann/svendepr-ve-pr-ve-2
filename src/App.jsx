import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from './Layouts/MainLayout'
import { Frontpage } from './pages/Frontpage'
import { SingleNews } from './pages/singleNews'
import { Login } from './pages/Login'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<MainLayout/>}>
      <Route index element={<Frontpage/>}></Route>
      <Route path='/news/:id' element={<SingleNews/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
