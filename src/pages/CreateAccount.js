import '../App.css'
import '../components/CreateAccount/CreateAccount.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { auth } from '../services/firebaseConection'
import {createUserWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo/Logo'

export default function CreateAccount() {

    const [email, setEmail] = useState('')
    const [firstPassword, setFirstPassword] = useState('')
    const [seccondPassword, setSeccondPassword] = useState('')
    const [samePassword, setSamePassword] = useState(false)
    const [errorUserPass, setErrorUserPass] = useState('ErrorLogin')
    const [errorShake, setErrorShake] = useState('')
    const [buttonLogin, setButtonLogin] = useState('')
    const [buttonLoader, setButtonLoader] = useState('loader disable')

    const navigate = useNavigate()

    function aprovePassword() {
        if (firstPassword === seccondPassword) {
            setSamePassword(true)
        } else {
            setErrorUserPass('')
            setErrorShake('errorShake')
        }
    }

    function handleCreateAccount(event) {
        event.preventDefault()
        aprovePassword()
        if (samePassword === true) {
            createUserWithEmailAndPassword(auth, email, firstPassword)
            .then(() => {
                setButtonLogin('disable')
                setButtonLoader('loader')
                toast.success("Account Created")
                navigate('/dashboard', { replace: true })
                console.log(" passou")
            })
            .catch(() => {
                toast.error('Ocorreu algum erro, por favor tente novamente!')
                console.log("Não passou")
            })
        }
        
    }


    return (
        <div className='createAccount'>
            <Logo />
            <form onSubmit={handleCreateAccount}>
                <div className='createAccount-area'>

                    <div className='email'>
                        <label htmlFor="email">E-mail:</label>
                        <input type="text" value={email} onChange={(e) => {setEmail(e.target.value)}} id="email" name="email" required />
                    </div>

                    <div className='password'>
                        <label htmlFor="password">Password:</label>
                        <input type="password" className={errorShake}  value={firstPassword} onChange={(e) => {setFirstPassword(e.target.value)}} id="password" name="password" required />
                    </div>

                    <div className='confirmPassword'>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input type="password" className={errorShake}  value={seccondPassword} onChange={(e) => {setSeccondPassword(e.target.value)}} id="confirmPassword" name="confirmPassword" required />
                        <p className={errorUserPass}>both passwords must match</p>
                    </div>

                    <button type="submit"><div className={buttonLoader}></div><span className={buttonLogin}>Create</span></button>

                    <div className='accounts'>
                        <Link to='/'>already have an account?</Link>
                    </div>

                </div>
            </form>
        </div>
    )
}