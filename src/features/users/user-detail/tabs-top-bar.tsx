import React, {ReactNode} from 'react';

import Tabs, {Tab, TabList, TabPanel} from '@atlaskit/tabs';
import {SummaryTabPanel} from "./tabs/summary-tab";
import {SavedProductsTab} from "./tabs/saved-products";
import {FollowedBusinessesTab} from "./tabs/followed-businesses-tab";
import {RecentlyViewedTab} from "./tabs/recently-viewed-tab";
import {useNavigate} from "react-router-dom";
import Lozenge from "@atlaskit/lozenge";




export default function TabsDefaultExample() {
    const navigate = useNavigate();
    return (
        <Tabs
            onChange={(index) => {
                if(index ===4){
                    navigate('/businesses/business-detail/23sdfewi2');
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
                  {/*  <Lozenge>No Business Created</Lozenge>*/}
                   <span> <Lozenge appearance={'inprogress'} isBold >Click to View </Lozenge></span>
                </Tab>
            </TabList>
            <TabPanel> <SummaryTabPanel/> </TabPanel>
            <TabPanel> <SavedProductsTab/> </TabPanel>
            <TabPanel> <RecentlyViewedTab/> </TabPanel>
            <TabPanel> <FollowedBusinessesTab/></TabPanel>


        </Tabs>
    );
}
