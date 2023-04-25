import firebase from "firebase/compat";
import User = firebase.User;

export interface AppUser extends User{
    uid: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    providerData: ProviderData[];
    stsTokenManager: StsTokenManager;
    createdAt: string;
    lastLoginAt: string;
}

interface ProviderData {
    providerId: string;
    uid: string;
    displayName: string | null;
    email: string;
    phoneNumber: string | null;
    photoURL: string | null;
}

interface StsTokenManager {
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
}
