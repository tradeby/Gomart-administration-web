import React from "react";


import Breadcrumbs, {BreadcrumbsItem} from '@atlaskit/breadcrumbs';
import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';
import __noop from '@atlaskit/ds-lib/noop';
import Select from '@atlaskit/select';
import TextField from '@atlaskit/textfield';
import PageHeader from '@atlaskit/page-header';
import DynamicTable from '@atlaskit/dynamic-table';
import {HeadCellType} from "@atlaskit/dynamic-table/types";
import Checkbox from "@atlaskit/checkbox";
import {AppDispatch} from "../../app/store";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {ListOfUser, UserListInterface} from "./UsersModel";
import {createKey} from "../../shared/table-helper";
import {timeAgo} from "../../shared/time-ago/time-ago";
import Lozenge from "@atlaskit/lozenge";
import Avatar from "@atlaskit/avatar";
import {useAppDispatch} from "../../app/hooks";

const breadcrumbs = (
    <Breadcrumbs onExpand={__noop}>
        <BreadcrumbsItem text="Users" key="Some project"/>
        <BreadcrumbsItem text="List" key="Parent page"/>
    </Breadcrumbs>
);
const actionsContent = (
    <ButtonGroup>
        <Button appearance="primary">Invite Administrators</Button>
    </ButtonGroup>
);
const barContent = (
    <div style={{display: 'flex'}}>
        <div style={{flex: '0 0 400px'}}>
            <TextField isCompact placeholder="Search users, names, email, phone number etc" aria-label="Search users"/>
        </div>
        <div style={{flex: '0 0 200px', marginLeft: 8}}>
            <Button appearance="primary">Search</Button>
        </div>
    </div>
);

export function UsersList() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    return <div className='container px-12 mx-auto'>
        <PageHeader
            breadcrumbs={breadcrumbs}
            actions={actionsContent}
            bottomBar={barContent}
        >
            Users - list of all our app's registered users
        </PageHeader>
        <div className="mt-10">
            <DynamicTable
                head={tableHead({withWidth: true})}
                  rows={rows(ListOfUser, navigate, dispatch)}
                rowsPerPage={4}
                defaultPage={1}
                isFixedSize={false}
                loadingSpinnerSize="large"
                isRankable={false}
            />
        </div>



    </div>
}


export const tableHead = (props: {
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
                key: 'Name',
                content: 'Name of user',
                width: props.withWidth ? 20 : undefined,
            },

            {
                key: 'PhoneNumber',
                content: 'Phone number',
                width: props.withWidth ? 15 : undefined,
            },
            {
                key: 'lastSignedIn',
                content: 'Last signed in',
                shouldTruncate: true,
                width: props.withWidth ? 10 : undefined,
            },
            {
                key: 'createdOn',
                content: 'Created on',
                width: props.withWidth ? 10 : undefined,
            },
            {
                key: 'lastUpdatedOn',
                content: 'Last updated on',
                width: props.withWidth ? 15 : undefined,
            },
            {
                key: 'role',
                content: 'Role',
                width: props.withWidth ? 15 : undefined,
            },

            {
                key: 'more',
                content: 'View',
                width: 20,
                shouldTruncate: true,
            },
        ],
    } as { cells: HeadCellType[] };
};

const rows = (users: UserListInterface[] | undefined, navigate: NavigateFunction, dispatch: AppDispatch,) =>
    users?.map((user: UserListInterface, index: number) => ({
        key: `row-${index}-${user.id}`,
        cells: [
            {
                key: createKey('Check' + user.id.toString()),
                content: <Checkbox
                    onClick={() => {
                    }}
                ></Checkbox>,
            },
            {
                key: createKey(user.id + user.name),
                content: <div
                    onClick={() => navigate('/Users/user-detail/' + user.id)}
                    className='flex gap-2'>

                    <Avatar size="small" src={'user.photoUrl'}/>
                    <label>
                        {user.name}
                    </label>
                </div>
            }, {
                key: createKey(user.id + user.phoneNumber),
                content: user.phoneNumber,
            },
            {
                key: createKey(user.id + user.lastSignedIn),
                content: timeAgo(user.lastSignedIn),
            },
            {
                key: createKey(user.id + user.createdOn),
                content: timeAgo(user.createdOn),
            },
            {
                key: createKey(user.id + user.updatedOn),
                content: timeAgo(user.updatedOn),
            },
            {
                key: createKey('role' + user.id),
                content: (
                    <Lozenge > {"User"}</Lozenge>
                ),
            }, {
                key: createKey('view' + user.id),
                content: (
                    <Button onClick={() => navigate('/Users/user-detail/' + user.id)}>View</Button>
                ),
            },
        ],
    }));
