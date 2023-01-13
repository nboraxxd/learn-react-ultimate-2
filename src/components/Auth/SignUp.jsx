import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { postSignUp } from '../../services/apiServices'
import './SignUp.scss'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isShowPassword, setIsShowPassword] = useState(false)

  const navigate = useNavigate()

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }

  const validatePassword = (password) => {
    return String(password).match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
  }

  const handleOnSubmitSignUpBtn = async (e) => {
    e.preventDefault()

    // validate email
    const isValidEmail = validateEmail(email)
    if (!isValidEmail) toast.error('Invalid email')

    // validate password
    const isValidPassword = validatePassword(password)
    if (!isValidPassword) toast.error('Invalid password')

    if (!isValidEmail || !isValidPassword) return

    // submit sign up btn
    const dataSignUp = { username, email, password }
    const response = await postSignUp(dataSignUp)
    // console.log(response)

    if (response && response.EC === 0) {
      toast.success(response.EM)
      navigate('/log-in')
    } else if (response && response.EC !== 0) toast.error(response.EM)
  }

  return (
    <div className="signup">
      {/* navigate log in page */}
      <div className="login-link">
        <span className="login-link__text">Already have an account?</span>
        <span className="login-link__btn" onClick={() => navigate('/log-in')}>
          Log in
        </span>
      </div>

      {/* Sign up form */}
      <div className="signup-content">
        <div className="signup-content__brand col-3">PRO QUIZZZ</div>
        <h2 className="signup-content__title col-5">
          Get better data with conversational forms, surveys, quizzes & more.
        </h2>
        <form className="signup-content__form col-3">
          {/* username input */}
          <div className="signup-username">
            <label htmlFor="signUpUsername" className="signup-email__label">
              Username
            </label>
            <input
              type="text"
              id="signUpUsername"
              className="signup-email__input form-control"
              placeholder="brucewayne"
              autoComplete="on"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          {/* email input */}
          <div className="signup-email">
            <label
              htmlFor="signUpEmail"
              className="signup-email__label"
              placeholder="bruce@wayne.com"
            >
              Email address (*)
            </label>
            <input
              type="email"
              id="signUpEmail"
              className="signup-email__input form-control"
              placeholder="bruce@wayne.com"
              autoComplete="on"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          {/* password input */}
          <div className="signup-password">
            <label htmlFor="signupPassword" className="signup-password__label">
              Password (*)
            </label>
            <div className="signup-password__container">
              <input
                type={`${isShowPassword ? 'text' : 'password'}`}
                id="signupPassword"
                className="signup-password__input form-control"
                placeholder="At least 8 characters"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              {isShowPassword ? (
                <FaRegEyeSlash
                  className="signup-password__icon"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                />
              ) : (
                <FaRegEye
                  className="signup-password__icon"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                />
              )}
            </div>
          </div>
          <button type="submit" className="signup-btn" onClick={handleOnSubmitSignUpBtn}>
            Sign up with email
          </button>
          <div className="signup-back">
            <span onClick={() => navigate('/')}>Go to homepage</span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
