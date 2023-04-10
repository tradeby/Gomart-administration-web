import React from "react";
import {ProductCard} from "./business-information-tab";


export function ListedProductsTab(){
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
