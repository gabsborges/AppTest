import '../App.css'
import '../components/CreateAccount/CreateAccount.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function CreateAccount() {

    const [firstPassword, setFirstPassword] = useState('')
    const [seccondPassword, setSeccondPassword] = useState('')
    const [samePassword, setSamePassword] = useState(false)
    const [errorUserPass, setErrorUserPass] = useState('ErrorLogin')
    const [errorShake, setErrorShake] = useState('')


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
        console.log(firstPassword)
    }

    return (
        <div className='createAccount'>
            <form onSubmit={handleCreateAccount}>
                <div className='createAccount-area'>

                    <div className='username'>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" required />
                    </div>

                    <div className='email'>
                        <label htmlFor="email">E-mail:</label>
                        <input type="text" id="email" name="email" required />
                    </div>

                    <div className='password'>
                        <label htmlFor="password">Password:</label>
                        <input type="text" className={errorShake}  value={firstPassword} onChange={(e) => {setFirstPassword(e.target.value)}} id="password" name="password" required />
                    </div>

                    <div className='confirmPassword'>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input type="text" className={errorShake}  value={seccondPassword} onChange={(e) => {setSeccondPassword(e.target.value)}} id="confirmPassword" name="confirmPassword" required />
                        <p className={errorUserPass}>both passwords must match</p>
                    </div>

                    <button type="submit">Login</button>

                    <div className='accounts'>
                        <Link to='/'>already have an account?</Link>
                    </div>

                </div>
            </form>
        </div>
    )
}