import React, {useEffect, useState} from "react";
import {Chart} from "react-google-charts";
import Button from "@atlaskit/button/standard-button";
import Lozenge from "@atlaskit/lozenge";
import './card-flip.css';
import {collection, doc, onSnapshot} from "firebase/firestore";
import {db} from "../../../shared/firebase/firestore";
import {ErrorResult} from "../../debug/debug.slice";
import {DashboardData} from "../dashboard";
import {User} from "../../../shared/models";
import {GetFilteredMonthData, GetFilteredWeekData, GraphRecord, graphTypeEnum} from "./graph.helper";

interface RevenueData {
    Year: string;
    Sales: number;
}

interface DataRevenueMonth extends Array<RevenueData> {
}

type graphType = 'MONTH' | 'WEEK';

const currentDate = new Date(); // Get current date
const lastMonthDate = new Date(); // Create a new Date object for current date
lastMonthDate.setMonth(currentDate.getMonth() - 1); // Subtract 1 from the current month


export function UsersRegistrationGraph() {
    const [isFlipped, setIsFlipped] = useState(false); // State to track the flip status
    const [dataRevenueMonth, setDataRevenueMonth] = useState<Array<string | number> []>([]);
    const [dataRevenueWeek, setDataRevenueWeek] = useState<Array<string | number>[]>([]);
    const [dataUsersWeek, setDataUsersWeek] = useState<Array<string | number>[]>([]);
    const [dataUsersMonth, setDataUsersMonth] = useState<Array<string | number>[]>([]);
    const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
    const [loadingRevenueData, setLoadingRevenueData] = useState<boolean>(true);

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
            gridlines: {color: 'transparent'},// Change hAxis label color to blue
        },
        legend: 'none', // Set the background color
        series: {
            0: {color: '#00BDAE'}, // Change color of series 0 (first series) to blue
        },
        animation: {
            startup: true,
            duration: 800,
            easing: 'out'
        },
        chartArea: {
            top: 10,
            left: 70,
            right: 30,
            bottom: 50
        }
    };


    const [revenueData, setRevenueData] = useState<{ type: graphType, data: Array<string | number> [] | null }>({
        type: 'WEEK',
        data: null
    });
    const [userData, setUserData] = useState<{ type: graphType, data: Array<string | number> [] | null }>({
        type: 'MONTH',
        data: null
    });


    useEffect(() => {

        const unsubscribeUsers = onSnapshot(collection(db, 'USERS'), snapshot => {
            // const saveUsDate = new Date().toString();
            const _users: GraphRecord[] = snapshot.docs.map(doc => {
                const user = doc.data() as User;
                return {id: user.uid, totalAmount: 0, createdOn: new Date(user?.createdOn ?? lastMonthDate).toString()};
            });
            const _userDataWeek = GetFilteredWeekData(_users, new Date().toString(), graphTypeEnum.user);
            setDataUsersWeek(_userDataWeek);

            const _userDataMonth = GetFilteredMonthData(_users, new Date().toString(), graphTypeEnum.user);
            setDataUsersMonth(_userDataMonth);
            setUserData(prevState => ({
                type: prevState.type,
                data:prevState.type === 'MONTH'? _userDataMonth:_userDataWeek
            }));


            //console.log('usersData', _users);
            //setUsers(_users);
        });


        // Fetch adRevenue from Firebase Firestore and set up snapshot listener

        const unsubscribeSoldAds = onSnapshot(collection(db, 'SOLD_ADS_LIST'), snapshot => {
            const _adRevenueData: GraphRecord[] = snapshot.docs.map(doc => {
                const adSale = doc.data() as { totalAmount: number, createdOn: string };
                return {id: doc.id, totalAmount: adSale.totalAmount, createdOn: new Date(adSale.createdOn).toString()};
            });
            // console.log('adrevenuedata', adRevenueData);
            const _revDataWeek = GetFilteredWeekData(_adRevenueData, new Date().toString(), graphTypeEnum.sales);
            setDataRevenueWeek(_revDataWeek);
            const _revDataMont = GetFilteredMonthData(_adRevenueData, new Date().toString(), graphTypeEnum.sales);
            setDataRevenueMonth(_revDataMont);
            setRevenueData(prevState => (
                {
                    type: prevState.type,
                    data: prevState.type === 'MONTH' ? _revDataMont : _revDataWeek
                }
            ));

            // setAdRevenue(adRevenueData);
        });


        // Cleanup the users fetch and snapshot listener when component unmounts
        return () => {
            unsubscribeUsers();
            unsubscribeSoldAds();
        };
    }, []);
    return <>
        <div className='col-span-2  h-96 w-full  pb-0 ' style={{perspective: '1000px'}}>

            <div className='col-span-2  h-96 w-full  pb-0 ' style={{
                position: 'relative',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                transition: 'transform 0.5s ease-in-out',
                transformStyle: 'preserve-3d',
            }}>

                <div className=" flip-card-front  bg-white shadow rounded-md p-1">
                    <div className="flex space-x-4 p-4">
                        <div className="flex-1 space-y-6 py-1">
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-1">
                                    <div
                                        className=" col-span-3 text-base accent-neutral-600 font-medium">{'Users Statistics'}

                                        <Lozenge
                                            appearance="new">New!</Lozenge>
                                        <span className="pl-2"> <Button
                                            onClick={() => setUserData({type: 'WEEK', data: dataUsersWeek})}
                                            appearance={userData.type === 'WEEK' ? 'primary' : 'default'}
                                            spacing="compact">Week</Button>  </span>
                                        <span className="pl-0"> <Button
                                            onClick={() => setUserData({type: 'MONTH', data: dataUsersMonth})}
                                            appearance={userData.type === 'MONTH' ? 'primary' : 'default'}
                                            spacing="compact">Months</Button>  </span>
                                    </div>
                                    <div
                                        className="text-xs col-span-4  text-gray-400 font-medium">{'A simple graph showing flow of new users'}</div>

                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <Button isDisabled> Users</Button>
                            <Button appearance={'primary'} onClick={handleFlipClick}> Revenue</Button>
                        </div>
                    </div>
                    {userData.data === null ? <div className="w-full h-5/6 mt-5 bg-slate-100"></div> :
                        <div className="w-full bg-slate-100">
                            <Chart
                                chartType="AreaChart"
                                data={userData.data}
                                options={options}
                                height="18rem"
                                width='100%'
                                legendToggle
                            />
                        </div>}
                </div>

                <div className="flip-card-back bg-white  shadow rounded-md p-1">
                    <div className="flex space-x-4 p-4">
                        <div className="flex-1 space-y-6 py-1">
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-1">
                                    <div
                                        className=" col-span-3 text-base accent-neutral-600 font-medium ">{'Ads revenue'}
                                        <span className="pl-2"> <Button
                                            onClick={() => setRevenueData({type: 'WEEK', data: dataRevenueWeek})}
                                            appearance={revenueData.type === 'WEEK' ? 'primary' : 'default'}
                                            spacing="compact"> Week</Button>  </span>

                                        <span className="pl-0"> <Button
                                            onClick={() => setRevenueData({type: 'MONTH', data: dataRevenueMonth})}
                                            appearance={revenueData.type === 'MONTH' ? 'primary' : 'default'}
                                            spacing="compact">Month</Button>  </span>

                                    </div>
                                    <div
                                        className="text-xs col-span-4  text-gray-400 font-medium">{'A simple graph showing flow of new users'}</div>

                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <Button appearance={'primary'} onClick={handleFlipClick}> Users</Button>
                            <Button isDisabled> Revenue</Button>
                        </div>
                    </div>
                    {revenueData.data === null ? <div className="w-full h-5/6 mt-5 bg-slate-100"></div> :
                        <div className="w-full bg-slate-100">
                            <Chart
                                chartType="AreaChart"
                                data={revenueData.data}
                                options={options2}
                                height="18rem"
                                width='100%'
                                legendToggle
                            />
                        </div>}
                </div>
            </div>
        </div>
    </>;
}
