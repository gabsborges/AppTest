import '../App.css'
import '../components/Login/login.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import { auth } from '../services/firebaseConection'
import {signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'
import Logo from '../components/Logo/Logo'

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorUserPass, setErrorUserPass] = useState('ErrorLogin')
    const [errorShake, setErrorShake] = useState('')
    const [buttonLogin, setButtonLogin] = useState('')
    const [buttonLoader, setButtonLoader] = useState('loader disable')

    const navigate = useNavigate()

    function eventErrorLogin() {
        setErrorUserPass('')
        setErrorShake('errorShake')
    }

    function handleLogin(event) {
        event.preventDefault();
        if (email === '' || password === '') {
            eventErrorLogin()
            return
        } else {
            signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setButtonLogin('disable')
                setButtonLoader('loader')
                toast.success('Login success')
                navigate('/dashboard', { replace: true })
            })
            .catch(() => {
                eventErrorLogin()
                setEmail('')
                setPassword('')
            })
        }
    }

    return (
        <div className='login'>
            <Logo />
            <form onSubmit={handleLogin}>
                <div className='login-area'>
                    <div className='email'>
                        <label htmlFor="email"><b>E-mail</b></label>
                        <input type="text" placeholder='user@email.com' className={errorShake} value={email} onChange={(e) => {setEmail(e.target.value)}} name="email" required />
                    </div>

                    <div className='password'>
                        <label htmlFor="password"><b>Password</b></label>
                        <input type="password" placeholder='********' className={errorShake} value={password} onChange={(e) => {setPassword(e.target.value)}} name="password" autoComplete='on' required />
                        <p className={errorUserPass}>Invalid Username/Password</p>
                    </div>

                        <button type="submit"><div className={buttonLoader}></div><span className={buttonLogin}>Login</span></button>

                    <div className='accounts'>
                        <Link to='/forgot-your-account'>Forgot your account?</Link>
                        <Link to='/create-account'>Create Account</Link>
                    </div>

                </div>
            </form>
        </div>
    )
}