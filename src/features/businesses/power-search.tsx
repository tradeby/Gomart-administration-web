import React, {ChangeEvent, useEffect, useState} from "react";
import Breadcrumbs, {BreadcrumbsItem} from "@atlaskit/breadcrumbs";
import __noop from "@atlaskit/ds-lib/noop";
import Button from "@atlaskit/button/standard-button";
import TextField from "@atlaskit/textfield";
import PageHeader from "@atlaskit/page-header";
import Select, {ActionMeta} from '@atlaskit/select';
import Form from "@atlaskit/form";
import InlineEditDefault, {InlineDatePicker} from "../../shared/inline-textfield";
import ButtonGroup from "@atlaskit/button/button-group";
import LoadingButton from "@atlaskit/button/loading-button";
import placeHolderPhoto from '../../assets/place-holder-photo.svg';
import Lozenge from "@atlaskit/lozenge";
import {useNavigate} from "react-router-dom";
import Pagination from '@atlaskit/pagination';
import {getUsersStart} from "../users/users-list.slice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {loadBusinessesStart} from "./business.slice";
import {Business, Product} from "../../shared/models";
import {values} from "lodash";
import algoliasearch from 'algoliasearch/lite';
import CreateProductDialog from "./business-detail/tabs/listed-products/product-detail/create-new-product-modal";

// Define the Algolia credentials
const algoliaClient = algoliasearch('YBCSYQA18B', '199c262d8d137ad07d4ecc932ea59208');

// Define the index names
const businessIndex = algoliaClient.initIndex('prod_BUSINESSES');
const productIndex = algoliaClient.initIndex('prod_PRODUCTS');


const breadcrumbs = (
    <Breadcrumbs onExpand={__noop}>
        <BreadcrumbsItem text="Dashboard" key="Some project"/>
        <BreadcrumbsItem text="Businesses" key="Parent page"/>
        <BreadcrumbsItem text="Power Search" key="Parent page"/>
    </Breadcrumbs>
);


export function PowerSearch() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [businessResults, setBusinessResults] = useState<{ searchTime: number, businesses: Business[] }>({
        searchTime: 0,
        businesses: []
    });
    const [productResults, setProductResults] = useState<{ searchTime: number, products: Product[] }>({
        searchTime: 0,
        products: []
    });

    const [searchCategory, setSearchCategory] = useState<{ label: string, value: string }>({
        label: 'Search both Products & Businesses',
        value: 'ALL'
    },);

    const {loading, error, businesses} = useAppSelector((state) => state.businessesSlice);
    useEffect(() => {
        dispatch(loadBusinessesStart());
    }, [])

    useEffect(() => {
        // Function to perform multi-index search
        const performSearch = async () => {
            try {
                // Perform the search on businesses index
                const businessResponse = await businessIndex.search<Business>(searchTerm);
                setBusinessResults({businesses: businessResponse.hits, searchTime: businessResponse.processingTimeMS});

                // Perform the search on products index
                const productResponse = await productIndex.search<Product>(searchTerm);
                setProductResults({products: productResponse.hits, searchTime: productResponse.processingTimeMS});
                console.log(businessResponse, productResponse);
            } catch (error) {
                console.error(error);
            }
        };

        // Call the performSearch function
        if (searchTerm.length > 0) {
            performSearch();
        }

    }, [searchTerm]);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        // add validation checkIsPublishedConditionSilent();
        setSearchTerm(value ? value : '');
    };

    const handleCategoryChange = (e: any) => {
        const selectedValue = e as { label: string, value: string };
        setSearchCategory(selectedValue);
        console.log(e);

    }

    if (error) {
        return <div>{error.status} {error.message}</div>
    }


    return <>
        <div className='container px-12 mx-auto'>
            <PageHeader
                breadcrumbs={breadcrumbs}
                /*  actions={   <ButtonGroup>
                      <Button  appearance="primary">Create new Business</Button>
                  </ButtonGroup>}*/
                bottomBar={<div style={{display: 'flex'}}>
                    <div style={{flex: '0 0 500px'}}>
                        <TextField onChange={handleSearchChange}  isCompact placeholder="Search businesses & Products"
                                   aria-label="Search businesses"/>
                    </div>
                    <div style={{flex: '0 0 300px', marginLeft: 8}}>
                        <Select
                            spacing="compact"
                            placeholder="Choose products or Businesses"
                            aria-label="Choose an option"
                            onChange={handleCategoryChange}
                            defaultValue={searchCategory}
                            options={[
                                {label: 'Search both Products & Businesses', value: 'ALL'},
                                {label: 'Search products only', value: 'PRODUCTS'},
                                {label: 'Search businesses only', value: 'BUSINESSES'},
                            ]}
                        />
                    </div>
                </div>
                }
            >
                {searchTerm.length > 0 ? `Searching for ${searchTerm}..` : 'Power Search - Search a list of registered businesses & Products'}
            </PageHeader>
            <div className="mt-10">
                <div className='grid grid-cols-12 pb-20 gap-x-20 w-full'>
                    {searchTerm.length > 0 ?
                        <div className='col-span-12 '>
                            {
                                (searchCategory.value === 'ALL' || searchCategory.value === 'PRODUCTS') &&
                                <SavedProductsSection
                                    searchTerm={searchTerm}
                                    products={productResults.products}
                                    timeInMs={productResults.searchTime}
                                />
                            }

                            {
                                (searchCategory.value === 'ALL' || searchCategory.value === 'BUSINESSES') &&
                                <SearchedBusinessSection
                                    searchTerm={searchTerm}
                                    businesses={businessResults.businesses}
                                    timeInMs={businessResults.searchTime}
                                />
                            }


                        </div> :
                        <div className='col-span-12'>
                            {loading && <PreSearchScreenLoading/>}
                            {!loading && <PreSearchScreen businesses={businesses}/>}
                        </div>


                    }


                </div>
            </div>


        </div>

    </>
}

