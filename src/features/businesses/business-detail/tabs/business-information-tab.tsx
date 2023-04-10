import Form from "@atlaskit/form";
import InlineEditDefault, {InlineDatePicker} from "../../../../shared/inline-textfield";
import ButtonGroup from "@atlaskit/button/button-group";
import LoadingButton from "@atlaskit/button/loading-button";
import Button from "@atlaskit/button/standard-button";
import Lozenge from "@atlaskit/lozenge";
import SettingsIcon from '@atlaskit/icon/glyph/settings'
import React from "react";

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

    const submitForm = (data: BusinessInformationFormProp) => {
        //console.log('submit form', data)

    }

    /*
        if (loading) {
            return <p>Loading!</p>
        }*/
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
                                        /* defaultValue={student?.firstName}*/
                                        name={'businessName'}
                                        isRequired label='Business Name'/>
                                    </div>
                                    <div className='col-span-1 py-0'>
                                        <InlineEditDefault
                                            /*   defaultValue={student?.lastName}*/
                                            name={'phoneNumber'}
                                            isRequired label='Phone Number'/></div>


                                </div>

                                <p className="text-lg pt-2 font-semibold"> Opening & Closing times
                                </p>
                                <div className='grid grid-cols-2 gap-x-8'>
                                    <div className='col-span-1 py-0'><InlineEditDefault
                                        /* defaultValue={student?.firstName}*/
                                        name={'openingTime'}
                                        isRequired label='Opening Time'/>
                                    </div>
                                    <div className='col-span-1 py-0'>
                                        <InlineEditDefault
                                            /*   defaultValue={student?.lastName}*/
                                            name={'closingTime'}
                                            isRequired label='Closing Time'/></div>


                                </div>

                                <p className="text-lg pt-2 font-semibold"> Location & Map
                                </p>
                                <div className='grid grid-cols-2 gap-x-8'>
                                    <div className='col-span-2 py-2'>
                                        <img src="https://placehold.it/500x100"  alt="Image 1"
                                             className="rounded-lg w-full"/>
                                    </div>
                                    <div className='col-span-2 py-0'><InlineEditDefault
                                        /* defaultValue={student?.firstName}*/
                                        name={'Business Address'}
                                        isRequired label='Business Address'/>
                                    </div>


                                </div>

                                <p className="text-lg pt-2 font-semibold"> Photos
                                </p>
                                <div className="grid grid-cols-2 gap-1 md:grid-cols-4">
                                    <img src="https://placehold.it/500x400" alt="Image 1"
                                         className="rounded-lg"/>
                                    <img src="https://placehold.it/500x400" alt="Image 2"
                                         className="rounded-lg"/>
                                    <img src="https://placehold.it/500x400" alt="Image 3"
                                         className="rounded-lg"/>
                                    <img src="https://placehold.it/500x400" alt="Image 4"
                                         className="rounded-lg"/>
                                    <img src="https://placehold.it/500x400" alt="Image 5"
                                         className="rounded-lg"/>
                                    <img src="https://placehold.it/500x400" alt="Image 6"
                                         className="rounded-lg"/>
                                    <img src="https://placehold.it/500x400"
                                         alt="Image 7" className="rounded-lg"/>
                                    <img src="https://placehold.it/500x400"
                                         alt="Image 8" className="rounded-lg"/>
                                </div>


                                <div className='pt-4'><ButtonGroup>
                                    <LoadingButton
                                        type="submit"
                                        appearance="primary"
                                        /* isLoading={savingOperationOngoing}
                                           isDisabled={savingOperationOngoing}*/
                                    >
                                        Save
                                    </LoadingButton>
                                    <Button type={"reset"} onClick={() => reset()}>Discard
                                        changes</Button>
                                </ButtonGroup>

                                </div>

                            </form>
                        )}
                    </Form>

                </div>
                <div className="col-span-5">

                    <div className="max-w-md my-4 mx-auto p-2 rounded-md overflow-hidden shadow-md">
                        <div className="flex items-center space-x-4 w-full">
                            <div className="flex items-center w-full">
                                <img src="https://via.placeholder.com/50?text=Avatar" alt="Avatar"
                                     className="rounded-full h-10 w-10"/>
                                    <span className="ml-2 font-medium text-gray-800">Musa Suleiman Jahun</span>
                            </div>
                            <div className="flex items-center  pr-4 text-gray-500">
                                Settings <SettingsIcon label={'settings icon'} />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-x-8'>
                            <div className='col-span-2 py-2 justify-center'>
                                <img src="https://placehold.it/600x200"  alt="Image 1"
                                     className="w-full"/>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-1 py-5">
                            <div className="col-span-1 justify-center">
                                <img src="https://placehold.it/400x400" alt="Business Logo"
                                     className="rounded-full h-20 w-20"/>
                            </div>
                            <div className="grid grid-rows-4 gap-0 col-span-3">
                                <div className="flex items-center">
                                    <span className="font-medium text-gray-800">Business:</span>
                                    <span className="ml-2 text-gray-600 col-span-2">Acme Corporation</span>
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
                                <img src="https://placehold.it/700x200"  alt="Image 1"
                                     className="rounded-md w-full"/>
                            </div>
                        </div>
                        <p className="text-lg pt-2 font-semibold"> View our gallery
                        </p>
                        <div className="grid grid-cols-2 gap-1 md:grid-cols-4">
                            <img src="https://placehold.it/500x400" alt="Image 1"
                                 className="rounded-sm"/>
                            <img src="https://placehold.it/500x400" alt="Image 2"
                                 className="rounded-sm"/>
                            <img src="https://placehold.it/500x400" alt="Image 3"
                                 className="rounded-sm"/>
                            <img src="https://placehold.it/500x400" alt="Image 4"
                                 className="rounded-sm"/>
                            <img src="https://placehold.it/500x400" alt="Image 5"
                                 className="rounded-sm"/>
                            <img src="https://placehold.it/500x400" alt="Image 6"
                                 className="rounded-sm"/>
                            <img src="https://placehold.it/500x400"
                                 alt="Image 7" className="rounded-sm"/>
                            <img src="https://placehold.it/500x400"
                                 alt="Image 8" className="rounded-sm"/>
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
