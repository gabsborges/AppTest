import { useEffect, useState } from 'react'
import './DashboardMain.css'
import { db } from '../../../services/firebaseConection'
import { addDoc, collection, onSnapshot, query, orderBy, doc, deleteDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'


export default function DashboardMain() {

    const [showDiv, setShowDiv] = useState('disable')
    const [taskName, setTaskName] = useState('')
    const [task, setTask] = useState('')

    const [links, setLinks] = useState([])

    useEffect(() => {

        const linksRef = collection(db, "tasks")
        const queryRef = query(linksRef, orderBy("created", "asc"))

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

    async function handleDeleteLink(id) {
        const docRef = doc(db, "tasks", id)
        await deleteDoc(docRef)
    }


    return (
        <div className='dashboardMain'>
            <div className='addTask-area'>
                <button onClick={showInput} className='adicionarTask'><i className="fa-solid fa-plus"></i></button>
                <input type="text" placeholder='Name' className={showDiv} value={taskName} onChange={(e) => { setTaskName(e.target.value) }} name="taskName" required />
                <input type="text" placeholder='Task' className={showDiv} value={task} onChange={(e) => { setTask(e.target.value) }} name="task" required />
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

            <h1>Tasks</h1>

            <div className='listTask-wrapper'>
                {links.map((item, index) => {
                    return (
                        <article key={index} className='listTask'>
                            <div className='listTask-div'>
                                <div className='listTask-texto'>
                                    <h1>{item.name}</h1>
                                    <p>{item.infos}</p>
                                </div>
                                <div className='delete-task' onClick={() => handleDeleteLink(item.id)}>
                                    <button><i className="fa-solid fa-trash"></i></button>
                                </div>
                            </div>
                        </article>
                    )
                })}
            </div>

        </div>
    )
}