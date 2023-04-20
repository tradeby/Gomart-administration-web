import Form from "@atlaskit/form";
import InlineEditDefault, {InlineDatePicker} from "../../../../../shared/inline-textfield";
import ButtonGroup from "@atlaskit/button/button-group";
import LoadingButton from "@atlaskit/button/loading-button";
import Button from "@atlaskit/button/standard-button";
import Lozenge from "@atlaskit/lozenge";
import SettingsIcon from '@atlaskit/icon/glyph/settings'
import React from "react";
import {MapSection} from "./google-map-section";
import {useAppSelector} from "../../../../../app/hooks";
import {useNavigate} from "react-router-dom";
import {Product} from "../../../../../shared/models";

interface BusinessInformationFormProp {
    businessName: string,
    phoneNumber: string,
    openingTime: string,
    closingTime: string,
    latitude: string,
    longitude: string,
    businessAddress: string,
    State: string,
    area: string,
    photosUrl: string[]
}

export function BusinessInformationPanel() {
    const navigate = useNavigate();
    const {loading, error, business} = useAppSelector((state) => state.businessDetailSlice);
    const submitForm = (data: BusinessInformationFormProp) => {
        //console.log('submit form', data)

    }

        if (loading) {
            return <p>Loading!</p>
        }

    if (error) {
        return <p>{error.message}</p>
    }
    return (
        <>
            <div className='grid grid-cols-12 pb-20 gap-x-20 w-full'>
                <div className='col-span-7 '>

                    <Form<BusinessInformationFormProp>
                        onSubmit={(data) => submitForm(data)}>
                        {({formProps, submitting, dirty, reset}) => (
                            <form {...formProps}>
                                <p className="text-lg pt-2 font-semibold"> Business Information
                                </p>
                                <div className='grid grid-cols-2 gap-x-8'>
                                    <div className='col-span-1 py-0'><InlineEditDefault
                                        isDisabled
                                         defaultValue={business?.companyName}
                                        name={'businessName'}
                                        isRequired label='Business Name'/>
                                    </div>
                                    <div className='col-span-1 py-0'>
                                        <InlineEditDefault
                                            isDisabled
                                               defaultValue={business?.phoneNumber}
                                            name={'phoneNumber'}
                                            isRequired label='Phone Number'/></div>


                                </div>

                                <p className="text-lg pt-2 font-semibold"> Opening & Closing times
                                </p>
                                <div className='grid grid-cols-2 gap-x-8'>
                                    <div className='col-span-1 py-0'><InlineEditDefault
                                        isDisabled
                                         defaultValue={business?.openingTime}
                                        name={'openingTime'}
                                        isRequired label='Opening Time'/>
                                    </div>
                                    <div className='col-span-1 py-0'>
                                        <InlineEditDefault
                                            isDisabled
                                            defaultValue={business?.closingTime}
                                            name={'closingTime'}
                                            isRequired label='Closing Time'/></div>


                                </div>

                                <p className="text-lg pt-2 font-semibold"> Location & Map
                                </p>
                                <div className='grid grid-cols-2 gap-x-8'>
                                    <div className='col-span-2 py-2'>
                                        <MapSection lat={business?.map.latitude as number} lng={business?.map.longitude as number} zoom={14} height={'200px'}/>
                                    </div>


                                </div>

                                <div className='grid grid-cols-3 gap-x-8 w-full'>
                                    <div className='col-span-1 py-0'><InlineEditDefault
                                        isDisabled
                                        defaultValue={business?.map.latitude.toString()}
                                        name={'latitude'}
                                        isRequired label='Latitude'/>
                                    </div>
                                    <div className='col-span-1 py-0'>
                                        <InlineEditDefault
                                            isDisabled
                                             defaultValue={business?.map.longitude.toString()}
                                            name={'Longitude'}
                                            isRequired label='Longitude'/></div>
                                    <div className='col-span-1 py-0'>
                                        <InlineEditDefault
                                            isDisabled
                                              defaultValue={'14'}
                                            name={'zoom'}
                                            isRequired label='zoom'/></div>


                                </div>

                                <div className='col-span-2 py-0'><InlineEditDefault
                                    isDisabled
                                     defaultValue={business?.address}
                                    name={'Business Address'}
                                    isRequired label='Business Address'/>
                                </div>

                                <p className="text-lg pt-2 font-semibold"> Photos
                                </p>
                                <div className="grid grid-cols-2 gap-1 md:grid-cols-4">
                                    {business?.galleryPhotos.map(ph => <img src={ph} alt="Image 1"
                                                                            className="rounded-sm shadow object-cover h-48 w-48"/>)}
                                </div>


                                {/*<div className='pt-4'><ButtonGroup>
                                    <LoadingButton
                                        type="submit"
                                        appearance="primary"
                                         isLoading={savingOperationOngoing}
                                           isDisabled={savingOperationOngoing}
                                    >
                                        Save
                                    </LoadingButton>
                                    <Button type={"reset"} onClick={() => reset()}>Discard
                                        changes</Button>
                                </ButtonGroup>

                                </div>*/}

                            </form>
                        )}
                    </Form>

                </div>
                <div className="col-span-5">

                    <div className="max-w-md my-4 mx-auto p-2 rounded-md overflow-hidden shadow-md">
                        <div className="flex items-center space-x-4 w-full">
                            <div onClick={()=>navigate('/Users/user-detail/'+business?.businessManager.uid)} className="flex cursor-pointer items-center w-full">
                                <img src={business?.businessManager.photoURL} alt="Avatar"
                                     className="rounded-full h-10 w-10"/>
                                <span
                                    className="ml-2 font-medium text-gray-800">{business?.businessManager?.displayName}</span>
                            </div>
                            <div className="flex items-center  pr-4 text-gray-500">
                                Settings <SettingsIcon label={'settings icon'}/>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-x-8'>
                            <div className='col-span-2 py-2 justify-center '>
                                <img src={business?.coverPhotoUrl} alt="Image 1"
                                     className="w-full h-28 object-cover"/>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-1 py-5">
                            <div className="col-span-1 justify-center">
                                <img src={business?.logoUrl} alt="Business Logo"
                                     className="rounded-full h-20 w-20 object-cover"/>
                            </div>
                            <div className="grid grid-rows-4 gap-0 col-span-3">
                                <div className="flex items-center">
                                    <span className="font-medium text-gray-800">Business:</span>
                                    <span className="ml-2 text-gray-600 col-span-2">{business?.companyName}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-medium text-gray-800">Address:</span>
                                    <span className="ml-2 text-gray-600 col-span-2">123 Main St, Anytown, USA</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-medium text-gray-800">Opening Hours:</span>
                                    <span className="ml-2 text-gray-600 col-span-2">9am-5pm, Monday-Friday</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-medium text-gray-800">Member Since:</span>
                                    <span className="ml-2 text-gray-600 col-span-2">January 2022</span>
                                </div>
                            </div>
                        </div>


                        <div className='grid grid-cols-2 gap-x-8'>
                            <div className='col-span-2 py-2'>
                                <MapSection lat={business?.map.latitude as number} lng={business?.map.longitude as number} zoom={13} height={'100px'}/>
                            </div>
                        </div>
                        <p className="text-lg pt-2 font-semibold"> View our gallery
                        </p>
                        <div className="grid grid-cols-2 gap-1 md:grid-cols-4">
                            {business?.galleryPhotos.map(ph => <img src={ph} alt="Image 1"
                                                                    className="rounded-sm shadow object-cover h-32 w-28"/>)}


                        </div>
                    </div>

                </div>

            </div>


        </>
    );
}


