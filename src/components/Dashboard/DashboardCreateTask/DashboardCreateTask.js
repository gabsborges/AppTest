import { useEffect, useState } from 'react'
import '../DashboardMain/DashboardMain.css'
import { db } from '../../../services/firebaseConection'
import { collection, onSnapshot, query, orderBy, doc, deleteDoc, addDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'

export default function DashboardCreateTask() {

    const [showDiv, setShowDiv] = useState('disable')
    const [taskName, setTaskName] = useState('')
    const [task, setTask] = useState('')

    const [select, setSelect] = useState('')

    const [links, setLinks] = useState([])

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
                    owner: doc.data().owner,
                })
            })
            setLinks(lista);
        })
    }, [])

    async function handleDeleteLink(id) {
        const docRef = doc(db, "tasks", id)
        await deleteDoc(docRef)
    }

    function showInput() {
        if (showDiv === 'disable') {
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
            owner: select,
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
                <select value={select} className={showDiv} onChange={(e) => { setSelect(e.target.value) }}>
                    <option >Select</option>
                    <option >Aime</option>
                    <option >Fraga</option>
                    <option >Gabriel</option>
                    <option >Giulinha</option>
                    <option >Larissa</option>
                    <option >Lucas</option>

                </select>

                <input type="text" placeholder='Task Name' className={showDiv} value={taskName} onChange={(e) => { setTaskName(e.target.value) }} name="taskName" required />
                <textarea type="text" placeholder='Task details' className={showDiv} value={task} onChange={(e) => { setTask(e.target.value) }} name="task" required></textarea>
                <button type="submit" onClick={createTask} className={showDiv}>Create Task</button>
            </div>
            {taskName !== "" && (
                <div className='preview'>
                    <label className='list'>Task to be created</label>
                    <article className='list-preview' >
                        <h2>{taskName}</h2>
                        <p>{task}</p>
                    </article>
                </div>
            )}


            <h1>{links.length} Tasks</h1>

            <div className='listTask-wrapper'>
                {links.map((item, index) => {
                    return (
                        <article key={index} className='listTask'>
                            <div className='listTask-div' >
                                <div className='listTask-texto'>
                                    <h3>{item.owner}</h3>
                                    <h1>{item.name}</h1>
                                    <p>{item.infos}</p>
                                </div>
                                <div className='delete-task' >
                                    <button onDoubleClick={() => handleDeleteLink(item.id)}><i className="fa-solid fa-trash"></i></button>
                                    <button className='buttonCompleted'><i className="fa-solid fa-check" ></i></button>
                                </div>
                            </div>
                        </article>
                    )
                })}
            </div>

        </div>
    )
}