/*function ProductCard(props: { product: Product }) {
    return <div className="w-48 px-0 mr-4 mb-8 hover:shadow-md cursor-pointer">
        <div className="bg-white  shadow">
            <img src={props.product?.productImageUrls[0] ?? placeHolderPhoto} alt="Restaurant Image"
                 className="w-full "/>
            <div className="p-4">
                <h3 className=" font-semibold mb-2">{props.product.productName}</h3>
                <Lozenge>Product</Lozenge>
                {props.product.isPublished ?
                    <Lozenge appearance={'success'}>Visible</Lozenge> :
                    <Lozenge>Not Visible</Lozenge>}
            </div>
        </div>
    </div>;
}*/

function BusinessCard(prop: { business: Business }) {
    const navigate = useNavigate();
    return <div onClick={() => navigate('/businesses/business-detail/' + prop.business.id)}
                className=" hover:shadow-md px-0 mr-4 cursor-pointer px-1 mb-8">
        <div className="bg-white  shadow">
            <img src={prop.business?.logoUrl ? prop.business?.logoUrl : placeHolderPhoto} alt="Restaurant Image"
                 className=" rounded-full object-cover" style={{width: '14rem', height: '14rem'}}/>
            <div className="p-4">
                <h3 className=" font-semibold mb-2">{prop.business.companyName}</h3>
                <Lozenge>{prop.business.businessCategory}</Lozenge>
            </div>
        </div>
    </div>;
}

function BusinessCardLoading() {
    const navigate = useNavigate();
    return <div className="hover:shadow-sm shadow-sm px-0 mr-4 cursor-pointer px-1 mb-8">
        <div className="bg-white  ">
            <div
                className=" rounded-full bg-slate-200" style={{width: '14rem', height: '14rem'}}/>
            <div className="p-4">

                <div className="h-2 bg-slate-200 rounded"></div>
                <div className="grid grid-cols-7 pt-2 gap-4">
                    <div className="h-4 bg-slate-200 rounded col-span-4"></div>
                </div>
            </div>
        </div>
    </div>;
}

function SavedProductsSection(props: { searchTerm: string, products: Product[], timeInMs: number }) {
    return <>
        {props.products.length>0 && <>

            <p className="text-lg  pt-4 pb-0 font-semibold"> Searched for "{props.searchTerm}" &
                found {props.products.length} products </p>
            <p className="text-sm text-gray-400 pt-0 pb-3 "> Search took {props.timeInMs}ms</p>
            <div className="flex py-0 my-0 flex-wrap mx-0 px-0">
                {props.products.map(p => <CreateProductDialog editProduct={p} key={p.id}/>
                )}

            </div>
        </>}
        {/* <Pagination pages={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />*/}
    </>
}

function SearchedBusinessSection(props: { searchTerm: string, businesses: Business[], timeInMs: number }) {
    return <>
        {props.businesses.length>0 && <>
            <p className="text-lg  pt-0 pb-0 font-semibold"> Searched for "{props.searchTerm}" &
                found {props.businesses.length} Businesses</p>
            <p className="text-sm text-gray-400 pt-0 pb-3 "> Search took {props.timeInMs}ms</p>
            <div className="flex py-0 my-0 flex-wrap mx-0 px-0">
                {props.businesses.map(b =>
                    <BusinessCard key={b.id} business={b}/>
                )}

            </div>
        </>}
        {/* <Pagination pages={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />*/}
    </>
}


function PreSearchScreen(props: { businesses: Business[] }) {
    return <>
        <div className="flex py-0 my-0 flex-wrap mx-0 px-0">
            {props.businesses.map(((bu) => <BusinessCard key={bu.id} business={bu}/>))}

        </div>
        {/* <Pagination pages={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}/>*/}
    </>
}

function PreSearchScreenLoading() {
    return <>
        <div className="flex py-0 my-0 flex-wrap mx-0 px-0">
            <BusinessCardLoading/>
            <BusinessCardLoading/>
            <BusinessCardLoading/>
            <BusinessCardLoading/>
            <BusinessCardLoading/>
            <BusinessCardLoading/>
            <BusinessCardLoading/>
            <BusinessCardLoading/>
            <BusinessCardLoading/>
            <BusinessCardLoading/>
        </div>
        <Pagination pages={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}/>
    </>
}
