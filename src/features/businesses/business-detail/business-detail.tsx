import React, {useEffect} from "react";

import Breadcrumbs, {BreadcrumbsItem} from '@atlaskit/breadcrumbs';
import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';
import __noop from '@atlaskit/ds-lib/noop';


import PageHeader from '@atlaskit/page-header';
import {BusinessDetailTabs} from "./tabs/business-detail-tabs";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useNavigate, useParams} from "react-router-dom";
import {loadUserStart} from "../../users/user-detail/user-detail.slice";
import {loadBusinessStart} from "./business-detail.slice";
import {FullScreenLoader} from "../../../shared/loader/full-screen-loader";

const breadcrumbs =(props:{navigate:any, businessName:string})=>(
    <Breadcrumbs onExpand={__noop}>
        <BreadcrumbsItem  onClick={()=>props.navigate('/')} text="Dashboard" key="Home"/>
        <BreadcrumbsItem onClick={()=>props.navigate('/businesses/power-search')} text="Businesses" key="Users"/>
        <BreadcrumbsItem text={props.businessName} key="userId"/>
    </Breadcrumbs>
);
const actionsContent = (
    <ButtonGroup>
        <Button>Deactivate Business</Button>
    </ButtonGroup>
);


export function BusinessDetail() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {businessId} = useParams();
    const {loading, error, business} = useAppSelector((state) => state.businessDetailSlice);

    useEffect(() => {
        dispatch(loadBusinessStart({businessId: businessId as string}));
    }, [])

    if (loading) {
        return <div>Loading!!</div>
    }
    if (error) {
        return <div>{error.status} {error.message}</div>
    }

    return <div className="container mx-auto px-10">

        <PageHeader
            breadcrumbs={breadcrumbs({navigate:navigate, businessName: business?.companyName as string})}
            actions={actionsContent}
        >
            <div className="flex">
                <img src={business?.logoUrl} alt="Business Logo"
                     className="rounded-full mr-2 h-10 w-10 object-cover"/> Business Detail - {business?.companyName} - {business?.id}
            </div>
        </PageHeader>

        <BusinessDetailTabs/>
    </div>
}

