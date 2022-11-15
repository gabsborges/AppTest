import '../App.css'
import '../components/NonPage/NonPage.css'
import { Link } from 'react-router-dom'

export default function NonPage() {
    return(
        <div className='nonPage'>
            <section className="page_404">
                <div className="container">
                    <h1 className="text-center ">404</h1>
                    <div className="four_zero_four_bg">

                    </div>

                    <div className="contant_box_404">
                        <h3 className="h2">
                            Look like you're lost
                        </h3>

                        <p>the page you are looking for not avaible!</p>

                        <Link to='/'>Go to Home</Link>
                    </div>

                </div>
            </section>
        </div>
    )
}