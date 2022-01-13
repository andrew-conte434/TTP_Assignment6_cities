import './App.css'
import {useState} from 'react'
import ZipCodeData from "./ZipCodeData";

export default function SearchBar(){
    const urlPath = "http://ctp-zip-api.herokuapp.com/city/"
    const [city, setCity] = useState("")
    const [zipCodes, setZipCodes] = useState([])
    const [header, setHeader] = useState(``)

    function handleEnter(e){
        if(e.key === 'Enter') {
            let cityUpperCase = city.toUpperCase()
            let newUrl = urlPath + cityUpperCase
            fetch(newUrl)
                .then(res => res.json())
                .then((data) => {
                    console.log(data)
                    setHeader(`Zip codes associated with: ${city}`)
                    setZipCodes(data)
                })
                .catch(err => {
                    console.log("Please enter a valid city name")
                    setZipCodes([])
                })
        }
    }
    return (
        <div className={"App"}>
            <label htmlFor={"city"}>City: </label>
            <input type={"text"}
                   name={"city"}
                   onChange={(e) =>
                       setCity(e.target.value)}
                   onKeyDown={handleEnter}/>
            <div className={"zip-codes"}>
                <h3>{header}</h3>
                <ul>
                    {zipCodes.map((zip, i) => {
                        return (
                            <ZipCodeData key = {i}
                                         zip = {zip}/>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}