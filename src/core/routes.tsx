import {Route, Routes} from "react-router-dom";

import React from "react";
import {Dashboard} from "../features/dashboard/dashboard";
import {NotFound404} from "../features/system/not-found-404";
import {SplashScreen} from "../features/splash-screen/splash-screen";
import {UsersList} from "../features/users/users-list";
import {Settings} from "../features/settings/settings";
import {PowerSearch} from "../features/businesses/power-search";
import {AppFeedback} from "../features/app-feedback/app-feedback";
import {SoldAds} from "../features/ads-sales/sold-ads";
import {Notifications} from "../features/notifications/notifications";
import {DebugSeedData} from "../features/debug/seed-data";
import {UserDetails} from "../features/users/user-detail/user-detail";
import {BusinessDetail} from "../features/businesses/business-detail/business-detail";
import {AdsSettings} from "../features/ads-sales/ads-settings/ads-settings";


export function AppRoutes() {
    return <Routes>
        <Route path="/" element={<Dashboard/>}></Route>
        <Route path="/splash-screen" element={<SplashScreen/>}></Route>
        <Route path="/users" element={<UsersList/>}></Route>
        <Route path="/Users/user-detail/:userId" element={<UserDetails/>}></Route>
        <Route path="/settings" element={<Settings/>}></Route>
        <Route path="/businesses/power-search" element={<PowerSearch/>}></Route>
        <Route path="/businesses/business-detail/:businessId" element={<BusinessDetail/>}></Route>
        <Route path="/app-feedback" element={<AppFeedback/>}></Route>
        <Route path="/ads/sales" element={<SoldAds/>}></Route>
        <Route path="/ads/settings" element={<AdsSettings/>}></Route>
        <Route path="/notifications" element={<Notifications/>}></Route>
        <Route path="/debug/seed-data" element={<DebugSeedData/>}></Route>
        <Route path="*" element={<NotFound404/>}/>
    </Routes>;
}
