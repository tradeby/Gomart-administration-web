import React, {useEffect, useState} from "react";
import sketchIcon from '../../assets/dashboard/sketch.svg'
import newFeatureIcon from '../../assets/dashboard/epic.svg'
import totalUsersIcon from '../../assets/dashboard/total-users.png'
import totalAdRevenueIcon from '../../assets/dashboard/total-ad-revenue.png'
import totalBusinessIcon from '../../assets/dashboard/total-businesses.png'
import totalAppFeedbackIcon from '../../assets/dashboard/total-app-feedback.png'
import {useNavigate} from "react-router-dom";
import {GraphSection} from "./graphs/graph-section";
import {CountTotalSection} from "./count-total/count-total-section";
import CountUp from "react-countup";
import {useAppSelector} from "../../app/hooks";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../../shared/firebase/firestore";
import {ErrorResult} from "../debug/debug.slice";
import Lozenge from "@atlaskit/lozenge";


export interface DashboardData {
    totalUsers: number,
    totalBusinesses: number,
    totalAdRevenue: number,
    totalAppFeedback: number,
    //createdOn: string
}

export interface DashboardCountState {
    dashboardCount: DashboardData | null;
    loading: boolean;
    error: ErrorResult | null;
}

export function Dashboard() {


    const [isLoading, setIsLoading] = useState(true);
    const {user} = useAppSelector((state) => state.authentication);
    const [{loading, error, dashboardCount}, setDashboardData] = useState<DashboardCountState>({
        dashboardCount: {
            totalUsers: 0,
            totalBusinesses: 0,
            totalAdRevenue: 0,
            totalAppFeedback: 0,
        },
        loading: true,
        error: null,
    });
    const [prevDashboardData, setPrevDashboardData] = useState<DashboardData>({
        totalUsers: 0,
        totalBusinesses: 0,
        totalAdRevenue: 0,
        totalAppFeedback: 0,
    });
    const navigate = useNavigate();

    // const {loading, error, dashboardCount} = useAppSelector((state) => state.dashboardCountSlice);
    useEffect(() => {

        setTimeout(() => {
            setIsLoading(false);
        }, 900);
        // Create a Firestore collection reference
        const documentRef = doc(db, 'DASHBOARD', 'DASHBOARD_COUNTS');

        setDashboardData((prevDashboardData) => ({
            ...prevDashboardData,
            loading: false,
        }));
        // Attach a snapshot listener to the collection
        const unsubscribe = onSnapshot(documentRef, (documentSnapshot) => {
            // Initialize an empty array to store the data

            setPrevDashboardData(dashboardCount as DashboardData);

            if (documentSnapshot.exists()) {

                const documentData = documentSnapshot.data();
                setDashboardData(prevState => {

                    return {
                        dashboardCount: documentData as DashboardData,
                        loading: false,
                        error: null,
                    }
                });

                //  setPrevDashboardData(documentData as DashboardData);
            } else {
                const errorResult: ErrorResult = {message: 'Dashboard data not found', status: 500}
                setDashboardData({
                    dashboardCount: null,
                    loading: true,
                    error: errorResult,
                })
            }
            // Assuming you're only expecting one document in the collection
        });

        // Clean up the snapshot listener on unmount or when necessary
        return () => {
            unsubscribe();
        };
    }, []);


    return <div className=' mt-0 static h-96' style={{backgroundColor: '#004453'}}>
        <div className='pt-10 container-md mx-auto w-11/12 xl:w-10/12 2xl:w-9/12'>
            <p className='text-white text-xl py-5 '>Hello {user?.displayName ?? (user?.email)}</p>

            <CountTotalSection dashboardCount={dashboardCount as DashboardData} prevDashboardData={prevDashboardData}
                               loading={isLoading}/>

            <GraphSection dashboardCount={dashboardCount as DashboardData} loading={isLoading}/>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4 '>
                {
                    isLoading ? <DashboardCardSmLoader/> :
                        <DashboardCardLg onClick={() => navigate('/ads/sales')} sectionTitle='Revenue'
                                         title='Ads Sales & Settings'
                                         isComingSoon
                                         logo={newFeatureIcon}
                                         description='Checkout all transactions of sold ads and revenue from sales'/>
                }
                {
                    isLoading ? <DashboardCardSmLoader/> :
                        <DashboardCardLg onClick={() => navigate('/businesses/power-search')}
                                         sectionTitle='Power Search' title='Search businesses & products'
                                         logo={sketchIcon}
                                         description='Get access to powerful search engine for Administrators'/>
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

export function DashboardCardSm(prop: { title: string, description: string, logo: string, startCount: number, count: number, isCurrency: boolean }) {
    return <div className="bg-white rounded-md w-full shadow   pt-3 pb-2 px-5 hover:shadow-md">
        <div className=" flex space-x-4">
            <div className="flex-1 space-y-2 py-0 px-0">
                <div className=" text-sm accent-neutral-600 font-medium">{prop.title}</div>
                <div className="grid grid-cols-4">
                    <CountUp
                        start={prop.startCount}
                        end={prop.count}
                        delay={2}
                        duration={2.75}
                        prefix={prop.isCurrency ? '₦' : ''}
                        decimals={prop.isCurrency ? 2 : 0}
                        /*separator=" "
                        onEnd={() => console.log('Ended! 👏')}
                        onStart={() => console.log('Started! 💨')}*/
                    >
                        {({countUpRef, start}) => (
                            <span ref={countUpRef} onClick={start}
                                  className=" col-span-4 font-semibold accent-neutral-600 text-2xl"></span>

                        )}
                    </CountUp>

                </div>

            </div>
            <img src={prop.logo} className="rounded-full  h-12 w-12"></img>
        </div>
        <div className="text-xs  pt-2 pb-1 text-gray-400 font-medium">{prop.description}</div>
    </div>;
}

export function DashboardCardLg(prop: { sectionTitle: string, description: string, logo: string, isComingSoon?: boolean, title: string, onClick: () => void, }) {
    return <div onClick={prop.isComingSoon ? () => {
    } : prop.onClick}
                className="bg-white rounded-md w-full shadow cursor-pointer  pt-3 pb-2 px-5 hover:shadow-md">
        <div className=" flex space-x-4">
            <div className="flex-1 space-y-2 py-0 px-0">
                <div className=" text-xs text-gray-400 font-medium">{prop.sectionTitle}</div>
                <div className="  font-semibold accent-neutral-600 text-2xl">{prop.title} {prop.isComingSoon && <Lozenge
                    appearance={'new'}> Coming soon!</Lozenge>}</div>
            </div>
            <div className="rounded-full">
                <img alt={'logo'} src={prop.logo} className=" h-12 w-12"></img>
            </div>

        </div>
        <div className="text-xs  pt-2 pb-1 text-gray-400 font-medium">{prop.description}</div>
    </div>;
}
