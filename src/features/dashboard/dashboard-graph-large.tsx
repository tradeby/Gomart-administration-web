import React, {useState} from "react";
import {Chart} from "react-google-charts";
import Button from "@atlaskit/button/standard-button";
import Lozenge from "@atlaskit/lozenge";
import './card-flip.css';

export function UsersRegistrationGraph() {
    const [isFlipped, setIsFlipped] = useState(false); // State to track the flip status

    const handleFlipClick = () => {
        setIsFlipped(!isFlipped);
    };
    const options = {
        vAxis: {minValue: 0},
        legend: 'none',
        animation: {
            startup: true,
            duration: 800,
            easing: 'in'
        },
        chartArea: {
            top: 10,
            left: 70,
            right: 30,
            bottom: 50
        }
    };
    const options2 = {
        vAxis: {minValue: 0,},
        hAxis: {
            gridlines: { color: 'transparent' },// Change hAxis label color to blue
        },
        legend: 'none', // Set the background color
        series: {
            0: { color: '#00BDAE'}, // Change color of series 0 (first series) to blue
        },
        animation: {
            startup: true,
            duration: 800,
            easing: 'in'
        },
        chartArea: {
            top: 10,
            left: 70,
            right: 30,
            bottom: 50
        }
    };

    const dataRevenueMonth = [
        ['Year', 'Sales',],
        ['Jan', 15000,],
        ['Feb', 12500,],
        ['Mar', 18000,],
        ['Apr', 21000,],
        ['May', 26000,],
        ['Jun', 36000,],
        ['Jul', 16000,],

    ];

    const dataRevenueWeek = [
        ['Week', 'Sales',],
        ['Sun', 1200,],
        ['Mon', 500,],
        ['Tue', 9000,],
        ['Wed', 8200,],
        ['Thus', 6000,],

    ];
    const dataUsersMonth = [
        ['Year', 'users',],
        ['Jan', 21,],
        ['Feb', 50,],
        ['Mar', 8,],
        ['Apr', 30,],
        ['May', 32,],
        ['Jun', 26,],
        ['Jul', 2,],

    ];
    const dataUsersWeek = [
        ['Year', 'users',],
        ['Sun', 2,],
        ['Mon', 8,],
        ['Tue', 4,],
        ['Wed', 4,],
        ['Thus', 7,],

    ];
    const [revenueData, setRevenueData] = useState(dataRevenueMonth);
    const [userData, setUserData] = useState(dataUsersMonth);
    return <>
        <div className='col-span-2  h-96 w-full  pb-0 ' style={{perspective: '1000px'}}>

            <div className='col-span-2  h-96 w-full  pb-0 ' style={{
                position:'relative',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                transition: 'transform 0.5s ease-in-out',
                transformStyle: 'preserve-3d',}}>

            <div className=" flip-card-front  bg-white shadow rounded-md p-1" >
                <div className="flex space-x-4 p-4">
                    <div className="flex-1 space-y-6 py-1">
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-1">
                                <div
                                    className=" col-span-3 text-base accent-neutral-600 font-medium">{'Users Statistics'}

                                    <Lozenge
                                        appearance="new">New!</Lozenge>
                                    <span className="pl-2"> <Button onClick={()=>setUserData(dataUsersWeek)} spacing="compact" >Week</Button>  </span>
                                    <span className="pl-0"> <Button onClick={()=>setUserData(dataUsersMonth)} spacing="compact" >Months</Button>  </span>
                                </div>
                                <div
                                    className="text-xs col-span-4  text-gray-400 font-medium">{'A simple graph showing flow of new users'}</div>

                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <Button isDisabled  > Users</Button>
                        <Button appearance={'primary'} onClick={handleFlipClick}> Revenue</Button>
                    </div>
                </div>
                <div className="w-full bg-slate-100">
                    <Chart
                        chartType="AreaChart"
                        data={userData}
                        options={options}
                        height="18rem"
                        width='100%'
                        legendToggle
                    />
                </div>
            </div>

            <div className="flip-card-back bg-white  shadow rounded-md p-1"  >
                <div className="flex space-x-4 p-4">
                    <div className="flex-1 space-y-6 py-1">
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-1">
                                <div
                                    className=" col-span-3 text-base accent-neutral-600 font-medium ">{'Ads revenue'}
                                    <span className="pl-2"> <Button onClick={()=>setRevenueData(dataRevenueWeek)} spacing="compact" > Week</Button>  </span>
                                    <span className="pl-0"> <Button onClick={()=>setRevenueData(dataRevenueMonth)} spacing="compact" >Month</Button>  </span>

                                </div>
                                <div
                                    className="text-xs col-span-4  text-gray-400 font-medium">{'A simple graph showing flow of new users'}</div>

                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <Button appearance={'primary'} onClick={handleFlipClick} > Users</Button>
                        <Button isDisabled> Revenue</Button>
                    </div>
                </div>
                <div className="w-full bg-slate-100">
                    <Chart
                        chartType="AreaChart"
                        data={revenueData}
                        options={options2}
                        height="18rem"
                        width='100%'
                        legendToggle
                    />
                </div>
            </div>
        </div>
        </div>
    </>;
}
