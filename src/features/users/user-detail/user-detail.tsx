import React from "react";

import Breadcrumbs, {BreadcrumbsItem} from '@atlaskit/breadcrumbs';
import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';
import __noop from '@atlaskit/ds-lib/noop';
import Select from '@atlaskit/select';
import TextField from '@atlaskit/textfield';

import PageHeader from '@atlaskit/page-header';
import UserDetailTabs from "./tabs-top-bar";

const breadcrumbs = (
    <Breadcrumbs onExpand={__noop}>
        <BreadcrumbsItem text="Home" key="Home"/>
        <BreadcrumbsItem text="List of users" key="Users"/>
        <BreadcrumbsItem text="203" key="userId"/>
    </Breadcrumbs>
);
const actionsContent = (
    <ButtonGroup>
        <Button appearance="primary">Block User</Button>
        <Button>Delete User</Button>
    </ButtonGroup>
);


export function UserDetails() {
    return <div className="container px-10">
        <PageHeader
            breadcrumbs={breadcrumbs}
            actions={actionsContent}
        >
            Musa Suleiman Jahun
        </PageHeader>

        <UserDetailTabs/>
    </div>
}
