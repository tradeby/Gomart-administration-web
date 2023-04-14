export interface SoldAdsTableModel {
    adsId: string,
    nameOfAdsProduct: string,
    adType: AD_TYPE,
    duration: AD_TYPE_DURATION,
    totalAmount: number,
    business: AdsBusiness,
    user: AdsUser,
    createdOn: string,
    status: 'ACTIVE' | 'CANCELLED' | 'ENDED',


}

type AD_TYPE = 'FEATURED' | 'STANDARD' | 'PREMIUM';
type AD_TYPE_DURATION = '7DAYS' | '1DAY' | '1MONTH';

export interface AdsTypeSettingsModel {
    adTypeId: string,
    adTypeTitle: string,
    adType: AD_TYPE,
    supportedDuration: AD_TYPE_DURATION[],
    pricing: AdPricing[],
    updatedOn: string,
    adStatus: boolean,
}

export interface AdPricing{
    duration: AD_TYPE_DURATION,
    price: number,
    active: boolean,
    lastUpdated: string
}
export const sampleDataAdType: AdsTypeSettingsModel[] = [
    {
        adTypeId: "ad1",
        adTypeTitle: "Standard",
        adType: "STANDARD",
        supportedDuration: ["1DAY", "7DAYS", "1MONTH"],
        pricing:[
            {
                duration: "1DAY",
                price: 500,
                active: true,
                lastUpdated: "2023-04-10T10:30:00Z",
            },
            {
                duration: "7DAYS",
                price: 500,
                active: true,
                lastUpdated: "2023-04-10T10:30:00Z",
            },
            {
                duration: "1MONTH",
                price: 500,
                active: true,
                lastUpdated: "2023-04-10T10:30:00Z",
            }
        ],
        updatedOn: "2023-04-10T10:30:00Z",
        adStatus: true,
    },
    {
        adTypeId: "ad2",
        adTypeTitle: "FEATURED",
        adType: "FEATURED",
        supportedDuration: ["1DAY", "7DAYS", "1MONTH"],
        pricing:[
            {
                duration: "1DAY",
                price: 500,
                active: true,
                lastUpdated: "2023-04-10T10:30:00Z",
            },
            {
                duration: "7DAYS",
                price: 500,
                active: true,
                lastUpdated: "2023-04-10T10:30:00Z",
            },
            {
                duration: "1MONTH",
                price: 500,
                active: true,
                lastUpdated: "2023-04-10T10:30:00Z",
            }
        ],
        updatedOn: "2023-04-10T10:30:00Z",
        adStatus: true,
    },
    {
        adTypeId: "ad3",
        adTypeTitle: "Premium",
        adType: "PREMIUM",
        supportedDuration: ["1DAY", "7DAYS", "1MONTH"],
        pricing:[
            {
                duration: "1DAY",
                price: 500,
                active: true,
                lastUpdated: "2023-04-10T10:30:00Z",
            },
            {
                duration: "7DAYS",
                price: 500,
                active: true,
                lastUpdated: "2023-04-10T10:30:00Z",
            },
            {
                duration: "1MONTH",
                price: 500,
                active: true,
                lastUpdated: "2023-04-10T10:30:00Z",
            }
        ],
        updatedOn: "2023-04-10T10:30:00Z",
        adStatus: true,
    },
]


interface AdsBusiness {
    businessId: string,
    nameOfBusiness: string,
    businessLogoUrl: string,

}

interface AdsUser {
    userid: string,
    userDisplayName: string,
    userImageUrl: string
}

