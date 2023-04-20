import React, {useEffect} from "react";


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
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getUsersStart, searchUser} from "./users-list.slice";
import {User} from "../../shared/models";
import {formatPhoneNumber} from "../../shared/phone-number-formatter/format-phone";
import {debounce} from 'lodash'; // Import debounce function from lodash or any other debounce library

const breadcrumbs = (
    <Breadcrumbs onExpand={__noop}>
        <BreadcrumbsItem text="Dashboard" key="Some projecdt"/>
        <BreadcrumbsItem text="Users" key="Some project"/>
        <BreadcrumbsItem text="List of user" key="Parent page"/>
    </Breadcrumbs>
);
const actionsContent = (
    <ButtonGroup>
        <Button isDisabled appearance="primary">Invite Administrators</Button>
    </ButtonGroup>
);

export function UsersList() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {loading, error, users, searchTerm, searchedUser} = useAppSelector((state) => state.usersSlice);

    // Define a debounced function for slicing the input value
    const handleInputSlice = debounce((value: string) => {
        dispatch(searchUser({searchTerm: value})); // Update the sliced value in state
    }, 300); // Debounce time in milliseconds

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;// Update the input value in state
        dispatch(searchUser({searchTerm: inputValue})); // U
     //   handleInputSlice(inputValue); // Invoke the debounced function to slice the input value
    };
    useEffect(() => {
        dispatch(getUsersStart());
    }, [])


    if (error) {
        return <div>{error.status} {error.message}</div>
    }

    return <div className='container px-12 mx-auto'>
        <PageHeader
            breadcrumbs={breadcrumbs}
            actions={actionsContent}
            bottomBar={
                <div style={{display: 'flex'}}>
                    <div style={{flex: '0 0 400px'}}>
                        <TextField value={searchTerm === null ? '' : searchTerm as string} onChange={handleInputChange}
                                   isCompact placeholder="Search users, names, phone numbers, Uids etc"
                                   aria-label="Search users"/>
                    </div>
                   {/* <div style={{flex: '0 0 200px', marginLeft: 8}}>
                        <Button appearance="primary">Search</Button>
                    </div>*/}
                </div>}
        >
            Users - list of all our app's users
        </PageHeader>
        <div className="mt-10">
            <DynamicTable
                head={tableHead({withWidth: true})}
                rows={rows((searchTerm === null) ? users : searchedUser as User[], navigate, dispatch)}
                isLoading={loading}
                rowsPerPage={14}
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
                content: 'Uid',
                shouldTruncate: true,
                width: props.withWidth ? 10 : undefined,
            },
            {
                key: 'createdOn',
                content: 'Created on',
                width: props.withWidth ? 10 : undefined,
            },
            {
                key: 'lastSignIn',
                content: 'Last signed in',
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

const rows = (users: User[] | undefined, navigate: NavigateFunction, dispatch: AppDispatch,) =>
    users?.map((user: User, index: number) => ({
        key: `row-${index}-${user.uid}`,
        cells: [
            {
                key: createKey('Check' + user.uid.toString()),
                content: <Checkbox
                    onClick={() => {
                    }}
                ></Checkbox>,
            },
            {
                key: createKey(user.uid + 'photo'),
                content: <div
                    onClick={() => navigate('/Users/user-detail/' + user.uid)}
                    className='flex gap-2'>

                    <Avatar size="small" src={user.photoUrl ? user.photoUrl : user.photoURL}/>
                    <label>
                        {user.displayName ? user.displayName :(user?.firstName)? user.firstName + " " + user.lastName: user?.email?user?.email:'Undefined'} {" "}
                        {user.disabled && <Lozenge>Disabled</Lozenge>}
                    </label>
                </div>
            }, {
                key: createKey(user.uid + user.phoneNumber),
                content: <p> {formatPhoneNumber(user.phoneNumber)}</p>,
            },
            {
                key: createKey(user.uid + 'uid'),
                content: user.uid
                //content: timeAgo(user.lastSignedIn),
            },
            {
                key: createKey(user.uid + user.createdOn),
                content: timeAgo(user?.metadata?.creationTime),
            },
            {
                key: createKey(user.uid + 'lastSignIn'),
                content: timeAgo(user?.metadata?.lastSignInTime),
            },
            {
                key: createKey('role' + user.uid),
                content: !user?.email?<Lozenge> {"User"}</Lozenge>: <Lozenge appearance='inprogress'> {"Administrator"}</Lozenge>,
            }, {
                key: createKey('view' + user.uid),
                content: (
                    <Button onClick={() => navigate('/Users/user-detail/' + user.uid)}>View</Button>
                ),
            },
        ],
    }));
