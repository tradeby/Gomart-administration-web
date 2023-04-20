import React, {useEffect} from "react";
import {ProductCard} from "../business-information/business-information-tab";
import Button from "@atlaskit/button/standard-button";
import PageHeader from "@atlaskit/page-header";
import ButtonGroup from "@atlaskit/button/button-group";
import {useAppDispatch, useAppSelector} from "../../../../../app/hooks";
import {loadBusinessStart} from "../../business-detail.slice";
import {fetchListedProductsStart} from "./listed-products.slice";
import {Product} from "../../../../../shared/models";
import Lozenge from "@atlaskit/lozenge";


export function ListedProductsTab() {
    const dispatch = useAppDispatch();
    const {loading, error, products} = useAppSelector((state) => state.listedProductsSlice);
    const {business} = useAppSelector((state) => state.businessDetailSlice);

    useEffect(() => {
        dispatch(fetchListedProductsStart({businessId: business?.id as string}));
    }, [])

    if (loading) {
        return <div>Loading!!</div>
    }
    if (error) {
        return <div>{error.status} {error.message}</div>
    }

    return <div className='w-full'>
        <PageHeader
            actions={<ButtonGroup>
                <Button appearance='primary'>Create new product</Button>
            </ButtonGroup>}
        >
            <p className="text-lg pt-2 font-semibold"> List of products of this business
            </p>
        </PageHeader>
        <div className="flex py-4 my-0 flex-wrap mx-0 px-0">

            {products.map(c => <ListedProductCard product={c} key={c.id}/>)}

        </div>
    </div>
}

export function ListedProductCard(props: { product: Product }) {
    return <div className="w-full md:w-1/2 lg:w-1/4 px-1 mb-8">
        <div className="bg-white  shadow">
            <img src={props.product?.productImageUrls[0]} alt="Restaurant Image"
                 className="w-full h-64 object-cover "/>
            <div className="p-4">
                <h3 className=" font-semibold mb-2">{props.product?.productName}</h3>
                <Lozenge>New</Lozenge>
            </div>
        </div>
    </div>;
}
