import React, {ReactNode} from 'react';

import Tabs, {Tab, TabList, TabPanel} from '@atlaskit/tabs';
import {SummaryTabPanel} from "./tabs/summary-tab";
import {SavedProductsTab} from "./tabs/saved-products";
import {FollowedBusinessesTab} from "./tabs/followed-businesses-tab";
import {RecentlyViewedTab} from "./tabs/recently-viewed-tab";




export default function TabsDefaultExample() {
    return (
        <Tabs
            onChange={(index) => console.log('Selected Tab', index + 1)}
            id="default"
        >
            <TabList>
                <Tab>Summary</Tab>
                <Tab>Saved products</Tab>
                <Tab>Recently viewed</Tab>
                <Tab>Followed businesses</Tab>
                <Tab>Business Profile  </Tab>
            </TabList>
            <TabPanel> <SummaryTabPanel/> </TabPanel>
            <TabPanel> <SavedProductsTab/> </TabPanel>
            <TabPanel> <RecentlyViewedTab/> </TabPanel>
            <TabPanel> <FollowedBusinessesTab/></TabPanel>
            <TabPanel> <div> Own Businsess information {'==>'} will redirect to business detail page on click </div> </TabPanel>

        </Tabs>
    );
}
