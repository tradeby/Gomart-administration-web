import {takeLatest, put, call} from 'redux-saga/effects';
import {updateBusinessRequest, updateBusinessSuccess, updateBusinessFailure} from './update-business.slice';
import {ErrorResult} from "../../../../debug/debug.slice";
import {Business, Product} from "../../../../../shared/models";
import {collection, doc, serverTimestamp, setDoc, Timestamp} from "firebase/firestore";
import {db} from "../../../../../shared/firebase/firestore";
import {onShowFlag} from "../../../../../shared/flag/flag-slice";
import {loadBusinessStart, reLoadBusinessStart} from "../../business-detail.slice";
import {getStorage} from "@firebase/storage";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";

const uploadFileAndGetURL = async (file: File, business: Business) => {
    console.log('attempting to upload file ', `Businesses/${business.id}/${file.name}`)
    const storage = getStorage();
    const storageRef = ref(storage, `Businesses/${business.id}/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
};

function* handleUpdateBusinessRequest(action: ReturnType<typeof updateBusinessRequest>): any {
    try {
        //get action parameter/prop
        const businessProp: Business = action.payload.business;
        const galaryPhotosFiles = action.payload.gallaryPhotos;
        const logoPhotoFile = action.payload.logoFile;
        const coverPhotoFile = action.payload.coverPhotoFile;
        //upload images, logo, coverPhoto,
        const uploadURLs: string[] = [];
        if (galaryPhotosFiles) {
            for (let i = 0; i < galaryPhotosFiles.length; i++) {
                const url = yield call(uploadFileAndGetURL, galaryPhotosFiles[i], businessProp)
                uploadURLs.push(url);
            }
        }


        let logoUrl = businessProp.logoUrl;
        if (logoPhotoFile) {
            logoUrl = yield call(uploadFileAndGetURL, logoPhotoFile, businessProp);
        }

        let coverUrl = businessProp.coverPhotoUrl;
        if (coverPhotoFile) {
            coverUrl = yield call(uploadFileAndGetURL, coverPhotoFile, businessProp);
        }

        //update businessData with urls, (logo, coverPhoto and gallary images)
        const busData = {
            ...businessProp,
            logoUrl: logoUrl,
            coverPhotoUrl: coverUrl,
            galleryPhotos: businessProp.galleryPhotos.concat(uploadURLs),

        }
        //build collections and document firestore ref and save to firestore.
        const productRef = doc(collection(db, "BUSINESSES/"), businessProp.id);
        yield setDoc(productRef, {
            ...(JSON.parse(JSON.stringify(busData))),
            updatedOn: serverTimestamp() as Timestamp
        }, {merge: true});
        // Dispatch success action
        yield put(reLoadBusinessStart({businessId: businessProp.id}));
        yield put(updateBusinessSuccess());

        //dispatch load business
        yield put(onShowFlag({
            title: "Business updated successfully",
            flagType: 'SUCCESS',
            description: 'You have successfully updated business with Id' + businessProp.id
        }))
    } catch (error) {
        // Dispatch failure action with error message
        const err0r = error as { message: string };
        const errorResult: ErrorResult = {message: err0r.message, status: 500}
        yield put(updateBusinessFailure(errorResult));
        yield put(onShowFlag({
            title: "Error encountered while updating business",
            flagType: 'ERROR',
            description: errorResult.status + (errorResult?.message as string)
        }))
    }
}


export function* watchUpdateBusinessRequest() {
    yield takeLatest(updateBusinessRequest.type, handleUpdateBusinessRequest);
}
