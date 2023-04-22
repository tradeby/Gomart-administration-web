import totalUsersIcon from "../../../assets/dashboard/total-users.png";
import totalBusinessIcon from "../../../assets/dashboard/total-businesses.png";
import totalAdRevenueIcon from "../../../assets/dashboard/total-ad-revenue.png";
import totalAppFeedbackIcon from "../../../assets/dashboard/total-app-feedback.png";
import React, {useEffect, useState} from "react";
import {DashboardCardSm, DashboardCardSmLoader} from "../dashboard";

import {useAppDispatch, useAppSelector} from "../../../app/hooks";

import {formatToNairaCurrency} from "../../../shared/currency-formatter/format-to-naira";
import {ErrorResult} from "../../debug/debug.slice";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../../../shared/firebase/firestore";

interface DashboardData {
    totalUsers: number,
    totalBusinesses: number,
    totalAdRevenue: number,
    totalAppFeedback: number,
    //createdOn: string
}

interface DashboardCountState {
    dashboardCount: DashboardData | null;
    loading: boolean;
    error: ErrorResult | null;
}

export function CountTotalSection() {
    const dispatch = useAppDispatch();
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


    // const {loading, error, dashboardCount} = useAppSelector((state) => state.dashboardCountSlice);
    useEffect(() => {
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

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-4'>
            {
                loading ? <DashboardCardSmLoader/> : <DashboardCardSm
                    logo={totalUsersIcon}
                    description='Total app user registrations'
                    title='Total Users'
                    isCurrency={false}
                    startCount={prevDashboardData?.totalUsers}
                    count={dashboardCount?.totalUsers as number}/>

            }
            {
                loading ? <DashboardCardSmLoader/> : <DashboardCardSm
                    logo={totalBusinessIcon}
                    description='Total Business registration in gomart'
                    title='Total Businesses'
                    isCurrency={false}
                    startCount={prevDashboardData?.totalBusinesses}
                    count={dashboardCount?.totalBusinesses as number}/>

            }
            {
                loading ? <DashboardCardSmLoader/> : <DashboardCardSm
                    logo={totalAdRevenueIcon}
                    description='Total amount of internal Ads revenue'
                    title='Total Ad Revenue'
                    isCurrency
                    startCount={prevDashboardData?.totalAdRevenue}
                    count={dashboardCount?.totalAdRevenue as number}/>

            }
            {
                loading ? <DashboardCardSmLoader/> : <DashboardCardSm
                    logo={totalAppFeedbackIcon}
                    description='Total app feedback submissions'
                    title='Total App Feedback'
                    isCurrency={false}
                    startCount={prevDashboardData?.totalAppFeedback}
                    count={dashboardCount?.totalAppFeedback as number}/>

            }
        </div>
    );
}
