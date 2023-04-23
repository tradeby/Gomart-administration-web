import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import Breadcrumbs, {BreadcrumbsItem} from "@atlaskit/breadcrumbs";
import __noop from "@atlaskit/ds-lib/noop";
import ButtonGroup from "@atlaskit/button/button-group";
import Button from "@atlaskit/button/standard-button";
import TextField from "@atlaskit/textfield";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import PageHeader from "@atlaskit/page-header";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../../shared/firebase/firestore";
import {onLoadSampleUserData} from "./debug.slice";
import Tabs, {Tab, TabList, TabPanel} from "@atlaskit/tabs";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {geocodeByAddress, getLatLng} from 'react-google-places-autocomplete';
import "react-google-places-autocomplete/dist/index.min.css";
import {SummaryTabPanel} from "../users/user-detail/tabs/summary-tab";
import {SavedProductsTab} from "../users/user-detail/tabs/saved-products";
import {RecentlyViewedTab} from "../users/user-detail/tabs/recently-viewed-tab";
import {FollowedBusinessesTab} from "../users/user-detail/tabs/followed-businesses-tab";
import {GoogleMap, Autocomplete} from '@react-google-maps/api';

import Textfield from '@atlaskit/textfield';
import {Field} from "@atlaskit/form";


const breadcrumbs = (
    <Breadcrumbs onExpand={__noop}>
        <BreadcrumbsItem text="Users" key="Some project"/>
        <BreadcrumbsItem text="List" key="Parent page"/>
    </Breadcrumbs>
);


export function DebugSeedData() {
    const navigate = useNavigate();
    const {loading, sUser, error} = useAppSelector((s) => s.debugSlice)
    const dispatch = useAppDispatch();

    async function uploadSampleDataToFirestore() {
        try {
            await addDoc(collection(db, "susers"), {
                first: "Alan",
                middle: "Mathison",
                last: "Turing",
                born: 1912
            }).then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                dispatch(onLoadSampleUserData())
            });


        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    useEffect(() => {
        dispatch(onLoadSampleUserData());

    }, [])
    return <div className='container px-12 mx-auto'>
        <PageHeader
            breadcrumbs={breadcrumbs}
        >
            Debug - do simple tests and see quick results
        </PageHeader>

        <Tabs
            onChange={(index) => console.log('Selected Tab', index + 1)}
            id="default"
        >
            <TabList>
                <Tab>test debug</Tab>
                <Tab>Seed sample data and read that data</Tab>
            </TabList>
            <TabPanel>
                <GoogleMapTestComp address={''} onAddressChange={() => console.log('address changed')}/>

            </TabPanel>
            <TabPanel>
                <div>
                    <div className='mt-4'>
                        <Button onClick={() => uploadSampleDataToFirestore()} appearance="primary">Push sample data to
                            firestore</Button>
                    </div>
                    <br/>
                    <div className="mt-2">
                        {loading && <p>Loading data</p>}
                        {error && <p>error encountered {error.status}, {error.message}</p>}
                        {sUser && sUser.map(su => <p key={su.id}>{su.born}, {su.first}, {su.last}</p>)}
                    </div>
                </div>

            </TabPanel>


        </Tabs>


    </div>
}

const apiKey = 'AIzaSyDo0KVqGLzCqIUks4a8UJSuAJSW_k3ec3o';


interface LatLng {
    lat: number;
    lng: number;
}

export function GoogleMapTestComp(prop: { address: string, onChange?: (e: ChangeEvent<HTMLInputElement>) => void, onAddressChange: (lat: number, lng: number, address: string) => void }) {
    // const [selectedAddress, setSelectedAddress] = useState<string>('');

    const handleAddress = ({description}: { description: string }) => {
        // setSelectedAddress(description);
        geocodeByAddress(description)
            .then((results: any) => getLatLng(results[0]))
            .then(({lat, lng}: LatLng) => prop.onAddressChange(lat, lng, description)
                // alert(`Successfully got latitude and longitude, ${lat}, ${lng}`)
            )
            .catch((error: any) => console.error(error));
    };


    return (
        <div className=''>
            <GooglePlacesAutocomplete
                // types={["(regions)"]} // Specify the type of results to be returned
                // componentRestrictions={{ country: "NG" }} // Set country restriction to Nigeria
                autocompletionRequest={{
                    componentRestrictions: {
                        country: 'ng',
                    }
                }}
                debounce={800}
                apiKey={apiKey}
                initialValue={prop.address}
                renderInput={(props) => (
                    <div className="suggestions-container">

                        <Field
                            label="Business address"
                            name="command"
                            isRequired
                        >
                            {({fieldProps}: any) => {
                                //  setSelectedAddress(props.value)
                                return (
                                    <>
                                        <Textfield

                                            {...fieldProps}
                                            {...props}
                                            /*
                                            name={'address'}
                                            onChange={prop?.onChange}*/
                                        />
                                        {/*   <p>{JSON.stringify(props)}</p>*/}
                                    </>

                                )
                            }}
                        </Field>
                        {/*   <input {...props}/>*/}
                    </div>
                )}
                onSelect={handleAddress}
                renderSuggestions={(
                    activeSuggestion: number, suggestions: Array<any>, onSelectSuggestion: (selection: any, event: any) => void
                ) => (
                    <div className="relative">

                        <ul
                            className="absolute left-0 right-0 z-10 bg-white border border-gray-300 rounded mt-1 max-h-40 overflow-y-auto"
                            id="suggestions-list"
                        >
                            {suggestions
                                .map((suggestion) => (
                                    <li
                                        key={suggestion.key}
                                        className="px-4 py-2 cursor-pointer"
                                        onClick={event => onSelectSuggestion(suggestion, event)}
                                    >
                                        {suggestion.description}
                                    </li>
                                ))}
                        </ul>
                        {/* {suggestions.map(suggestion => (
                            <div
                                className="suggestion"
                                onClick={event => onSelectSuggestion(suggestion, event)}
                            >
                                {suggestion.description}
                            </div>
                        ))}*/}
                    </div>
                )}
            />
        </div>
    );
}
