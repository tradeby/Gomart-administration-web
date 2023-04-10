import React from "react";

import Tabs, {Tab, TabList, TabPanel} from '@atlaskit/tabs';
import {BusinessInformationPanel} from "./business-information-tab";
import {ListedProductsTab} from "./listed-products-tab";
import Lozenge from "@atlaskit/lozenge";



export function BusinessDetailTabs() {
    return (
        <Tabs
            onChange={(index) => console.log('Selected Tab', index + 1)}
            id="default"
        >
            <TabList>
                <Tab>Business Information</Tab>
                <Tab>Listed Products</Tab>
                <Tab >Transaction History <Lozenge appearance={'new'}>Coming Soon</Lozenge> </Tab>
            </TabList>
            <TabPanel> <BusinessInformationPanel/> </TabPanel>
            <TabPanel> <ListedProductsTab/> </TabPanel>
            <TabPanel> <div> Coming Soon!</div> </TabPanel>

        </Tabs>
    );
}

