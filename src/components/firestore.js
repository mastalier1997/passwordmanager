import React from 'react';
import fire from './fire.js';
import {userAuth} from './Main';
import '../style/firestore.css';
import ClipboardIcon from 'react-clipboard-icon';

var CryptoJS = require("crypto-js");

const database = fire.firestore();

function decrypt(password){
    var bytes = CryptoJS.AES.decrypt(password, 'my-secret-key@123');
    var decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    return decryptedData;
}

const style = { fill: 'white' }

class Firestore extends React.Component {
    state={
        entries: null
    }

    componentDidMount() {
        database
            .collection("password-"+userAuth)
            .get()
            .then((snapshot) => {
                let entries = [];
                snapshot.docs.forEach((doc) => {
                    //console.log(doc.data())
                    entries.push(doc.data());
                })
                this.setState({entries: entries});
                //console.log(snapshot.size);
                if(!snapshot.size>0){
                    console.log("no collection " + userAuth);
                    //database.collection("password-"+userAuth).add();
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }   

    render() {
        return (
            <div className="table">
                <table className="entries">
                    <thead>
                        <tr className="rows" id="head-row">
                            <th className="tuple">Title</th>
                            <th className="tuple">Username</th>
                            <th className="tuple">Password</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="bodyT">
                    {
                        this.state.entries && 
                        this.state.entries.map( entry => {                            
                            return(
                                <tr className="rows">
                                    <th className="tuple">{entry.title}</th>
                                    <th className="tuple">{entry.username}</th>
                                    <th className="tuple" maxlength='5'>{entry.password}</th>
                                    <th className="buttonClip"><button className="btn" onClick={() =>  navigator.clipboard.writeText(decrypt(entry.password))}><ClipboardIcon style={style} id="icon"/></button></th>
                                </tr>
                            )
                        })

                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Firestore;