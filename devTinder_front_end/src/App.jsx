
import appStore from "../utils/appStore"
import Body from "./components/Body"
import Feed from "./components/Feed"
import Login from "./components/Login"
import Profile from "./components/Profile"

import Navbar from "./pages/Navbar"
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Connectionrequests from "./components/Connectionrequests"
import Connections from "./components/Connections"
function App() {
  return (
    <>
      <Provider store={appStore} >
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />} >

              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/feed" element={<Feed />} />
             
              <Route path="/connections" element={<Connections />} />
              <Route path="/connectionrequests" element={<Connectionrequests />} />
            </Route>
          </Routes>
        </BrowserRouter >
      </Provider>


    </>
  )
}

export default App
