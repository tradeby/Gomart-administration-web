import React, {useEffect} from "react";
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
import {SummaryTabPanel} from "../users/user-detail/tabs/summary-tab";
import {SavedProductsTab} from "../users/user-detail/tabs/saved-products";
import {RecentlyViewedTab} from "../users/user-detail/tabs/recently-viewed-tab";
import {FollowedBusinessesTab} from "../users/user-detail/tabs/followed-businesses-tab";

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
            }).then((docRef)=> {
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
                <Tab>Seed sample data and read that data</Tab>
                <Tab>test debug</Tab>
            </TabList>
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
            <TabPanel>  </TabPanel>

        </Tabs>



    </div>
}

