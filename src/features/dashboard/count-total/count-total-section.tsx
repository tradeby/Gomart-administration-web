import totalUsersIcon from "../../../assets/dashboard/total-users.png";
import totalBusinessIcon from "../../../assets/dashboard/total-businesses.png";
import totalAdRevenueIcon from "../../../assets/dashboard/total-ad-revenue.png";
import totalAppFeedbackIcon from "../../../assets/dashboard/total-app-feedback.png";
import React, {useEffect, useState} from "react";
import {DashboardCardSm, DashboardCardSmLoader, DashboardData} from "../dashboard";

import {useAppDispatch, useAppSelector} from "../../../app/hooks";

import {formatToNairaCurrency} from "../../../shared/currency-formatter/format-to-naira";
import {ErrorResult} from "../../debug/debug.slice";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../../../shared/firebase/firestore";



export function CountTotalSection(props:{loading:boolean, prevDashboardData:DashboardData, dashboardCount:DashboardData}) {
    const dispatch = useAppDispatch();

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-4'>
            {
                props.loading ? <DashboardCardSmLoader/> : <DashboardCardSm
                    logo={totalUsersIcon}
                    description='Total app user registrations'
                    title='Total Users'
                    isCurrency={false}
                    startCount={props. prevDashboardData?.totalUsers}
                    count={props.dashboardCount?.totalUsers as number}/>

            }
            {
                props.loading ? <DashboardCardSmLoader/> : <DashboardCardSm
                    logo={totalBusinessIcon}
                    description='Total Business registration in gomart'
                    title='Total Businesses'
                    isCurrency={false}
                    startCount={props.prevDashboardData?.totalBusinesses}
                    count={props.dashboardCount?.totalBusinesses as number}/>

            }
            {
                props.loading ? <DashboardCardSmLoader/> : <DashboardCardSm
                    logo={totalAdRevenueIcon}
                    description='Total amount of internal Ads revenue'
                    title='Total Ad Revenue'
                    isCurrency
                    startCount={props.prevDashboardData?.totalAdRevenue}
                    count={props.dashboardCount?.totalAdRevenue as number}/>

            }
            {
                props.loading ? <DashboardCardSmLoader/> : <DashboardCardSm
                    logo={totalAppFeedbackIcon}
                    description='Total app feedback submissions'
                    title='Total App Feedback'
                    isCurrency={false}
                    startCount={props.prevDashboardData?.totalAppFeedback}
                    count={props.dashboardCount?.totalAppFeedback as number}/>

            }
        </div>
    );
}
