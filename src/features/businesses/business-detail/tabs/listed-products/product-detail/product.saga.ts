import {takeLatest, put, call} from "redux-saga/effects";
import {
    /* getProductStart,
     getProductSuccess,
     getProductFailure,*/
    saveProductStart,
    saveProductSuccess,
    saveProductFailure
} from "./product.slice";
import {db} from "../../../../../../shared/firebase/firestore";
import {collection, doc, getDoc, setDoc, serverTimestamp} from "firebase/firestore";
import {ErrorResult} from "../../../../../debug/debug.slice";
import {Product} from "../../../../../../shared/models";
import { Timestamp } from "firebase/firestore";


/*
// Simulated async API call
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// Saga worker function to load a product
function* handleLoadProduct(action: ReturnType<typeof getProductStart>): any {
    try {
        // Call the Firestore API to load the product
        const productRef = doc(collection(db, "products"), action.payload);
        const productSnapshot = yield getDoc(productRef);
        if (productSnapshot.exists()) {
            const productData = productSnapshot.data();
            yield put(getProductSuccess(productData));
        } else {
            const errorResult: ErrorResult = {message: "Product not found", status: 500}
            yield put(getProductFailure(errorResult));
        }
    } catch (error) {
        const err0r = error as { message: string };
        const errorResult: ErrorResult = {message: err0r.message, status: 500}
        yield put(getProductFailure(errorResult));
    }
}
*/

// Saga worker function to save a product
function* handleSaveProduct(action: ReturnType<typeof saveProductStart>): any {
    try {
        const product: Product = action.payload.product;
        // Call the Firestore API to save the product
        const productRef = doc(collection(db, "BUSINESSES/" + product.businessId + "/PRODUCTS"), product.id);
        yield setDoc(productRef, {
            ...product,
            createdOn: serverTimestamp() as Timestamp,
            updatedOn: serverTimestamp() as Timestamp
        }, {merge: true});
        yield put(saveProductSuccess(product));
        //yield reload the product. or products lists so that we can have the updated list.
    } catch (error) {
        const err0r = error as { message: string };
        const errorResult: ErrorResult = {message: err0r.message, status: 500}
        yield put(saveProductFailure(errorResult));
    }
}

// Saga watcher function
export function* productSaga() {
    // yield takeLatest(getProductStart.type, handleLoadProduct);
    yield takeLatest(saveProductStart.type, handleSaveProduct);
}
