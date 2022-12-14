import './DashboardMain.css'
import { useEffect, useState } from 'react'
import { db } from '../../../services/firebaseConection'
import { collection, onSnapshot, query, orderBy, doc, deleteDoc } from 'firebase/firestore'

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
            <div className='dashboardMain-area'>
            {links.map((item, index) => {
                    return (
                        <article key={index} className='listTask'>
                            <div className='listTask-div' >
                                <div className='listTask-texto'>
                                    <h2>{item.id}</h2>
                                </div>
                            </div>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}