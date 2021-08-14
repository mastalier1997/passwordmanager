import React from 'react';
import Firestore from './firestore.js';
import InputPasswords from './inputPasswords';
import '../style/Main.css';
import Navbar from './navbar';

let userAuth = "";
let handler = "";
let userExp = "";

const Main = (props) => {

    const { handleLogout, user } = props;

    userAuth = user.email;
    handler = handleLogout;
    userExp = user;

    return (
        <section className="main">
            <Navbar handleLogout={handleLogout} user={user} />
            <div className="content">
                <InputPasswords />
                <Firestore />
            </div>
        </section>
    )
}

export default Main;
export { userAuth, handler, userExp};