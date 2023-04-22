import React, {useEffect, useState} from "react";
import {DashboardGraphLoader, DashboardRecentListLoader} from "../dashboard";
import {UsersRegistrationGraph} from "./users-registration-graph";
import {UsersVsBusinessesGraph} from "./users-businesses-graph";
import {useNavigate} from "react-router-dom";

export function GraphSection() {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        // Function to set isLoading to true after 3 seconds
        const setLoading = () => {
            setTimeout(() => {
                setIsLoading(false);
            }, 1200);
        };

        setLoading(); // Call the function to start the timer


    }, []);

    return (
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 pb-4'>
            {

                isLoading ? <DashboardGraphLoader/> :
                    <UsersRegistrationGraph/>


            }

            {

                isLoading ?
                    <DashboardRecentListLoader/> :
                    <UsersVsBusinessesGraph/>


            }

        </div>
    );
}
