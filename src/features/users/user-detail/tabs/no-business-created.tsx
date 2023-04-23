import React, {useState} from 'react';

import Button from '@atlaskit/button/standard-button';
import EmptyStateImage from '../../../../assets/businesses-empty-state.svg';
import EmptyState from '@atlaskit/empty-state';
import {Business, User} from "../../../../shared/models";
import {useAppSelector} from "../../../../app/hooks";
import {db} from "../../../../shared/firebase/firestore";
import {addDoc, collection, doc, serverTimestamp, setDoc, Timestamp} from "firebase/firestore";
import {FullScreenLoader} from "../../../../shared/loader/full-screen-loader";
import {useNavigate} from "react-router-dom";

export function NoBusinessCreatedEmptyState() {

    const [isloading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {loading, error, user} = useAppSelector((state) => state.userDetailSlice);


    const addBusinessToFirestore = async (business: any, user: User) => {
        try {
            setIsLoading(true);
            // Add a new document with a generated ID to the 'businesses' collection
            const docRef = await addDoc(collection(db, 'BUSINESSES'), business);
            console.log('Document written with ID: ', docRef.id);

            // update userDoc with businessId;
            await setDoc(doc(collection(db, 'USERS'), user.uid), {businessId: docRef.id}, {merge: true});
            setIsLoading(false);
            navigate('/businesses/business-detail/' + docRef.id);
        } catch (error) {
            setIsLoading(false);
            alert('Error encountered while adding Business, please try again later');
            console.error('Error adding document: ', error);
        }
    };

    const handleAddBusiness = async () => {
        const newBusiness = {
            companyName: "New business name",
            businessCategory: "Business Category",
            //address: "5678 Kofar Ruwa Road",
            closingTime: "10:00",
            openingTime: "00:00",
            numberOfFollowers: 0,
            phoneNumber: user?.phoneNumber,
            analytics: {
                visitors: 0,
            },
            businessManager: user,
            map: {
                latitude: 12.0022,
                longitude: 8.5497,
            },
            isDeactivated: false,
            isPublished: false,
            galleryPhotos: [],
            membersSince: serverTimestamp() as Timestamp,
            createdOn: serverTimestamp() as Timestamp,
            updatedOn:serverTimestamp() as Timestamp,
        };
        await addBusinessToFirestore(newBusiness, user as User);
    };

    return <>
        {isloading && <FullScreenLoader/>}
        <EmptyState
            header="No business associated with account"
            description="You can create a business account and associate it with this user"
            primaryAction={<Button onClick={handleAddBusiness} appearance="primary">Create business</Button>}
            renderImage={() => <div className='w-full text-center py-12 pl-20'>
                <img src={EmptyStateImage} alt={'empty state'}/>
            </div>}
        />
    </>;
}
