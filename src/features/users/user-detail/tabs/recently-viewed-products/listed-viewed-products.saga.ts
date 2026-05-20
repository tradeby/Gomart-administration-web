import {put, call, takeLatest} from 'redux-saga/effects';
import {
    fetchListedViewedProductsStart,
    fetchListedViewedProductsSuccess,
    fetchListedViewedProductsFailure,
    reFetchListedViewedProductsStart, deleteViewedProduct
} from "./listed-viewed-products.slice";
import {collection, doc, deleteDoc, getDocs,} from "firebase/firestore";
import {db} from "../../../../../shared/firebase/firestore";
import {ErrorResult} from "../../../../debug/debug.slice";
import {PayloadAction} from "@reduxjs/toolkit";
import {Business, Product} from "../../../../../shared/models";
import {onShowFlag} from "../../../../../shared/flag/flag-slice";


// Define the saga worker function
function* fetchProductsSaga(action: PayloadAction<{ uid: string }>): any {
    try {
        const uid = action.payload.uid; // Get the businessId from the action payload
        // Get the reference to the parent document
        const parentDocumentRef = doc(db, 'USERS', uid);
        console.log("RECENTLY VIEWED PRODUCTS IN REPO");
        const querySnapshot = yield getDocs(collection(parentDocumentRef, 'RECENT_VIEWED_PRODUCTS')); // Replace 'Users' with your Firestore collection name
        const products: Product[] = querySnapshot.docs.map((doc: { data: () => Product; id: string }) => {
            console.log("PRODUCT: ", doc.data());
            return {...doc.data(), id: doc.id};

        }); // Extract businesses data from snapshot
        // console.log("PRODUCTS: ", products);
        yield put(fetchListedViewedProductsSuccess(products)); // Dispatch "fetchListedViewedProductsSuccess" action with fetched products
    } catch (error) {
        const err0r = error as { message: string };
        const errorResult: ErrorResult = {message: err0r.message, status: 500}
        yield put(fetchListedViewedProductsFailure(errorResult)); // Dispatch "fetchListedViewedProductsFailure" action with error message
    }
}

function* deleteProductsSaga(action: PayloadAction<{ uid: string, productId: string }>): any {
    try {
        const uid = action.payload.uid; // Get the uid from the action payload
        const productId = action.payload.productId;
        // Get the reference to the parent document
        const documentRef = doc(db, `USERS/${uid}/RECENT_VIEWED_PRODUCTS`, productId);
        console.log("RECENTLY VIEWED PRODUCTS IN REPO");
        const querySnapshot = yield deleteDoc(documentRef); // Replace 'Users' with your Firestore collection name

        yield put(fetchListedViewedProductsStart({uid: uid})); // Dispatch "fetchListedViewedProductsStart" action with fetched products
        yield put(onShowFlag({
            title: "Deleted product/service successfully",
            flagType: 'SUCCESS',
            description: 'You have successfully deleted a new product with Id' + productId
        }))
    } catch (error) {
        const err0r = error as { message: string };
        const errorResult: ErrorResult = {message: err0r.message, status: 500}
       // yield put(fetchListedViewedProductsFailure(errorResult)); // Dispatch "fetchListedViewedProductsFailure" action with error message
        yield put(onShowFlag({
            title: "Error encountered while deleting product/service",
            flagType: 'ERROR',
            description: errorResult.status + (errorResult?.message as string)
        }))
    }
}

// Define the saga watcher function
function* listedViewedProductsSaga() {
    yield takeLatest(fetchListedViewedProductsStart.type, fetchProductsSaga); // Watch for "fetchListedViewedProductsStart" action and run the saga worker
    yield takeLatest(reFetchListedViewedProductsStart.type, fetchProductsSaga); // Watch for "fetchListedViewedProductsStart" action and run the saga worker
    yield takeLatest(deleteViewedProduct.type, deleteProductsSaga); // Watch for "fetchListedViewedProductsStart" action and run the saga worker
}

export default listedViewedProductsSaga;
