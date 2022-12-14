import '../App.css'
import '../components/ForgotAccount/ForgotAccount.css'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo/Logo'

export default function ForgotAccount() {
    return (
        <div className='forgotAccount'>
            <Logo />
            <form>
                <div className='forgotAccount-area'>
                    <h1>Account recovery</h1>
                    <h3>Recover your M.<span>Task</span> Account</h3>

                    <div className='email'>
                        <label htmlFor="email">Insert your e-mail</label>
                        <input type="text" id="email" name="email" required />
                    </div>

                    <div className='accounts'>
                        <Link to='/'>Back to menu</Link>
                        <button type="submit">Send</button>
                    </div>
                </div>
            </form>
        </div>
    )
}