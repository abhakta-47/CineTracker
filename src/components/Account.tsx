// write a account tsx component that has loggeIn state 
// and a button that toggles the state
import React, { useState, useEffect } from "react";
import { Tooltip } from 'react-tooltip';

import gDriveService from '../services/gdrive';


const Account = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userObj, setUsreObj] = useState<UserObject | null>(null);

    const [gapiLoaded, setGapiLoaded] = useState(false);
    document.addEventListener('gapiLoaded', () => {
        setGapiLoaded(true);
    });

    document.addEventListener('userObj', ({ detail }: any) => {
        setUsreObj(detail);
    });

    document.addEventListener('authEvent', () => setIsLoggedIn(gDriveService.isLoggedIn));

    useEffect(() => {
        if (gapiLoaded)
            console.log("prompt to login");
    }, [gapiLoaded]);

    if (gapiLoaded)
        return (
            <>
                <button
                    data-tooltip-id='ac-btn-tooltip'
                    data-tooltip-content={isLoggedIn ? "Logg out" : "Log In"}
                    onClick={isLoggedIn ? gDriveService.authLogout : gDriveService.authLogin}
                    className='mx-2 text-3xl'
                    style={{ color: "#1db2f3" }}
                >
                    {
                        userObj?.imageUrl ? <img src={userObj?.imageUrl} alt="user" className="rounded-full h-10 w-10" /> : <i className="nf nf-md-account_circle"></i>
                    }

                </button>
                <Tooltip id={`ac-btn-tooltip`} />
            </>


        );
    else
        return (
            <>
            </>
        );
};

export default Account;