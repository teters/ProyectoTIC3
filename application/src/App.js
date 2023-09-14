import React, {useEffect,useState} from "react";

function App(){

    const [backendData, setbackEndData] = useState([{}])
    useEffect(()=>{
        fetch("/api").then(
            response => response.json()
        ).then(
            data =>{
                setbackEndData(data)
            }
        )
    },[])

    return(
        <div>
            {(typeof backendData.users === 'undefined') ?
                (<p> Loading...</p>):
                (backendData.users.map((user,i) => <p key = {i}>{user}</p>))}
        </div>
    )
}

export default App
