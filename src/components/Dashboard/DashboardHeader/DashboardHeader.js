import './DashboardHeader.css'

import { auth } from '../../../services/firebaseConection'
import { signOut } from 'firebase/auth'

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
                    <p>Hello, <strong>{userName.replace('@rinobox.com.br', "")}</strong></p>
                </div>
                <ul>
                    <li>Tasks</li>
                    <li>Completed</li>
                </ul>
                <i onClick={handleLogout} className="fa-solid fa-right-from-bracket logout"></i>
            </div>
        </div>
    )
}