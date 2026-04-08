export interface AppFeedbackModel {
    id: string;
    submittedBy: SubmttedBy;
    message: string;
    lastSignedIn: string;
    createdOn: string;
    updatedOn: string;
    role: string;
}

export interface SubmttedBy {
    uid: string,
    email: string,
    displayName: string,
    phoneNumber: string,
    photoUrl: string,


}


interface Business {
    businessId: string,
    nameOfBusiness: string,
    businessLogoUrl: string,

}

interface User {
    userid: string,
    userDisplayName: string,
    userImageUrl: string
}