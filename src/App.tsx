
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import About from './components/About'
import Home from './components/Home'
import Products from './components/Products'
import NavBar from './components/NavBar'

const router = createBrowserRouter([
  {path: '/', element: <NavBar/>},
  {path: '/products', element: <Products/> }
])
function App() {


  return (
   <RouterProvider router={router}/>
  )
}

export default App
