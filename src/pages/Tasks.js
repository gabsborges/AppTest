import '../App.css'
import '../components/Tasks/Tasks.css'
import DashboardHeader from '../components/Dashboard/DashboardHeader/DashboardHeader.js'
import DashboardCreateTask from '../components/Dashboard/DashboardCreateTask/DashboardCreateTask'
import DashboardTaskList from '../components/Dashboard/DashboardTaskList/DashboardTaskList'

export default function Tasks() {

    return (
        <div className='tasks'>
            <DashboardHeader />
            <div className='tasksMain'>
                <DashboardCreateTask />
                {/* <DashboardTaskList /> */}
            </div>
        </div>
    )
}