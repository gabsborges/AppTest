import './DashboardHeader.css'

export default function DashboardHeader() {
    return (
        <div className='dashboardHeader'>
            <div className='dashboardHeader-area'>
                <div className='dashboardHeader-user'>
                    <i className="fa-solid fa-user"></i>
                    <p>Hello, <strong>UserName</strong></p>
                </div>
                <ul>
                    <li>User</li>
                    <li>Task</li>
                </ul>
            </div>
        </div>
    )
}