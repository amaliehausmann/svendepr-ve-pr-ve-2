import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from './Layouts/MainLayout'
import { Frontpage } from './pages/Frontpage'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<MainLayout/>}>
      <Route index element={<Frontpage/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
