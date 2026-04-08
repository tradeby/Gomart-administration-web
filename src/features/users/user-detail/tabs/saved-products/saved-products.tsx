import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../../../app/hooks";
import {ProductCard} from "../summary/summary-tab";
import { fetchListedProductsStart } from "./listed-saved-products.slice";

export function SavedProductsTab(){
    const dispatch = useAppDispatch();
    const {loading, error, products} = useAppSelector((state) => state.listedSavedProductSlice);
    const {user} = useAppSelector((state) => state.userDetailSlice);
    console.log("SAVED PRODUCTS IN TAB: ", products, user);
    useEffect(() => {
        dispatch(fetchListedProductsStart({uid: user?.uid as string}));
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
                products.map((product) => <ProductCard key={product.id} product={product}/>)
            }
            {/* <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/> */}

        </div>
    </>
}
