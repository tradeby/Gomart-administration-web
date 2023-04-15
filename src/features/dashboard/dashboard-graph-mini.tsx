import React from "react";
import {Chart} from "react-google-charts";
import Button from "@atlaskit/button/standard-button";

export function UsersVsBusinessesGraph() {
    const options = {
        legend: "none",
        chartArea: {
            top:20,
            left: 50,
            right: 30,
            bottom:35
        }
    };

    const data = [
        ["title", "Count", { role: 'style' }],
        ['Users', 600,'#ffab00' ],
        ['Businesses', 400,'#0052cc'],
    ];
    return <div className="bg-white col-span-2 lg:col-span-1 w-full shadow rounded-md h-96 p-2 pb-0 ">
        <div className="flex space-x-4 p-3">
            <div className="flex-1 space-y-6 py-1">
                <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-1">
                        <div className=" col-span-3 text-base accent-neutral-600 font-medium">{'Recent Activity'}</div>
                        <div
                            className="text-xs col-span-4  text-gray-400 font-medium">{'A view of all recent activity by users'}</div>

                    </div>
                </div>
            </div>

        </div>
        <div className="w-full">
            <Chart
                chartType="ColumnChart"
                data={data}
                options={options}
                height="18rem"
                legendToggle
            />
        </div>
    </div>;
}
