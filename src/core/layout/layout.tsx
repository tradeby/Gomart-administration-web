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

import '../../app.css';

import {CustomSideNav} from "./side-navigation/side-navigation";

import {FlagsProvider} from "@atlaskit/flag";
import {AppRoutes} from "../routes";
import {
    AppSwitcher,
    AtlassianNavigation, Help, Notifications,
    PrimaryButton,
    PrimaryDropdownButton,
    ProductHome, Settings
} from '@atlaskit/atlassian-navigation';
import {useNavigate} from "react-router-dom";
import {CustomLogo} from "./confluence-logo/logo";
import {CustomIcon} from "./confluence-logo/icon";
import {DefaultProfile} from "./Profile/profile";

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
                 {/*   <GlobalFlag></GlobalFlag>*/}
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

    return (

        <AtlassianNavigation
            label="site"
            moreLabel="More"
            renderProductHome={ProductHomeExample}
            primaryItems={[
                <PrimaryButton selected>Admin area</PrimaryButton>,
                <PrimaryButton>Algolia</PrimaryButton>,
                <PrimaryButton>StreamChats</PrimaryButton>,
                <PrimaryButton>Paystack</PrimaryButton>,
                <PrimaryButton>Google Analytics</PrimaryButton>,
                <PrimaryButton>Gomart Website</PrimaryButton>,
            ]}
            renderHelp={() => <Help tooltip="Get help" />}
            renderSettings={DefaultSettings}
            renderProfile={DefaultProfile}
            renderNotifications={() => (
                <Notifications badge={NotificationsBadge} tooltip="Notifications" />
            )}
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
