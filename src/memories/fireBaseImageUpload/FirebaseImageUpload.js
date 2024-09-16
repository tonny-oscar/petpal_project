import React from "react";
import{imageDb} from "./config";
import { set } from "date-fns";
import { ref } from "firebase/storage";

function FirebaseImageUpload(){
    const [img,setImage]=useState("");

    const handleClick=()=>{
        ref()
    }

    return(
        <div className="App">
            <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>   
            <button onClick={handleClick}>Upload</button>
        </div>
    )

}

export default FirebaseImageUpload;