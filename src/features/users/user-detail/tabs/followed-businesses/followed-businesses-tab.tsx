import {BusinessCard, ProductCard} from "../summary/summary-tab";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../../../app/hooks";
import { fetchListedFollowedBusinessesStart } from "./listed-followed-businesses.slice";

export function FollowedBusinessesTab(){
    const dispatch = useAppDispatch();
    const {loading, error, businesses} = useAppSelector((state) => state.listedFollowedBusinessesSlice);
    const {user} = useAppSelector((state) => state.userDetailSlice);
    console.log("FOLLOWED BUSINESSES IN TAB: ", businesses, user);
    useEffect(() => {
        dispatch(fetchListedFollowedBusinessesStart({uid: user?.uid as string}));
    }, [])

    if (loading) {
        return <div>Loading Products!!</div>
    }
    if (error) {
        return <div>{error.status} {error.message}</div>
    }
    return <>
        <div className="flex py-4 my-0 flex-wrap mx-0 px-0">
            {
                businesses.map((business) => <BusinessCard key={business.id} business={business}/>)
            }
            {/* <BusinessCard/>
            <BusinessCard/>
            <BusinessCard/>
            <BusinessCard/>
            <BusinessCard/>
            <BusinessCard/> */}

        </div>
    </>
}
