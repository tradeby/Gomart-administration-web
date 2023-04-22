import {
    Content,
    LeftSidebar,
    Main,
    PageLayout,
    TopNavigation,
} from '@atlaskit/page-layout';
import React, {useState} from 'react';

import { NotificationIndicator } from '@atlaskit/notification-indicator';
import {SlotWrapper} from './design-system/common';
import type { CustomGlyphProps } from '@atlaskit/icon/types';
import Icon from '@atlaskit/icon';

import '../../app.css';
import DebugIcon from '@atlaskit/icon/glyph/lightbulb';
import {CustomSideNav} from "./side-navigation/side-navigation";

import {FlagsProvider} from "@atlaskit/flag";
import {AppRoutes} from "../routes";
import {
    AppSwitcher,
    AtlassianNavigation, Help, IconButton, Notifications,
    PrimaryButton,
    PrimaryDropdownButton,
    ProductHome, Settings
} from '@atlaskit/atlassian-navigation';
import {useNavigate} from "react-router-dom";
import {CustomLogo} from "./confluence-logo/logo";
import {CustomIcon} from "./confluence-logo/icon";
import {DefaultProfile} from "./Profile/profile";
import GlobalFlag from '../../shared/flag/flag';

export default function ProductLayout() {
    return (

        <PageLayout onLeftSidebarExpand={console.log}>
            <TopNavigation
                isFixed={true}
                id="confluence-navigation"
                skipLinkTitle="Confluence Navigation"
            >
                <TopNavigationContents/>
            </TopNavigation>

            <Content testId="content">
                <LeftSidebar
                    isFixed={true}
                    width={250}
                    id="project-navigation"
                    skipLinkTitle="Project Navigation"
                    testId="left-sidebar"
                >
                    <CustomSideNav/>
                </LeftSidebar>
                <FlagsProvider>
                    <GlobalFlag></GlobalFlag>
                    <Main id="main-content" skipLinkTitle="Main Content">
                        <SlotWrapper minHeight="93.5vh">
                            <AppRoutes/>
                        </SlotWrapper>
                    </Main>

                </FlagsProvider>
            </Content>

        </PageLayout>

    );
}
function TopNavigationContents() {
     const openTab= (url:string)=> {
        window.open(url);
    }
const navigate = useNavigate();
    return (

        <AtlassianNavigation
            label="site"
            moreLabel="More"
            renderProductHome={ProductHomeExample}
            primaryItems={[
                <PrimaryButton onClick={()=> navigate('/')}>Admin area</PrimaryButton>,
                <PrimaryButton onClick={()=>openTab('https://www.algolia.com/users/sign_in')}>Algolia</PrimaryButton>,
                <PrimaryButton onClick={()=>openTab('https://dashboard.getstream.io')}>StreamChats</PrimaryButton>,
                <PrimaryButton onClick={()=>openTab('https://dashboard.paystack.com/')}>Paystack</PrimaryButton>,
                <PrimaryButton onClick={()=>openTab('https://analytics.google.com/analytics/web/#/p224736800/reports/intelligenthome')}>Google Analytics</PrimaryButton>,
                <PrimaryButton onClick={()=>openTab('https://www.gomart.ng')}>Gomart Website</PrimaryButton>,
            ]}
            renderHelp={() => <Help tooltip="Get help" />}
            renderSettings={DefaultSettings}
            renderProfile={DefaultProfile}
            renderNotifications={() =>
                {
                    const navigate = useNavigate();
                    return <IconButton icon={<DebugIcon  label={'debug bottom'}/>} onClick={()=>navigate('/debug/seed-data')}  tooltip={'debug'}/>;
                }

            }
           renderAppSwitcher={DefaultAppSwitcher}
        />
    );
}

const NotificationsBadge = () => (
    <NotificationIndicator
        onCountUpdated={console.log}
        notificationLogProvider={Promise.resolve({}) as any}
    />
);
const DefaultAppSwitcher = () => <AppSwitcher tooltip="Switch to..." />;
const DefaultSettings = () => <Settings tooltip="Product settings" />;
function ProductHomeExample() {
    const navigate = useNavigate();
    return <ProductHome
        onClick={() => navigate('/')}
        icon={CustomIcon}
        logo={CustomLogo}

    />
}


