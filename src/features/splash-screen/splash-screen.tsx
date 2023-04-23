
import React, {useEffect} from "react";
import GomartLogo from "../../assets/logo_only.svg";
import TradebyLogo from "../../assets/tradebyLogo.png";
import ProgressBar from '@atlaskit/progress-bar';
import {useDispatch} from "react-redux";
import {useLocalStorage} from "usehooks-ts";
import {authenticationLoggedIn, authenticationLoggedOut} from "../authentication/authentication-slice";


export function SplashScreen() {

    const dispatch = useDispatch();
    const [AuthToken, setUserToken] = useLocalStorage<any>('AuthToken', null);

    useEffect(() => {
        if (AuthToken === null) {
            setTimeout(() => dispatch(authenticationLoggedOut()), 2000);
        } else {
            const tokenExpiration = new Date(AuthToken.loginExpires as string);
            const timeNow = new Date();
            if (timeNow > tokenExpiration) {
                setUserToken(null);
                setTimeout(() => dispatch(authenticationLoggedOut()), 2000);
                // token has expired
            } else {
                dispatch(authenticationLoggedIn({authData: AuthToken}));
                //user is still valid
            }

        }
    }, [AuthToken])

    return <div className=' w-screen flex flex-row justify-center  h-screen'>
        <div className=' flex flex-col justify-center gap-2'>
            <div  className='mx-auto'>
                <img alt='Logo' src={GomartLogo} width='180'></img>
            </div>
            <div className='py-4'><ProgressBar isIndeterminate/></div>

            <label className='text-3xl mx-auto'>Gomart Admin Management Studio </label>

            <div className='flex flex-row justify-center gap-2'>
                <label>Powered by  </label><img src={TradebyLogo} alt='icon mgmt'/> <label> Tradeby Services Ltd.</label>
            </div>
        </div>

    </div>;
}
