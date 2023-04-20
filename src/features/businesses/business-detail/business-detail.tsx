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

const breadcrumbs = (
    <Breadcrumbs onExpand={__noop}>
        <BreadcrumbsItem text="Dashboard" key="Home"/>
        <BreadcrumbsItem text="Businesses" key="Users"/>
        <BreadcrumbsItem text="Auto Car Repair Center" key="userId"/>
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
            breadcrumbs={breadcrumbs}
            actions={actionsContent}
        >
            Business Detail - {business?.companyName} - {business?.id}
        </PageHeader>

        <BusinessDetailTabs/>
    </div>
}

