import Form from "@atlaskit/form";
import Button from "@atlaskit/button/standard-button";
import ButtonGroup from "@atlaskit/button/button-group";
import LoadingButton from "@atlaskit/button/loading-button";
import InlineEditDefault, {InlineDatePicker, InlineSelect} from "../../../../shared/inline-textfield";
import React from "react";
import Lozenge from "@atlaskit/lozenge";
import coverPhoto from './../cover-photo.jpg';
import {useAppSelector} from "../../../../app/hooks";
interface SummaryInformationFormProp {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    dateOfBirth: string
}

export function SummaryTabPanel() {
    const {loading, error, user} = useAppSelector((state) => state.userDetailSlice);
    const submitForm = (data: SummaryInformationFormProp) => {
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
                    <p className="text-lg pt-2 font-semibold"> Personal Information
                    </p>
                    <Form<SummaryInformationFormProp>
                        onSubmit={(data) => submitForm(data)}>
                        {({formProps, submitting, dirty, reset}) => (
                            <form {...formProps}>

                                <div className='grid grid-cols-2 gap-x-8'>
                                    <div className='col-span-1 py-0'><InlineEditDefault
                                         defaultValue={user?.firstName}
                                        name={'firstName'}
                                        isDisabled
                                        isRequired label='First name'/>
                                    </div>
                                    <div className='col-span-1 py-0'>
                                        <InlineEditDefault
                                            isDisabled
                                             defaultValue={user?.lastName}
                                            name={'lastName'}
                                            isRequired label='Last name'/></div>
                                    <div className='col-span-1 py-0'>


                                        <InlineEditDefault
                                            isDisabled
                                            defaultValue={user?.phoneNumber}
                                            name={'phone number'}
                                            isRequired label='Phone number'/>


                                    </div>
                                    <div className='col-span-1 py-0'>


                                        <InlineDatePicker isRequired
                                                          isDisabled
                                            /*   defaultValue={student?.dataOfBirth}*/
                                                          name={'dataOfBirth'} label='Date of birth'/>


                                    </div>


                                </div>

                            {/*    <div className='pt-4'>
                                    <ButtonGroup>
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
                    <SavedProductsSection/>
                    <RecentlyViewedProductsSection/>
                    <FollowedBusinessesSection/>

                </div>
                <div className="col-span-4">

                    <div className="max-w-md my-4 pb-8 mx-auto rounded-md overflow-hidden shadow-md">
                        <div className="relative h-48">
                            <img className="absolute inset-0 object-cover justify-center w-full h-full rounded-t-md"
                                 src={coverPhoto} alt="Profile image"/>
                            <div className="absolute inset-0 bg-black opacity-10 rounded-t-md"></div>
                            <div className="relative top-16 left-24 mx-auto mt-2 mr-2 ">
                                <img className=" rounded-full object-cover"  src={user?.photoURL?user?.photoURL : "https://placehold.it/300x200"} style={{width:'200px', height:'200px'}}
                                     alt="Profile avatar"/>
                            </div>
                        </div>
                        <div className="px-4 pt-20 py-2 bg-white">
                            <h2 className="text-2xl text-center font-bold text-gray-800">{user?.displayName?user?.displayName: user?.firstName+" "+ user?.lastName}</h2>
                            <p className="text-gray-600 text-lg text-center">{user?.phoneNumber}</p>
                            <p className="text-gray-600 text-md text-center">20 years (14-OCt-2023)</p>
                          {/*  <div className=" flex justify-center">
                                <img className=" h-32 object-cover"
                                     src="https://th.bing.com/th/id/R.fbd3782b74b283e3a06c44fc7600f0a8?rik=2WUTK7aTKMXbyA&riu=http%3a%2f%2fpngimg.com%2fuploads%2fqr_code%2fqr_code_PNG6.png&ehk=nUlk4YKcz%2fILTzIDicRXimAOjkyFKx9ofIkscb3FFxA%3d&risl=&pid=ImgRaw&r=0"
                                     alt="QR code"/>
                                <div className='pt-5'>
                                    <p className="text-gray-600  ">Wallet Balance: N20,000</p>
                                    <p className="text-gray-600  ">Total transaction: N50,000</p>
                                    <p className="text-gray-600  ">Ads bought: N2,000</p>
                                </div>

                            </div>*/}
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
        <Button  onClick={() => {}}>View more</Button>
    </>
}

function RecentlyViewedProductsSection(){
    return <>
        <p className="text-lg  pt-12 pb-3 font-semibold"> Recently viewed
        </p>
        <div className="flex py-0 my-0 flex-wrap mx-0 px-0">
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>

        </div>
        <Button  onClick={() => {}}>View more</Button>
    </>
}


function FollowedBusinessesSection() {
    return <>
        <p className="text-lg  pt-12 pb-3 font-semibold"> Followed businesses
        </p>
        <div className="flex flex-wrap mx-0 px-0">
            <BusinessCard/>
            <BusinessCard/>
            <BusinessCard/>
            <BusinessCard/>
        </div>
        <Button  onClick={() => {}}>View more</Button>
    </>
}
