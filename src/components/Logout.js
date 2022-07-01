import React from 'react';
import { googleLogout } from '@react-oauth/google';
import { Button } from 'react-bootstrap';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Logout({setUser}) {
    const handleLogout = () => {
        googleLogout();  // helper for logging out
        setUser(null);
        localStorage.setItem("login", null);  // clearing local storage
        console.log('Logout made successfully');

    };

    return (
        <div>
           <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </div>
    );
}

export default Logout;