export function ProductCard() {
    return <div className="w-full md:w-1/2 lg:w-1/4 px-1 mb-8">
        <div className="bg-white  shadow">
            <img src="https://placehold.it/400x400" alt="Restaurant Image"
                 className="w-full "/>
            <div className="p-4">
                <h3 className=" font-semibold mb-2">Restaurant Name 3</h3>
                <Lozenge>Restaurant</Lozenge>
            </div>
        </div>
    </div>;
}

export function BusinessCard() {
    return <div className="w-full md:w-1/2 lg:w-1/4 px-1 mb-8">
        <div className="bg-white  shadow">
            <img src="https://placehold.it/400x400" alt="Restaurant Image"
                 className="w-full rounded-full "/>
            <div className="p-4">
                <h3 className=" font-semibold mb-2">Restaurant Name 3</h3>
                <Lozenge>Restaurant</Lozenge>
            </div>
        </div>
    </div>;
}

function SavedProductsSection() {
    return <>
        <p className="text-lg  pt-12 pb-3 font-semibold"> Saved products
        </p>
        <div className="flex py-0 my-0 flex-wrap mx-0 px-0">
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>

        </div>
        <a className="text-md -mt-10 pt-0 font-semibold"> View more
        </a>
    </>
}


function FollowedBusinessesSection() {
    return <>
        <p className="text-lg  pt-12 pb-3 font-semibold"> Saved products
        </p>
        <div className="flex flex-wrap mx-0 px-0">
            <BusinessCard/>
            <BusinessCard/>
            <BusinessCard/>
            <BusinessCard/>
        </div>
        <a className="text-md  pt-4 font-semibold"> View more
        </a>
    </>
}
