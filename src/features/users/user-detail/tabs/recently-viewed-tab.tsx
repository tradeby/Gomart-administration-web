import React from "react";
import {ProductCard} from "./summary-tab";

export function RecentlyViewedTab(){
    return <>
        <div className="flex py-4 my-0 flex-wrap mx-0 px-0">
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>

        </div>
    </>
}
