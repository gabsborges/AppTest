import { useEffect, useState } from 'react'
import './DashboardMain.css'
import { db } from '../../../services/firebaseConection'
import { collection, onSnapshot, query, orderBy, doc, deleteDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import DashboardCreateTask from '../DashboardCreateTask/DashboardCreateTask'

export default function DashboardMain() {

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
                })
            })

            setLinks(lista);
        })

    }, [])

    async function handleDeleteLink(id) {
        const docRef = doc(db, "tasks", id)
        await deleteDoc(docRef)
    }

    return (
        <div className='dashboardMain'>
            <DashboardCreateTask />

            <h1>{links.length} Tasks</h1>

            <div className='listTask-wrapper'>
                {links.map((item, index) => {
                    return (
                        <article key={index} className='listTask'>
                            <div className='listTask-div' >
                                <div className='listTask-texto'>
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