import React from "react";
import Breadcrumbs, {BreadcrumbsItem} from "@atlaskit/breadcrumbs";
import __noop from "@atlaskit/ds-lib/noop";
import {NavigateFunction, useNavigate} from "react-router-dom";
import ButtonGroup from "@atlaskit/button/button-group";
import Button from "@atlaskit/button/standard-button";

import PageHeader from "@atlaskit/page-header";

import TextField from "@atlaskit/textfield";
import DynamicTable from "@atlaskit/dynamic-table";

import Checkbox from "@atlaskit/checkbox";
import {HeadCellType} from "@atlaskit/dynamic-table/types";

import Avatar from "@atlaskit/avatar";
import Lozenge from "@atlaskit/lozenge";

import Toggle from "@atlaskit/toggle";
import AdSettingsModal from "./ad-type-modal";
import {AdsTypeSettingsModel, sampleDataAdType} from "../sold-ads-model";
import {AppDispatch} from "../../../app/store";
import {createKey} from "../../../shared/table-helper";
import {timeAgo} from "../../../shared/time-ago/time-ago";
import {useAppDispatch} from "../../../app/hooks";



const breadcrumbs = (
    <Breadcrumbs onExpand={__noop}>
        <BreadcrumbsItem text="Dashboard" key="Some project"/>
        <BreadcrumbsItem text="Gomart ADS" key="Parent page"/>
        <BreadcrumbsItem text="Settings" key="Parent page"/>
    </Breadcrumbs>
);



export function AdsSettings() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    return <div className='container px-12 mx-auto'>
        <PageHeader
            breadcrumbs={breadcrumbs}
        >
            Ads settings - view ads type and change prices we charge
        </PageHeader>

            <div className='py-4'>
                <DynamicTable
                    head={tableHead({withWidth: true})}
                    rows={rows(sampleDataAdType, navigate, dispatch)}
                    rowsPerPage={20}
                    defaultPage={1}
                    isFixedSize={false}
                    loadingSpinnerSize="large"
                    isRankable={false}
                />
        </div>


    </div>
}

const tableHead = (props: {
    withWidth: boolean,
}) => {

    return {
        cells: [

            {
                key: 'ad_title',
                content: 'Ad title',
                width: props.withWidth ? 20 : undefined,
            },

            {
                key: 'adType',
                content: 'Ad Type',
                width: props.withWidth ? 10 : undefined,
            },
            {
                key: 'duration',
                content: 'Supported durations',
                width: props.withWidth ? 10 : undefined,
            },
            {
                key: 'createdOn',
                content: 'Created on',
                width: props.withWidth ? 10 : undefined,
            },
            {
                key: 'toggleOnOff',
                content: 'Toggle On/Off',
                width: props.withWidth ? 15 : undefined,
            },
            {
                key: 'status',
                content: 'Status',
                width: props.withWidth ? 15 : undefined,
            },

            {
                key: 'modify',
                content: 'Modify',
                width: 20,
                shouldTruncate: true,
            },
        ],
    } as { cells: HeadCellType[] };
};

const rows = (soldAds:  AdsTypeSettingsModel[] | undefined, navigate: NavigateFunction, dispatch: AppDispatch,) =>
    soldAds?.map((a:  AdsTypeSettingsModel, index: number) => ({
        key: `row-${index}-${a.adTypeId}`,
        cells: [ {
                key: createKey(a.adType + a.adTypeId),
                content: <label>
                    {a.adTypeTitle}
                </label> ,
            },{
                key: createKey(a.adType + a.adTypeId),
                content: <Lozenge>{a.adType}</Lozenge>,
            },
            {
                key: createKey(a.supportedDuration + a.adTypeId),
                content: <p>{a.supportedDuration.toString()}</p>,
            },
            {
                key: createKey(a.updatedOn + a.adTypeId),
                content: <p>{timeAgo(a.updatedOn)}</p>,
            },
            {
                key: createKey('role' + a.adTypeId + a.adStatus),
                content: (
                    <Toggle id="toggle-large" size="large" isChecked={a.adStatus} />
                ),
            },  {
                key: createKey('stat' + a.adTypeId + a.adStatus),
                content: (
                    a.adStatus?<Lozenge appearance='inprogress'> Active</Lozenge>:
                        <Lozenge>Disabled</Lozenge>
                ),
            }, {
                key: createKey('view' + a.adTypeId),
                content: (
                    <AdSettingsModal adsSettingItem={a}/>
                ),
            },
        ],
    }));



