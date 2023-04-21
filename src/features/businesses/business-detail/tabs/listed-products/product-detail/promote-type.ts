export interface PromoteType {
    id: string;
    title: string;
    color: string;
    description: string;
    supportedPeriods: PromotionPeriod[]
}

export interface PromotionPeriod {
    id: string;
    title: string;
    periodInDays: number;
    costAmount: number;
}


export const PromoteTypeList: PromoteType[] = [
    {
        id: '1',
        title: 'Standard',
        color:'#EDEDED',
        description: 'Your listings will appear in  regular searches and recommendations',
        supportedPeriods: []
    },
    {
        id: '2',
        title: 'Featured',
        color:'#FFC835',
        description: 'Let your ad be on top of the listings',
        supportedPeriods: [
            {
                id: '7DAYS',
                title: '7 days',
                periodInDays: 7,
                costAmount: 900
            },
            {
                id: '14DAYS',
                title: '14 days',
                periodInDays: 4,
                costAmount: 1800
            },
            {
                id: '1MONTH',
                title: '1 month',
                periodInDays: 20,
                costAmount: 2999
            }
        ]
    },
    {
        id: '3',
        title: 'Premium',
        color: '#C3E9D2',
        description: 'Let your ad be on top of listings and shown in home with boosts in recommendation',
        supportedPeriods: [

            {
                id: '1MONTH',
                title: '1 month',
                periodInDays: 30,
                costAmount: 4800
            },
            {
                id: '3MONTH',
                title: '3 months',
                periodInDays: 90,
                costAmount: 6000
            }
        ]
    }
]
