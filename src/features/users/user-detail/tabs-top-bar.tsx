import React, {ReactNode} from 'react';

import Tabs, {Tab, TabList, TabPanel} from '@atlaskit/tabs';
import {SummaryTabPanel} from "./tabs/summary-tab";
import {SavedProductsTab} from "./tabs/saved-products";
import {FollowedBusinessesTab} from "./tabs/followed-businesses-tab";
import {RecentlyViewedTab} from "./tabs/recently-viewed-tab";
import {useNavigate} from "react-router-dom";
import Lozenge from "@atlaskit/lozenge";
import {useAppSelector} from "../../../app/hooks";
import {NoBusinessCreatedEmptyState} from "./tabs/no-business-created";


export default function TabsDefaultExample() {
    const navigate = useNavigate();
    const {loading, error, user} = useAppSelector((state) => state.userDetailSlice);
    return (
        <Tabs
            onChange={(index) => {
                if (index === 4) {
                    if (user?.businessId) {
                        navigate('/businesses/business-detail/' + user?.businessId);
                    }

                }
            }}
            id="default"
        >
            <TabList>
                <Tab>Summary</Tab>
                <Tab>Saved products</Tab>
                <Tab>Recently viewed</Tab>
                <Tab>Followed businesses</Tab>
                <Tab>Business Page

                    <span className={'ml-2'}>{user?.businessId ? <Lozenge appearance={'inprogress'} isBold>Click to View </Lozenge>:
                        <Lozenge>No Business Created</Lozenge>}
                   </span>
                </Tab>
            </TabList>
            <TabPanel> <SummaryTabPanel/> </TabPanel>
            <TabPanel> <SavedProductsTab/> </TabPanel>
            <TabPanel> <RecentlyViewedTab/> </TabPanel>
            <TabPanel> <FollowedBusinessesTab/></TabPanel>
            <TabPanel> <NoBusinessCreatedEmptyState/></TabPanel>


        </Tabs>
    );
}
