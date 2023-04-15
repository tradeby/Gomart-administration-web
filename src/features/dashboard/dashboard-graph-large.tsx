import React from "react";
import {Chart} from "react-google-charts";
import Button from "@atlaskit/button/standard-button";
import Lozenge from "@atlaskit/lozenge";

export function UsersRegistrationGraph() {
    const options = {
        vAxis: {minValue: 0},
        legend: 'none',
        chartArea: {
            top:10,
            left: 70,
            right: 30,
            bottom:50
        }
    };

    const data = [
        ['Year', 'Sales', ],
        ['Jan',  15000,  ],
        ['Feb',  12500,    ],
        ['Mar',  18000,     ],
        ['Apr',  21000,      ],
        ['May',  26000,      ],
        ['Jun',  36000,      ],
        ['Jul',  16000,      ],

    ];

    return <div className="bg-white shadow col-span-2 rounded-md h-96 w-full p-2 pb-0 pt-1">
        <div className="flex space-x-4 p-5">
            <div className="flex-1 space-y-6 py-1">
                <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-1">
                        <div className=" col-span-3 text-base accent-neutral-600 font-medium">{'Users Statistics'} <Lozenge
                            appearance="new">New!</Lozenge></div>
                        <div
                            className="text-xs col-span-4  text-gray-400 font-medium">{'A simple graph showing flow of new users'}</div>

                    </div>
                </div>
            </div>
            <div className="flex flex-row gap-2">
                <Button appearance={'primary'}> Users</Button>
                <Button> Revenue</Button>
            </div>
        </div>
        <div className="w-full bg-slate-100">
            <Chart
                chartType="AreaChart"
                data={data}
                options={options}
                height="18rem"
                width='100%'
                legendToggle
            />
        </div>
    </div>;
}
