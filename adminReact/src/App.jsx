import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Adminlogin'
import AdminNavbar from './pages/AdminNavbar'
import AdminSidebar from './pages/AdminSidebar'
import AdminImageUpload from './pages/AdminImageUpload'
import { useEffect, useState } from 'react'
import AdminVideosUpload from './pages/AdminVideosUpload'
import ListImages from "./pages/ListImages"
import ScrollToTop from '../../frontend/react/src/pages/Scroll'


function App() {


  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "")
  console.log(token + "hkkkkkkkkkkkkkkkkk")

  useEffect(() => {

    localStorage.setItem("token", token)

  }, [token])

  return (
    <div>

      <ScrollToTop />
      {token === "" ? <Login setToken={setToken} /> :

        <>
          <AdminNavbar setToken={setToken} />
          <hr></hr>

          <div className="admin-sidebar-collumn">

            <AdminSidebar />

            <div className='admin-side1'>

              
                <Routes>
                  <Route path='/Upload-images' element={<AdminImageUpload />} />
                  <Route path='/List-Images' element={<ListImages />}></Route>
                  <Route path='/Upload-videos' element={<AdminVideosUpload />} />
                </Routes>
              


            </div>

          </div>
        </>


      }
    </div>
  )
}

export default App
