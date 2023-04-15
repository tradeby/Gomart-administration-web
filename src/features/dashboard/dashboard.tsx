import React, {useEffect, useState} from "react";
import sketchIcon from '../../assets/dashboard/sketch.svg'
import newFeatureIcon from '../../assets/dashboard/epic.svg'
import totalUsersIcon from '../../assets/dashboard/total-users.png'
import totalAdRevenueIcon from '../../assets/dashboard/total-ad-revenue.png'
import totalBusinessIcon from '../../assets/dashboard/total-businesses.png'
import totalAppFeedbackIcon from '../../assets/dashboard/total-app-feedback.png'
import { Chart } from "react-google-charts";
import {useNavigate} from "react-router-dom";
import {UsersVsBusinessesGraph} from "./dashboard-graph-mini";
import {UsersRegistrationGraph} from "./dashboard-graph-large";

export function Dashboard() {


    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        // Function to set isLoading to true after 3 seconds
        const setLoading = () => {
            setTimeout(() => {
                setIsLoading(false);
            }, 800);
        };

        setLoading(); // Call the function to start the timer


    }, []);

    return <div className=' mt-0 static h-96' style={{backgroundColor:'#004453'}}>
        <div className='pt-10 container-md mx-auto w-11/12 xl:w-10/12 2xl:w-9/12'>
            <p className='text-white text-xl py-5 '>Hello Suleiman Musa{/*{user?.firstName} {user?.lastName}*/}!</p>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-4'>
                {
                       isLoading? <DashboardCardSmLoader/>: <DashboardCardSm
                               logo={totalUsersIcon}
                               description='Total app user registrations'
                               title='Total Users'
                               count='600'/>

                }
                {
                    isLoading? <DashboardCardSmLoader/>: <DashboardCardSm
                        logo={totalBusinessIcon}
                        description='Total Business registration in gomart'
                        title='Total Businesses'
                        count='400'/>

                }
                {
                    isLoading? <DashboardCardSmLoader/>: <DashboardCardSm
                        logo={totalAdRevenueIcon}
                        description='Total amount of internal Ads revenue'
                        title='Total Ad Revenue'
                        count='₦ 640,349'/>

                }
                {
                    isLoading? <DashboardCardSmLoader/>: <DashboardCardSm
                        logo={totalAppFeedbackIcon}
                        description='Total app feedback submissions'
                        title='Total App Feedback'
                        count='102'/>

                }
            </div>

            <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 pb-4'>
                {

                       isLoading? <DashboardGraphLoader/>:
                           <UsersRegistrationGraph/>



                }

                {

                 isLoading?
                       <DashboardRecentListLoader/>:
                     <UsersVsBusinessesGraph/>



                }

            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4 '>
                {
                    isLoading? <DashboardCardSmLoader/>:
                        <DashboardCardLg onClick={()=>navigate('/ads/sales')} sectionTitle='Revenue' title='Ads Sales & Settings'
                                         logo={newFeatureIcon} description='Checkout all transactions of sold ads and revenue from sales'/>
                }
                {
                       isLoading? <DashboardCardSmLoader/>:
                           <DashboardCardLg onClick={()=>navigate('/businesses/power-search')} sectionTitle='Power Search' title='Search businesses & products'
                                            logo={sketchIcon} description='Get access to powerful search engine for Administrators'/>
                }



            </div>
        </div>

    </div>
}
export function DashboardCardSmLoader() {
    return <div className="bg-white rounded-md w-full shadow  p-5 hover:shadow-md">
        <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-200 rounded"></div>
                <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    </div>
                    <div className="h-2 bg-slate-200 rounded"></div>
                </div>
            </div>
            <div className="rounded-full bg-slate-200 h-11 w-11"></div>
        </div>
    </div>;
}
export function DashboardGraphLoader() {
    return <div className="bg-white shadow col-span-2 rounded-md h-96 w-full p-5">
        <div className="flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
                <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-200  col-span-1"></div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div className="h-2 bg-slate-200 col-span-3"></div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row gap-2">
                <div className="rounded bg-slate-200 h-8 w-16"></div>
                <div className="rounded bg-primary h-8 w-16"></div>
                <div className="rounded bg-slate-200 h-8 w-16"></div>
            </div>
        </div>
        <div className="w-full h-5/6 mt-5 bg-slate-100"></div>
    </div>;
}
export function DashboardRecentListLoader() {
    return <div className="bg-white col-span-2 lg:col-span-1 w-full shadow rounded-md h-96  p-5">
        <div className="flex animate-pulse  space-x-4">
            <div className="flex-1 space-y-6 py-1">
                <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-200  col-span-1"></div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div className="h-2 bg-slate-200 col-span-3"></div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row gap-2">
                <div className="rounded bg-slate-200 h-8 w-16"></div>
            </div>
        </div>
        <div className="w-full h-5/6 mt-5 animate-pulse flex flex-col justify-center ">
            <div className="rounded bg-slate-100 h-32 w-32 mx-auto"></div>
        </div>
    </div>;
}

export function DashboardCardSm(prop: { title: string, description: string, logo: string, count: string }) {
    return <div className="bg-white rounded-md w-full shadow   pt-3 pb-2 px-5 hover:shadow-md">
        <div className=" flex space-x-4">
            <div className="flex-1 space-y-2 py-0 px-0">
                <div className=" text-sm accent-neutral-600 font-medium">{prop.title}</div>
                <div className="grid grid-cols-4">
                    <div className=" col-span-4 font-semibold accent-neutral-600 text-2xl">{prop.count}</div>
                </div>

            </div>
            <img src={prop.logo} className="rounded-full  h-12 w-12"></img>
        </div>
        <div className="text-xs  pt-2 pb-1 text-gray-400 font-medium">{prop.description}</div>
    </div>;
}

export function DashboardCardLg(prop: { sectionTitle: string, description: string, logo: string, title: string,  onClick: () => void ,  }) {
    return <div onClick={prop.onClick} className="bg-white rounded-md w-full shadow cursor-pointer  pt-3 pb-2 px-5 hover:shadow-md">
        <div className=" flex space-x-4">
            <div className="flex-1 space-y-2 py-0 px-0">
                <div className=" text-xs text-gray-400 font-medium">{prop.sectionTitle}</div>
                <div className="  font-semibold accent-neutral-600 text-2xl">{prop.title}</div>
            </div>
            <div className="rounded-full">
                <img alt={'logo'} src={prop.logo} className=" h-12 w-12"></img>
            </div>

        </div>
        <div className="text-xs  pt-2 pb-1 text-gray-400 font-medium">{prop.description}</div>
    </div>;
}
