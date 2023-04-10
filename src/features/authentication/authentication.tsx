import React, {useEffect, useState} from "react";
import {SplashScreen} from "../splash-screen/splash-screen";
import {Login} from "./login";

export function AuthWrapper({children}: any) {
    const [showSplashScreen, setShowSplashScreen] = useState<boolean>(true);

    useEffect(()=>{

        setTimeout(()=>{
            setShowSplashScreen(false);
        }, 3000);

    },[]);
    return !showSplashScreen? <div>
        {children}
    </div>
       /* <Login/>*/: <SplashScreen/>;
}
