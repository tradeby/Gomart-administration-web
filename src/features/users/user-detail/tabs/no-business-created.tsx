import React from 'react';

import Button from '@atlaskit/button/standard-button';
import EmptyStateImage from '../../../../assets/businesses-empty-state.svg';
import EmptyState from '@atlaskit/empty-state';
import {Business} from "../../../../shared/models";

export function NoBusinessCreatedEmptyState() {
    const businesses = {
        companyName: "New business name",
        //businessCategory: "Home products",
        //address: "5678 Kofar Ruwa Road",
        closingTime: "00:00",
        openingTime: "10:00",
        membersSince: "timestamp",
        numberOfFollowers: 0,
        phoneNumber: "+234-876-543-2109",
        analytics: {
            visitors: 0,
        },
        isDeactivated: false,
        isPublished: false,
        galleryPhotos: [
           ],
        //businessManagerUserId: 'B3Vp0E1mCNT1GqXwugAmTxXA0a63',
        createdOn: "2020-06-12",
        updatedOn: "2020-06-12",
    };
    return (
        <EmptyState
            header="No business associated with account"
            description="You can create a business account and associate it with this user"
            primaryAction={<Button appearance="primary">Create business</Button>}
            renderImage={() => <div className='w-full text-center py-12 pl-20'>
                <img src={EmptyStateImage} alt={'empty state'}/>
            </div>}
        />
    );
}
