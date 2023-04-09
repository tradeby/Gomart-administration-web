import {Route, Routes} from "react-router-dom";

import React from "react";
import {Dashboard} from "../features/dashboard/dashboard";
import {NotFound404} from "../features/system/not-found-404";
import {SplashScreen} from "../features/splash-screen/splash-screen";
import {Login} from "../features/authentication/login";
import {Register} from "../features/authentication/register";
import {ForgotPassword} from "../features/authentication/forgot-password";
import {UsersList} from "../features/users/users-list";
import {UserDetails} from "../features/users/user-detail";
import {Settings} from "../features/settings/settings";
import {PowerSearch} from "../features/businesses/power-search";
import {BusinessList} from "../features/businesses/business-list";
import {AppFeedback} from "../features/app-feedback/app-feedback";
import {SoldAds} from "../features/ads-sales/sold-ads";
import {AdsSettings} from "../features/ads-sales/ads-settings";
import {Notifications} from "../features/notifications/notifications";


export function AppRoutes() {
    return <Routes>
        <Route path="/" element={<Dashboard/>}></Route>
        <Route path="/splash-screen" element={<SplashScreen/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
        <Route path="/users" element={<UsersList/>}></Route>
        <Route path="/Users/user-detail" element={<UserDetails/>}></Route>
        <Route path="/settings" element={<Settings/>}></Route>
        <Route path="/businesses/power-search" element={<PowerSearch/>}></Route>
        <Route path="/businesses" element={<BusinessList/>}></Route>
        <Route path="/app-feedback" element={<AppFeedback/>}></Route>
        <Route path="/ads/sales" element={<SoldAds/>}></Route>
        <Route path="/ads/settings" element={<AdsSettings/>}></Route>
        <Route path="/notifications" element={<Notifications/>}></Route>
        <Route path="*" element={<NotFound404/>}/>
    </Routes>;
}
