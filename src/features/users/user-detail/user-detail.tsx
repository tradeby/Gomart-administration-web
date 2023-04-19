import React, {useEffect} from "react";

import Breadcrumbs, {BreadcrumbsItem} from '@atlaskit/breadcrumbs';
import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';
import __noop from '@atlaskit/ds-lib/noop';
import Select from '@atlaskit/select';
import TextField from '@atlaskit/textfield';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import PageHeader from '@atlaskit/page-header';
import UserDetailTabs from "./tabs-top-bar";
import {getUsersStart} from "../users-list.slice";
import {loadUserStart} from "./user-detail.slice";
import {useNavigate, useParams} from "react-router-dom";

const breadcrumbs =(props:{navigate:any})=>{
    return (
    <Breadcrumbs onExpand={__noop}>
        <BreadcrumbsItem  onClick={()=>props.navigate('/')} text="Home" key="Home"/>
        <BreadcrumbsItem onClick={()=>props.navigate('/users')} text="List of users" key="Users"/>
        <BreadcrumbsItem text="203" key="userId"/>
    </Breadcrumbs>
)};
const actionsContent = (
    <ButtonGroup>
        <Button appearance="primary">Block User</Button>
        <Button>Delete User</Button>
    </ButtonGroup>
);


export function UserDetails() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {userId} = useParams();
    const {loading, error, user} = useAppSelector((state) => state.userDetailSlice);

    useEffect(() => {
        dispatch(loadUserStart({userId: userId as string}));
    }, [])

    if (loading) {
        return <div>Loading!!</div>
    }
    if (error) {
        return <div>{error.status} {error.message}</div>
    }

    return <div className="container mx-auto px-10">
        <PageHeader
            breadcrumbs={breadcrumbs({navigate:navigate})}
            actions={actionsContent}
        >
         {user?.displayName ? user?.displayName : user?.firstName + ' ' + user?.lastName} - {user?.uid}
        </PageHeader>

        <UserDetailTabs/>
    </div>
}
