import React from "react";
import {ProductCard} from "./business-information-tab";
import Button from "@atlaskit/button/standard-button";
import PageHeader from "@atlaskit/page-header";
import ButtonGroup from "@atlaskit/button/button-group";


export function ListedProductsTab(){
    return <div className='w-full'>
        <PageHeader
            actions={   <ButtonGroup>
                <Button appearance='primary'>Create new product</Button>
            </ButtonGroup>}
        >
            <p className="text-lg pt-2 font-semibold"> List of products of this business
            </p>
        </PageHeader>
        <div className="flex py-4 my-0 flex-wrap mx-0 px-0">
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>

        </div>
    </div>
}
