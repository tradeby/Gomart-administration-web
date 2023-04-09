
import React, {useEffect} from "react";
import GomartLogo from "../../assets/logo_only.svg";
import TradebyLogo from "../../assets/tradebyLogo.png";
import ProgressBar from '@atlaskit/progress-bar';


export function SplashScreen() {
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
