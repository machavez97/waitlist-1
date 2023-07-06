import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import {db} from '../firebase';
import "../App.css"


const InputForm = ({}) => {
    const [testInput, setTestInput] = useState(null);
    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, "Applicants"), {
              Application: testInput,    
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }
    return(
        <div>
        <div className="Form">
            <input type="text" onChange={(e) =>{
                setTestInput(e.target.value)
            }}/>

        </div>
        <div className="btn-container">
        <button
            type="submit"
            className="btn"
            onClick={submitForm}
        >
            Submit
        </button>
    </div>
    </div>
    )
}
export default InputForm;