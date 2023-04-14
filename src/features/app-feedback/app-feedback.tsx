import React from "react";
import Breadcrumbs, {BreadcrumbsItem} from "@atlaskit/breadcrumbs";
import __noop from "@atlaskit/ds-lib/noop";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../app/hooks";
import PageHeader from "@atlaskit/page-header";
import Checkbox from "@atlaskit/checkbox";
import {HeadCellType} from "@atlaskit/dynamic-table/types";
import {sampleData, SoldAdsTableModel} from "../ads-sales/sold-ads-model";
import {AppDispatch} from "../../app/store";
import {createKey} from "../../shared/table-helper";
import Avatar from "@atlaskit/avatar";
import Lozenge from "@atlaskit/lozenge";
import {timeAgo} from "../../shared/time-ago/time-ago";
import Button from "@atlaskit/button/standard-button";
import DynamicTable from "@atlaskit/dynamic-table";

const breadcrumbs = (
    <Breadcrumbs onExpand={__noop}>
        <BreadcrumbsItem text="Dashboard" key="Some project"/>
        <BreadcrumbsItem text="App Feedback" key="Parent page"/>
        <BreadcrumbsItem text="list" key="Parent page"/>
    </Breadcrumbs>
);



export function AppFeedback() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    return <div className='container px-12 mx-auto'>
        <PageHeader
            breadcrumbs={breadcrumbs}

        >
            App feedback - see all feedbacks sent by customers
        </PageHeader>
        <div className='py-8'>
            <DynamicTable
                head={tableHead({withWidth: true})}
                rows={rows(sampleData, navigate, dispatch)}
                rowsPerPage={4}
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
                key: 'check',
                content: <Checkbox
                    onClick={() => {
                    }}
                ></Checkbox>,
                isSortable: false,
                width: 2,
            },
            {
                key: 'product_business',
                content: 'Product',
                width: props.withWidth ? 20 : undefined,
            },{
                key: 'business',
                content: 'Vendor',
                width: props.withWidth ? 10 : undefined,
            },

            {
                key: 'adType',
                content: 'Ad Type',
                width: props.withWidth ? 10 : undefined,
            }, {
                key: 'duration',
                content: 'Duration',
                width: props.withWidth ? 10 : undefined,
            }, {
                key: 'totalAmount',
                content: 'Total amount',
                width: props.withWidth ? 10 : undefined,
            }, {
                key: 'billingUser',
                content: 'Billing user',
                width: props.withWidth ? 15 : undefined,
            },
            {
                key: 'createdOn',
                content: 'Created on',
                width: props.withWidth ? 10 : undefined,
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

const rows = (soldAds: SoldAdsTableModel[] | undefined, navigate: NavigateFunction, dispatch: AppDispatch,) =>
    soldAds?.map((soldAd: SoldAdsTableModel, index: number) => ({
        key: `row-${index}-${soldAd.adsId}`,
        cells: [
            {
                key: createKey('Check' + soldAd.adsId.toString()),
                content: <Checkbox
                    onClick={() => {
                    }}
                ></Checkbox>,
            },
            {
                key: createKey(soldAd.adsId + soldAd.nameOfAdsProduct),
                content: <div
                    onClick={() => navigate('/businesses/business-detail/' + soldAd.business.businessId)}
                    className='flex gap-2'>

                    <Avatar size="small" src={'user.photoUrl'}/>
                    <div>
                        <label>
                            {soldAd.nameOfAdsProduct}
                        </label>
                    </div>

                </div>
            }, {
                key: createKey(soldAd.adType + soldAd.adsId),
                content: <label>
                    {soldAd.business.nameOfBusiness}
                </label> ,
            },{
                key: createKey(soldAd.adType + soldAd.adsId),
                content: <Lozenge>{soldAd.adType}</Lozenge>,
            },
            {
                key: createKey(soldAd.duration + soldAd.adsId),
                content: <p>{soldAd.duration}</p>,
            },
            {
                key: createKey(soldAd.adType + soldAd.adsId),
                content: <p>N{soldAd.totalAmount}</p>,
            },
            {
                key: createKey(soldAd.adsId + soldAd.user.userid),
                content: <div
                    onClick={() => navigate('/user/user-detail/' + soldAd.user.userid)}
                    className='flex gap-2'>

                    <Avatar size="small" src={'user.photoUrl'}/>
                    <label>
                        {soldAd.user.userDisplayName}
                    </label>
                </div>,
            },
            {
                key: createKey(soldAd.adsId + soldAd.createdOn),
                content: timeAgo(soldAd.createdOn),
            },
            {
                key: createKey('role' + soldAd.adsId + soldAd.status),
                content: (
                    <Lozenge> {soldAd.status}</Lozenge>
                ),
            }, {
                key: createKey('view' + soldAd.adsId),
                content: (
                    <Button onClick={() => {
                    }}>View</Button>
                ),
            },
        ],
    }));


