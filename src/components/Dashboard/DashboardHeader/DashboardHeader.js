import './DashboardHeader.css'

import { auth } from '../../../services/firebaseConection'
import { signOut } from 'firebase/auth'
import { Link } from 'react-router-dom'

export default function DashboardHeader() {

    async function handleLogout() {
        await signOut(auth) 
    }

    const userName = auth.currentUser.email

    return (
        <div className='dashboardHeader'>
            <div className='dashboardHeader-area'>
                <div className='dashboardHeader-user'>
                    <i className="fa-solid fa-user"></i>
                    <p>Hello, <strong><Link to ='/dashboard'>{userName.replace('@rinobox.com.br', "")}</Link></strong></p>
                </div>
                <ul>
                    <li><Link to='/tasks'>Tasks</Link></li>
                    <li>Completed</li>
                </ul>
                <i onClick={handleLogout} className="fa-solid fa-right-from-bracket logout"></i>
            </div>
        </div>
    )
}