import React, {useEffect, useState} from "react";
import {SplashScreen} from "../splash-screen/splash-screen";
import {Login} from "./login/login";
import {useAppSelector} from "../../app/hooks";

export function AuthWrapper({children}: any) {
    const status = useAppSelector((state) => state.authentication.status);

    if (status === 'success') {
        return <div> {children}</div>
    } else if (status === 'initial') {
        return <SplashScreen/>;
    } else {
        return <Login/>
    }

}
