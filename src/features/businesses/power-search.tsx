import React from "react";
import Breadcrumbs, {BreadcrumbsItem} from "@atlaskit/breadcrumbs";
import __noop from "@atlaskit/ds-lib/noop";
import Button from "@atlaskit/button/standard-button";
import TextField from "@atlaskit/textfield";
import PageHeader from "@atlaskit/page-header";
import Select from '@atlaskit/select';
import Form from "@atlaskit/form";
import InlineEditDefault, {InlineDatePicker} from "../../shared/inline-textfield";
import ButtonGroup from "@atlaskit/button/button-group";
import LoadingButton from "@atlaskit/button/loading-button";
import Lozenge from "@atlaskit/lozenge";
import {useNavigate} from "react-router-dom";
import Pagination from '@atlaskit/pagination';
const breadcrumbs = (
    <Breadcrumbs onExpand={__noop}>
        <BreadcrumbsItem text="Dashboard" key="Some project"/>
        <BreadcrumbsItem text="Businesses" key="Parent page"/>
        <BreadcrumbsItem text="Power Search" key="Parent page"/>
    </Breadcrumbs>
);
const barContent = (
    <div style={{display: 'flex'}}>
        <div style={{flex: '0 0 500px'}}>
            <TextField isCompact placeholder="Search businesses & Products" aria-label="Search businesses"/>
        </div>
        <div style={{flex: '0 0 300px', marginLeft: 8}}>
            <Select
                spacing="compact"
                placeholder="Choose products or Businesses"
                aria-label="Choose an option"
            />
        </div>
    </div>
);

export function PowerSearch() {
     const isPresearch = true;
    return <>
        <div className='container px-12 mx-auto'>
            <PageHeader
                breadcrumbs={breadcrumbs}

                bottomBar={barContent}
            >
                Power Search - Search a list of registered businesses & Products
            </PageHeader>
            <div className="mt-10">
                <div className='grid grid-cols-12 pb-20 gap-x-20 w-full'>
                    {isPresearch?
                        <div className='col-span-12'>
                            <PreSearchScreen/>
                        </div>
                        :

                        <div className='col-span-12 '>
                        <SearchedBusinessSection/>
                        <SavedProductsSection/>
                    </div>}


                </div>
            </div>


        </div>

    </>
}

function ProductCard() {
    return <div className="w-48 px-0 mr-4 mb-8 hover:shadow-md cursor-pointer">
        <div className="bg-white  shadow">
            <img src="https://placehold.it/400x400" alt="Restaurant Image"
                 className="w-full "/>
            <div className="p-4">
                <h3 className=" font-semibold mb-2">Restaurant Name 3</h3>
                <Lozenge>Product</Lozenge>
            </div>
        </div>
    </div>;
}

function BusinessCard() {
    const navigate = useNavigate();
    return <div onClick={()=>navigate('/businesses/business-detail/23sdfewi2')} className="w-52 hover:shadow-md px-0 mr-4 cursor-pointer px-1 mb-8">
        <div className="bg-white  shadow">
            <img src="https://placehold.it/400x400" alt="Restaurant Image"
                 className="w-full rounded-full "/>
            <div className="p-4">
                <h3 className=" font-semibold mb-2">Restaurant Name 3</h3>
                <Lozenge>Business</Lozenge>
            </div>
        </div>
    </div>;
}

function SavedProductsSection() {
    return <>
        <p className="text-lg  pt-4 pb-0 font-semibold"> Searched for "Musa" & found 55 products </p>
        <p className="text-sm text-gray-400 pt-0 pb-3 "> Search took 10ms</p>
        <div className="flex py-0 my-0 flex-wrap mx-0 px-0">
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>

        </div>
       {/* <Pagination pages={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />*/}
    </>
}

function SearchedBusinessSection() {
    return <>
        <p className="text-lg  pt-0 pb-0 font-semibold"> Searched for "Musa" & found 55 Businesses</p>
        <p className="text-sm text-gray-400 pt-0 pb-3 "> Search took 10ms</p>
        <div className="flex py-0 my-0 flex-wrap mx-0 px-0">
            <BusinessCard/>
            <BusinessCard/>
            <BusinessCard/>
            <BusinessCard/>
            <BusinessCard/>


        </div>
       {/* <Pagination pages={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />*/}
    </>
}


function PreSearchScreen() {
    return <>
        <div className="flex py-0 my-0 flex-wrap mx-0 px-0">
            <BusinessCard/>
            <BusinessCard/>
            <BusinessCard/>
            <BusinessCard/>
            <BusinessCard/>
            <BusinessCard/>
            <BusinessCard/>
            <BusinessCard/>
            <BusinessCard/>
            <BusinessCard/>


        </div>
         <Pagination pages={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
    </>
}
