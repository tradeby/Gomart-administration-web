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

const breadcrumbs = (
    <Breadcrumbs onExpand={__noop}>
        <BreadcrumbsItem text="Users" key="Some project"/>
        <BreadcrumbsItem text="List" key="Parent page"/>
    </Breadcrumbs>
);
const actionsContent = (
    <ButtonGroup>
        <Button appearance="primary">Invite Administrators</Button>
    </ButtonGroup>
);
const barContent = () => {
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

    return <div style={{display: 'flex'}}>
        <div style={{flex: '0 0 400px'}}>
            <TextField isCompact placeholder="Search users, names, email, phone number etc" aria-label="Search users"/>
        </div>
        <div style={{flex: '0 0 200px', marginLeft: 8}}>
            <Button onClick={() => uploadSampleDataToFirestore()} appearance="primary">Push sample data to
                firestore</Button>
        </div>
    </div>
};

export function DebugSeedData() {
    const navigate = useNavigate();
    const {loading, sUser, error} = useAppSelector((s) => s.debugSlice)
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(onLoadSampleUserData());

    }, [])
    return <div className='container px-12 mx-auto'>
        <PageHeader
            breadcrumbs={breadcrumbs}
            actions={actionsContent}
            bottomBar={barContent()}
        >
            Debug - do simple tests and see quick results
        </PageHeader>
        <div className="mt-10">
            {loading && <p>Loading data</p>}
            {error && <p>error encountered {error.status}, {error.message}</p>}
            {sUser && sUser.map(su => <p key={su.id}>{su.born}, {su.first}, {su.last}</p>)}
        </div>


    </div>
}

