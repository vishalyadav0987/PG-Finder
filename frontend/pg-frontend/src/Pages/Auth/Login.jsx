import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import '../../Styles/Auth2.css'
import '../../Styles/Auth.css'
import { setLogin } from '../../redux/state';
import { useDispatch } from 'react-redux'

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/v1/auth/login', {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

      /** get data after fetching **/
      const loggedIn = await response.json();
      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token
          })
        )
        navigate('/')
      }
    } catch (error) {
      console.log("Login Failed")
    }
  }
  return (
    <>
      <section className="register-section-2">
        <Toaster position='top-center' reverseOrder={false} />
        <div className="heading">
          <h1>Login Here</h1>
          <h3>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique  <br /> facilis rem culpa fugiat eveniet quidem modi vero dicta in quo? <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, eos?</h3>
        </div>
        <div className="register-container">
          <form className="register-info" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              name='email'
            // required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              name='password'
            // required
            />

            <button type='submit' className='btn'>REGISTER</button>
          </form>
          <div className="bottom">
            Don't have account ? <Link to={'/register'}>Register here</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
