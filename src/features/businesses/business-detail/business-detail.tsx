import React from "react";

import Breadcrumbs, {BreadcrumbsItem} from '@atlaskit/breadcrumbs';
import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';
import __noop from '@atlaskit/ds-lib/noop';


import PageHeader from '@atlaskit/page-header';
import {BusinessDetailTabs} from "./tabs/business-detail-tabs";

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
    return <div className="container px-10">
        <PageHeader
            breadcrumbs={breadcrumbs}
            actions={actionsContent}
        >
            Business Detail - Auto Car Repair Center
        </PageHeader>

        <BusinessDetailTabs/>
    </div>
}

