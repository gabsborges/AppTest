import '../App.css'
import DashboardHeader from '../components/Dashboard/DashboardHeader/DashboardHeader'
import DashboardMain from '../components/Dashboard/DashboardMain/DashboardMain'

export default function Dashboard() {
    return (
        <div className='dashboard'>
            <DashboardHeader />
            <DashboardMain />
        </div>
    )
}