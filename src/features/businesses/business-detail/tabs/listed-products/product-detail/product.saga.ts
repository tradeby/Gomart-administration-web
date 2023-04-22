import {call, put, takeLatest} from "redux-saga/effects";
import {saveProductFailure, saveProductStart, saveProductSuccess} from "./product.slice";
import {db, storage} from "../../../../../../shared/firebase/firestore";
import {collection, doc, serverTimestamp, setDoc, Timestamp} from "firebase/firestore";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {ErrorResult} from "../../../../../debug/debug.slice";
import {Product} from "../../../../../../shared/models";
import {getStorage} from "@firebase/storage";
import {fetchListedProductsStart} from "../listed-products.slice";
import {onShowFlag} from "../../../../../../shared/flag/flag-slice";


const uploadFileAndGetURL = async (file: File, product: Product) => {
    console.log('attempting to upload file ', `Businesses/${product.businessId}/${product.id}/${file.name}`)
    const storage = getStorage();
    const storageRef = ref(storage, `Businesses/${product.businessId}/${product.id}/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
};

// Saga worker function to save a product
function* handleSaveProduct(action: ReturnType<typeof saveProductStart>): any {
    try {
        const product: Product = action.payload.product;
        const files: File[] = action.payload.images;

        console.log('About to start uploading files');
        //upload files and get urls

        const uploadURLs: string[] = [];
        for (let i = 0; i < files.length; i++) {
            const url = yield call(uploadFileAndGetURL, files[i], product)
            uploadURLs.push(url);
        }
        console.log('uploaded all files and our urls are', uploadURLs);
        //append productImageUrls = urls.
        // Call the Firestore API to save the product
        const productRef = doc(collection(db, "BUSINESSES/" + product.businessId + "/PRODUCTS"), product.id);
        yield setDoc(productRef, {
            ...product,
            productImageUrls: uploadURLs,
            createdOn: serverTimestamp() as Timestamp,
            updatedOn: serverTimestamp() as Timestamp
        }, {merge: true});
        yield put(saveProductSuccess(product));
        yield put(fetchListedProductsStart({businessId: product.businessId as string}));
        //yield reload the product. or products lists so that we can have the updated list.
    } catch (error) {
        const err0r = error as { message: string };
        const errorResult: ErrorResult = {message: err0r.message, status: 500}
        yield put(saveProductFailure(errorResult));
        yield put(onShowFlag({
            title: "Error encountered while creating new product/service",
            flagType: 'ERROR',
            description: errorResult.status + (errorResult?.message as string)
        }))
    }
}

// Saga watcher function
export function* productSaga() {
    // yield takeLatest(getProductStart.type, handleLoadProduct);
    yield takeLatest(saveProductStart.type, handleSaveProduct);
}
