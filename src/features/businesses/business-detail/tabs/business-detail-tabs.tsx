import React from "react";

import Tabs, {Tab, TabList, TabPanel} from '@atlaskit/tabs';
import {BusinessInformationPanel} from "./business-information/business-information-tab";
import {ListedProductsTab} from "./listed-products/listed-products-tab";
import Lozenge from "@atlaskit/lozenge";
import {useAppSelector} from "../../../../app/hooks";
import {Business} from "../../../../shared/models";


export function BusinessDetailTabs() {
    const {loading, error, business} = useAppSelector((state) => state.businessDetailSlice);
    if (loading) {
        return <p>Loading</p>
    }

    if (error) {
        return <p>Error encountered: {error} </p>
    }
    return (
        <Tabs
            onChange={(index) => console.log('Selected Tab', index + 1)}
            id="default"
        >
            <TabList>
                <Tab>Business Information</Tab>
                <Tab>Listed Products</Tab>
                {/*<Tab >Transaction History <Lozenge appearance={'new'}>Coming Soon</Lozenge> </Tab>*/}
            </TabList>
            <TabPanel> <BusinessInformationPanel business={business as Business}/> </TabPanel>
            <TabPanel> <ListedProductsTab/> </TabPanel>


        </Tabs>
    );
}

