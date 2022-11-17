import { useEffect, useState } from 'react'
import '../DashboardMain/DashboardMain.css'
import { db } from '../../../services/firebaseConection'
import { addDoc, collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { toast } from 'react-toastify'

export default function DashboardCreateTask() {

    const [showDiv, setShowDiv] = useState('disable')
    const [taskName, setTaskName] = useState('')
    const [task, setTask] = useState('')

    const [links, setLinks] = useState([])

    const [show, setShow] = useState(false);


    useEffect(() => {

        const linksRef = collection(db, "tasks")
        const queryRef = query(linksRef, orderBy("created", "desc"))

        const unsub = onSnapshot(queryRef, (snapshot) => {
            let lista = [];

            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    infos: doc.data().infos,
                })
            })

            setLinks(lista);
        })

    }, [])

    function showInput() {
        if (showDiv === 'disable'){
            setShowDiv('')
        } else {
            setShowDiv('disable')
        }
    }

    function createTask(e) {
        if (task === '' || taskName === "") {
            toast.warn("Preenche todos os campos!")
            return
        }
        
        addDoc(collection(db, "tasks"), {
            name: taskName,
            infos: task,
            created: new Date(),
        })
        .then(() => {
            setTaskName('')
            setTask('')
            toast.success("Task Created")
        })
        .catch((error) => {
            console.log("Erro ao registrar" + error)
            toast.error('Ocorreu algum erro')
        })
    }

    return (
        <div className='dashboardCreateTask'>
            <div className='addTask-area'>
                <button onClick={showInput} className='adicionarTask'><i className="fa-solid fa-plus"></i></button>
                <input type="text" placeholder='Name' className={showDiv} value={taskName} onChange={(e) => { setTaskName(e.target.value) }} name="taskName" required />
                <textarea type="text" placeholder='Task details' className={showDiv} value={task} onChange={(e) => { setTask(e.target.value) }} name="task" required></textarea>
                <button type="submit" onClick={createTask} className={showDiv}>Create Task</button>
            </div>
            {taskName !== "" && (
                <div className='preview'>
                    <label className='list'>Task to be created</label>
                    <article className='list-preview' >
                        <h1>{taskName}</h1>
                        <p>{task}</p>
                    </article>
                </div>
            )}
        </div>
    )
}