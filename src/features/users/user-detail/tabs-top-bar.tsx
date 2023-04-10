import React, {ReactNode} from 'react';

import {css, jsx} from '@emotion/react';

import {N20, N200} from '@atlaskit/theme/colors';
import {borderRadius as getBorderRadius} from '@atlaskit/theme/constants';
import {token} from '@atlaskit/tokens';

import Tabs, {Tab, TabList, TabPanel} from '@atlaskit/tabs';
import {SummaryTabPanel} from "./tabs/summary-tab";
import {SavedProductsTab} from "./tabs/saved-products";
import {FollowedBusinessesTab} from "./tabs/followed-businesses-tab";
import {RecentlyViewedTab} from "./tabs/recently-viewed-tab";
import MarketplaceIcon from '@atlaskit/icon/glyph/marketplace'
const borderRadius = getBorderRadius();

const panelStyles = css({
    display: 'flex',
    marginTop: token('space.200', '16px'),
    marginBottom: token('space.100', '8px'),
    padding: token('space.400', '32px'),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: token('color.background.neutral', N20),
    borderRadius: `${borderRadius}px`,
    color: token('color.text.subtlest', N200),
    fontSize: '4em',
    fontWeight: 500,
});

export const Panel = ({
                          children,
                          testId,
                      }: {
    children: ReactNode;
    testId?: string;
}) => (
    <div css={panelStyles} data-testid={testId}>
        {children}
    </div>
);

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
            <TabPanel> <Panel> Own Businsess information {'==>'} will redirect to business detail page on click </Panel> </TabPanel>

        </Tabs>
    );
}
