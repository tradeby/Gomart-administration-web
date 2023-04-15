

export interface Business {
    id: string;
    companyName: string;
    businessCategory: string;
    address: string;
    closingTime: string;
    openingTime: string;
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
    coverPhotoUrl: string;
    galleryPhotos: string[];
    //reviews: Reviews[];
    products: Product[];
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
    productImageUrl: string;
    createdOn: string;
    updatedOn: string;
}

export interface User {
    country: {
        countryCode: string;
        countryFlag: string;
        countryId: string;
        countryName: string;
    };
    dateOfBirth: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    photoUrl: string;

    isBlocked: string;
    isMarkedToBeDeleted: string;

    uid: string;
    savedItems: Product[];
    favorites: Business[];
    recentlyViewed: Product[];
    savedAddresses: SavedAddress[];
    createdOn: string;
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
