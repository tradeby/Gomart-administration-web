import React from "react";


export function Dashboard() {


    return <div className=' mt-0 static h-96' style={{backgroundColor:'#004453'}}>
        <div className='pt-10 container-md mx-auto w-11/12 xl:w-10/12 2xl:w-9/12'>
            <p className='text-white text-xl py-5 '>Hello Suleiman Musa{/*{user?.firstName} {user?.lastName}*/}!</p>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-4'>
                {

                        <DashboardCardSmLoader/>


                }
                {

                        <DashboardCardSmLoader/>


                }
                {

                        <DashboardCardSmLoader/>


                }
                {

                        <DashboardCardSmLoader/>


                }
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 pb-4'>
                {

                        <DashboardGraphLoader/>



                }

                {

                        <DashboardRecentListLoader/>



                }

            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4 '>
                {

                        <DashboardCardSmLoader/>

                }

                {

                        <DashboardCardSmLoader/>


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
