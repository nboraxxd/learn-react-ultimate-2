import './App.scss'
import Header from './components/Header/Header'
import { NavLink, Outlet } from 'react-router-dom'

const App = () => {
  return (
    <div className="app-container">
      <div className="header-container"></div>
      <Header />
      <div className="main-container">
        <div className="sidenav-container"></div>
        <div className="app-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default App
