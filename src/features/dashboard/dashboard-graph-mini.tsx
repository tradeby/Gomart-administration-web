import React from "react";
import {Chart} from "react-google-charts";
import Button from "@atlaskit/button/standard-button";
import {useNavigate} from "react-router-dom";

export function UsersVsBusinessesGraph() {
    const navigate = useNavigate();
    const options = {
        legend: "none",
        animation:{
            startup:true,
            duration: 400,
            easing: 'out',
        },
        vAxis: {
            minValue: 0,
            gridlines: { color: 'transparent' }, // Set vAxis gridlines color to transparent
        },
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
                        <div className=" col-span-3 text-base accent-neutral-600 font-medium">{'Users vs Businesses'}</div>
                        <div
                            className="text-xs col-span-4  text-gray-400 font-medium">{'A view that show users vs businesses distribution'}</div>

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
                chartEvents={[
                    {
                        eventName: 'select',
                        callback: ({ chartWrapper }) => {
                            // Get the selected column data
                            const selectedItem = chartWrapper.getChart().getSelection()[0];
                            if (selectedItem) {
                                // Call your custom click handler
                              if(data[selectedItem.row + 1][0] ==='Users'){
                                  navigate('/users')
                              }else{
                                  navigate('/businesses/power-search')
                              }
                            }
                        },
                    },
                ]}
                legendToggle
            />
        </div>
    </div>;
}
