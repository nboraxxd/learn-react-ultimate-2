import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { doLogin } from '../../redux/action/userAction'
import { postLogin } from '../../services/apiServices'
import { FaSpinner } from 'react-icons/fa'
import './LogIn.scss'

const LogIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }

  const validatePassword = (password) => {
    return String(password)
  }

  const handleOnSubmitLoginBtn = async (event) => {
    event.preventDefault()

    // validate email
    const isValidEmail = validateEmail(email)
    if (!isValidEmail) toast.error('Invalid email')

    // validate password
    const isValidPassword = validatePassword(password)
    if (!isValidPassword) toast.error('Invalid password')

    if (!isValidEmail || !isValidPassword) return

    // call API
    setIsLoading(true)
    const response = await postLogin(email, password)

    if (response && response.EC === 0) {
      dispatch(doLogin(response))
      toast.success(response.EM)
      setIsLoading(false)
      navigate('/')
    }

    if (response && response.EC !== 0) {
      toast.error(response.EM)
      setIsLoading(false)
    }
  }

  return (
    <div className="login">
      {/* navigate sign up page */}
      <div className="signup-link">
        <span className="signup-link__text">Don't have an account yet?</span>
        <span className="signup-link__btn" onClick={() => navigate('/sign-up')}>
          Sign up
        </span>
      </div>

      {/* Login form */}
      <div className="login-content">
        <div className="login-content__brand col-3">PRO QUIZZZ</div>
        <h2 className="login-content__title col-3">Hello, who's this?</h2>
        <form className="login-content__form col-3">
          <div className="login-email">
            <label htmlFor="loginEmail" className="login-email__label">
              Email address
            </label>
            <input
              type="email"
              id="loginEmail"
              className="login-email__input form-control"
              placeholder="bruce@wayne.com"
              autoComplete="on"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="login-password">
            <label htmlFor="loginPassword" className="login-password__label">
              Password
            </label>
            <input
              type="password"
              id="loginPassword"
              className="login-password__input form-control"
              placeholder="At least 8 characters"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="login-forgot">
            <a href="#">Forgot password?</a>
          </div>
          <button
            type="submit"
            className="login-btn"
            onClick={handleOnSubmitLoginBtn}
            disabled={isLoading}
          >
            {isLoading && <FaSpinner className="login-spinner" />}
            Log in to Pro Quizzz
          </button>
          <div className="login-back">
            <span onClick={() => navigate('/')}>Go to homepage</span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LogIn