export const sampleData: SoldAdsTableModel[] = [
    {
        adsId: "ad1",
        nameOfAdsProduct: "Product 1",
        adType: "FEATURED",
        duration: "7DAYS",
        totalAmount: 100,
        business: {
            businessId: "business1",
            nameOfBusiness: "Business 1",
            businessLogoUrl: "https://example.com/logo1.jpg"
        },
        user: {
            userid: "user1",
            userDisplayName: "User 1",
            userImageUrl: "https://example.com/user1.jpg"
        },
        createdOn: "2023-04-10T10:30:00Z",
        status: "ACTIVE"
    },
    {
        adsId: "ad2",
        nameOfAdsProduct: "Product 2",
        adType: "STANDARD",
        duration: "1DAY",
        totalAmount: 50,
        business: {
            businessId: "business2",
            nameOfBusiness: "Business 2",
            businessLogoUrl: "https://example.com/logo2.jpg"
        },
        user: {
            userid: "user2",
            userDisplayName: "User 2",
            userImageUrl: "https://example.com/user2.jpg"
        },
        createdOn: "2023-04-09T14:45:00Z",
        status: "CANCELLED"
    },
    {
        adsId: "ad3",
        nameOfAdsProduct: "Product 3",
        adType: "PREMIUM",
        duration: "1MONTH",
        totalAmount: 200,
        business: {
            businessId: "business3",
            nameOfBusiness: "Business 3",
            businessLogoUrl: "https://example.com/logo3.jpg"
        },
        user: {
            userid: "user3",
            userDisplayName: "User 3",
            userImageUrl: "https://example.com/user3.jpg"
        },
        createdOn: "2023-04-08T20:15:00Z",
        status: "ENDED"
    },
    {
        adsId: "ad4",
        nameOfAdsProduct: "Product 4",
        adType: "FEATURED",
        duration: "7DAYS",
        totalAmount: 150,
        business: {
            businessId: "business4",
            nameOfBusiness: "Business 4",
            businessLogoUrl: "https://example.com/logo4.jpg"
        },
        user: {
            userid: "user4",
            userDisplayName: "User 4",
            userImageUrl: "https://example.com/user4.jpg"
        },
        createdOn: "2023-04-07T18:30:00Z",
        status: "ACTIVE"
    },
    {
        adsId: "ad5",
        nameOfAdsProduct: "Product 5",
        adType: "STANDARD",
        duration: "1DAY",
        totalAmount: 75,
        business: {
            businessId: "business5",
            nameOfBusiness: "Business 5",
            businessLogoUrl: "https://example.com/logo5.jpg"
        },
        user: {
            userid: "user5",
            userDisplayName: "User 5",
            userImageUrl: "https://example.com/user5.jpg"
        },
        createdOn: "2023-04-06T10:45:00Z",
        status: "CANCELLED"
    },
    {
        adsId: "ad6",
        nameOfAdsProduct: "Product 6",
        adType: "PREMIUM",
        duration: "1MONTH",
        totalAmount: 250,
        business: {
            businessId: "business6",
            nameOfBusiness: "Business 6",
            businessLogoUrl: "https://example.com/logo6.jpg"
        },
        user: {
            userid: "user6",
            userDisplayName: "User 6",
            userImageUrl: "https://example.com/user6.jpg"
        },
        createdOn: "2023-04-05T22:15:00Z",
        status: "ENDED"
    },
    {
        adsId: "ad7",
        nameOfAdsProduct: "Product 7",
        adType: "FEATURED",
        duration: "7DAYS",
        totalAmount: 100,
        business: {
            businessId: "business7",
            nameOfBusiness: "Business 7",
            businessLogoUrl: "https://example.com/logo7.jpg"
        },
        user: {
            userid: "user7",
            userDisplayName: "User 7",
            userImageUrl: "https://example.com/user7.jpg"
        },
        createdOn: "2023-04-04T16:30:00Z",
        status: "ACTIVE"
    },
    {
        adsId: "ad8",
        nameOfAdsProduct: "Product 8",
        adType: "STANDARD",
        duration: "1DAY",
        totalAmount: 50,
        business: {
            businessId: "business8",
            nameOfBusiness: "Business 8",
            businessLogoUrl: "https://example.com/logo8.jpg"
        },
        user: {
            userid: "user8",
            userDisplayName: "User 8",
            userImageUrl: "https://example.com/user8.jpg"
        },
        createdOn: "2023-04-03T09:00:00Z",
        status: "CANCELLED"
    },
]
