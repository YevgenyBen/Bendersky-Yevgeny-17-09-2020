import  React,{ useEffect } from 'react'
import SearchComponent from '../components/SearchComponent'
import Container from '@material-ui/core/Container';
import axios from 'axios'
import './HomePage.css'

function HomePage() {
const apiKey = '2Hc18OxAstuPAYeQAG7XMNPzwGaKSSir'

    useEffect(() => {
        async function fetchLocation(){
            const location = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=%${apiKey}&q=tel-aviv`)
            return location;
        }
        //check for errors
        const location=fetchLocation();
        console.log("location",location)

    }, [])

    return (
        <>
            <Container maxWidth='md'>
                <SearchComponent />
                <div className='wrapper '>
                </div>
            </Container>
        </>
    )
}

export default HomePage;
