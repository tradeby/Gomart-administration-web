import React from "react";
import {useNavigate} from "react-router-dom";
import IconMgmts from '../../assets/tradebyLogo.png'
import GomartLogo from '../../assets/logo_only.svg'
import {useDispatch} from "react-redux";
import {authenticationStarted} from "./authentication-slice";


export function AuthPagesWrapper({children}:any) {
    const dispatch = useDispatch();
    return <div className=' w-screen h-screen'>
        <div onClick={()=>dispatch(authenticationStarted())} className='p-5 cursor-pointer'>
            <img alt='Logo' src={GomartLogo} width='80'></img>
        </div>
        <div className='w-full h-4/5 flex justify-center'>
            <div className='w-80'>
                {children}
            </div>
        </div>
        <div className='flex flex-row justify-center gap-2'>
            <label >Powered by Tradeby Services Ltd </label><img src={IconMgmts} alt='icon mgmt' />
        </div>
    </div>;
}
