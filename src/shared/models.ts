

export interface Business {
    id: string;
    companyName: string;
    businessCategory: string;
    address: string;
    closingTime: string;
    openingTime: string;
    daysOpen: string;
    membersSince: string;
    numberOfFollowers: number;
    phoneNumber: string;
    state: string;
    area: string;
    map: {
        latitude: number;
        longitude: number;
    };
    analytics: {
        visitors: number;
    };
    chat: {
        streamChatToken: string;
        profilePhoto: string;
        phoneNumber: string;
    };
    logoUrl: string;
    isDeactivated:boolean;
    isPublished:boolean;
    coverPhotoUrl: string;
    galleryPhotos: string[];
    //reviews: Reviews[];
   // products: Product[];
    businessManager: User,
    createdOn: string;
    updatedOn: string;
}

export interface Product {
    id: string;
    businessId: string;
    productName: string;
    productDescription: string;
    price: number;
    callForPrice:boolean;
    productImageUrls: string[];
    specifications: ProductSpecifications[],

    isNew: boolean;
    isPublished: boolean;

    createdOn: string;
    updatedOn: string;
}


interface ProductSpecifications{
    id:string,
    title:string,
    value: string
}

export interface User {
    country: {
        countryCode: string;
        countryFlag: string;
        countryId: string;
        countryName: string;
    };
    createdOn: string;
    customClaims: Map<string, any>;
    dateOfBirth: string;
    disabled: boolean;
    displayName: string;
    email: string | null;
    emailVerified: boolean;
    firstName: string;
    isBlocked: boolean;
    isMarkedToBeDeleted: boolean;
    lastName: string;
    metadata: {
        creationTime: string;
        lastSignInTime: string;
    };
    phoneNumber: string;
    photoURL: string;
    photoUrl: string;
    businessId:string;
    uid: string;
    updatedOn: string;
}

interface SavedAddress{
    id:string;
    address:string;
    createdOn: string;
    updatedOn: string;

}

export interface SponsoredProducts {
    startDate: string;
    endDate: string;
    productId: string;
    businessId: string;
    product: Product;
    advertType: 'home' | 'search' | 'productDetail';
    createdOn: string;
    updatedOn: string;
}


export interface Review {
    id: string;
    userId: string;
    businessId: string;
    rating: number;
    reviewText: string;
    createdOn: string;
    updatedOn: string;
}
