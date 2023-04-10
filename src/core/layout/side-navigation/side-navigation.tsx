import React, {useContext, useEffect} from 'react';

import LightbulbIcon from '@atlaskit/icon/glyph/lightbulb';
import UsersIcon from '@atlaskit/icon/glyph/people';
import RoadmapIcon from '@atlaskit/icon/glyph/roadmap';
import PowerSearchIcon from '@atlaskit/icon/glyph/search';
import BusinessesIcon from '@atlaskit/icon/glyph/marketplace';
import ReportIcon from '@atlaskit/icon/glyph/graph-line';
import ReportBarIcon from '@atlaskit/icon/glyph/graph-bar';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import AppFeedbackIcon from '@atlaskit/icon/glyph/like';
import ScheduleIcon from '@atlaskit/icon/glyph/schedule-filled';
import NotificationsIcon from '@atlaskit/icon/glyph/page';
import AdsIcon from './../../../assets/ads-icon.svg';
import {
    ButtonItem, GoBackItem,
    LinkItem, LoadingItems, NavigationContent,
    NavigationFooter,
    NavigationHeader,
    NestableNavigationContent,
    NestingItem,
    Section,
    SideNavigation, SkeletonItem,
} from '@atlaskit/side-navigation';
import NavFooter from './common/sample-footer';
import SampleHeader from './common/sample-header';
import {useLocation, useNavigate, useParams} from "react-router-dom";

import LockIcon from "@atlaskit/icon/glyph/lock";
import Lozenge from "@atlaskit/lozenge";
import Icon from "@atlaskit/icon";


export function CustomSideNav() {
    const navigate = useNavigate();
    const loading = false;
    const {pathname} = useLocation();

    function getInitialStack(): string[] {
        if (pathname.match('/students')) {
            return ["400"]
        } else if (pathname.match('/reports/school-fees')) {
            return ["300", "700"];
        } else if (pathname.match('/reports')) {
            return ["300"];
        } else if (pathname.match('/settings/general')) {
            return ["500"];
        } else return [];
    }

    if (loading) {
        return <SideNavigation label="settings">
            <NavigationContent>
                <LoadingItems
                    isLoading
                    fallback={
                        <>

                            <SkeletonItem />
                            <SkeletonItem hasAvatar />
                            <SkeletonItem hasIcon isShimmering />
                            <SkeletonItem isShimmering />
                        </>
                    }
                >
                    <Section title="Project settings">
                        <ButtonItem>Details</ButtonItem>
                    </Section>
                </LoadingItems>
            </NavigationContent>
        </SideNavigation>
    }



    return <SideNavigation label="project" testId="side-navigation">
       {/* <NavigationHeader>
            <SampleHeader/>
        </NavigationHeader>*/}
        <NestableNavigationContent
            initialStack={getInitialStack()}
            testId="nestable-navigation-content"
        >
            <Section>
                <ButtonItem
                    id="2"
                    isSelected={(pathname.length<2)}
                    testId="filter-nesting-item"
                    iconBefore={<RoadmapIcon label=""/>}
                    onClick={() => navigate('')}
                >Dashboard
                </ButtonItem>

                <ButtonItem
                    id="2"
                    isSelected={!!(pathname.match('/users'))}
                    testId="filter-nesting-item"
                    iconBefore={<UsersIcon label=""/>}
                    onClick={() => navigate('/users')}
                > Users
                </ButtonItem>

                <ButtonItem
                    id="2"
                    isSelected={!!(pathname.match('/businesses'))}
                    testId="filter-nesting-item"
                    iconBefore={<PowerSearchIcon label=""/>}
                    onClick={() => navigate('/businesses/power-search')}
                >Power Search
                </ButtonItem>

            {/*    <ButtonItem
                    id="2"

                    testId="filter-nesting-item"
                    iconBefore={<BusinessesIcon label=""/>}

                    onClick={() => navigate('')}
                >Businesses
                </ButtonItem>*/}

                <ButtonItem
                    id="2"
                    isSelected={!!(pathname.match('/ads'))}
                    testId="filter-nesting-item"
                    iconBefore={<ScheduleIcon label=""/>}
                    onClick={() => navigate('/ads/sales')}
                >Sold Ads
                </ButtonItem>

                <ButtonItem
                    id="2"
                    isSelected={!!(pathname.match('/app-feedback'))}
                    testId="filter-nesting-item"
                    iconBefore={<AppFeedbackIcon label=""/>}
                    onClick={() => navigate('/app-feedback')}
                >App Feedback
                </ButtonItem>

                <NestingItem
                    id="300"
                    iconBefore={<ReportIcon label=""/>}
                    iconAfter={<LockIcon label={""}/> }
                    title={ <>Report <Lozenge appearance={'new'} > Coming soon!</Lozenge></>}
                    isDisabled
                    testId="settings-nesting-item"
                >

                  {/*  <Section hasSeparator title="Period entries financial reports">
                        <ButtonItem onClick={() => navigate('/reports/fina-entries/daily')}>Daily Entry</ButtonItem>
                        <ButtonItem onClick={() => navigate('/reports/fina-entries/month-entry')}>Monthly
                            Entry</ButtonItem>
                    </Section>

                    <Section hasSeparator title="Students statistics reports">
                        <ButtonItem onClick={() => navigate('/reports/Students-statistics/all')}>Students
                            Stats</ButtonItem>
                        <ButtonItem onClick={() => navigate('/reports/Students-statistics/scholarship')}>Scholarship
                            Students</ButtonItem>
                    </Section>
*/}
                </NestingItem>
                <ButtonItem
                    id="4"
                    isSelected={!!(pathname.match('/notifications'))}
                    iconBefore={<NotificationsIcon label=""/>}
                    onClick={() => navigate('/notifications')}
                >Notifications</ButtonItem>


            </Section>
        </NestableNavigationContent>
        <NavigationFooter>
            <NavFooter/>
        </NavigationFooter>
    </SideNavigation>;

}
