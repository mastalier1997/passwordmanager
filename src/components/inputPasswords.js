import React, {useState} from "react";
import fire from './fire.js';
import {userAuth} from './Main';
import '../style/inputPasswords.css';
var CryptoJS = require("crypto-js");

const database = fire.firestore();

const InputPasswords = () => {

    const [title, setTitle] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        var ciphertext = CryptoJS.AES.encrypt(password, 'my-secret-key@123').toString();

        database.collection("password-"+userAuth).add({
            title: title,
            username: username,
            password: ciphertext
        })
        .then(() => {
            window.location.reload();
        })
        .catch((error) => {
            console.error(error);
        })

        setTitle("");
        setUsername("");
        setPassword("");
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <label>title</label>
            <input className="input" id="title" placeholder="Title" value={title} autoComplete="off"
            onChange={(e) => setTitle(e.target.value)}/> 

           <label>Username</label>
           <input className="input" id="username" placeholder="Username" value={username} autoComplete="off"
           onChange={(e) => setUsername(e.target.value)}/> 

           <label>Password</label>
           <input className="input" id="password" placeholder="Password" type="password" value={password} autoComplete="off"
           onChange={(e) => setPassword(e.target.value)}/>

           <button type="submit">Add</button>
        </form>
    )
}

export default InputPasswords;


