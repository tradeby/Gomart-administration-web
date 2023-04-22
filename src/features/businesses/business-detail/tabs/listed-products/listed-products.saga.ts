import {put, call, takeLatest} from 'redux-saga/effects';
import {
    fetchListedProductsStart,
    fetchListedProductsSuccess,
    fetchListedProductsFailure,
    reFetchListedProductsStart, deleteProduct
} from "./listed-products.slice";
import {collection, doc, deleteDoc, getDocs,} from "firebase/firestore";
import {db} from "../../../../../shared/firebase/firestore";
import {ErrorResult} from "../../../../debug/debug.slice";
import {loadBusinessFailure, loadBusinessSuccess} from "../../business-detail.slice";
import {PayloadAction} from "@reduxjs/toolkit";
import {Business, Product} from "../../../../../shared/models";
import {onShowFlag} from "../../../../../shared/flag/flag-slice";


// Define the saga worker function
function* fetchProductsSaga(action: PayloadAction<{ businessId: string }>): any {
    try {
        const businessId = action.payload.businessId; // Get the businessId from the action payload
        // Get the reference to the parent document
        const parentDocumentRef = doc(db, 'BUSINESSES', businessId);

        const querySnapshot = yield getDocs(collection(parentDocumentRef, 'PRODUCTS')); // Replace 'Users' with your Firestore collection name
        const products: Product[] = querySnapshot.docs.map((doc: { data: () => Product; id: string }) => {
            return {...doc.data(), id: doc.id};

        }); // Extract businesses data from snapshot

        yield put(fetchListedProductsSuccess(products)); // Dispatch "fetchProductsSuccess" action with fetched products
    } catch (error) {
        const err0r = error as { message: string };
        const errorResult: ErrorResult = {message: err0r.message, status: 500}
        yield put(fetchListedProductsFailure(errorResult)); // Dispatch "fetchProductsFailure" action with error message
    }
}

function* deleteProductsSaga(action: PayloadAction<{ businessId: string, productId: string }>): any {
    try {
        const businessId = action.payload.businessId; // Get the businessId from the action payload
        const productId = action.payload.productId;
        // Get the reference to the parent document
        const documentRef = doc(db, `BUSINESSES/${businessId}/PRODUCTS`, productId);

        const querySnapshot = yield deleteDoc(documentRef); // Replace 'Users' with your Firestore collection name

        yield put(fetchListedProductsStart({businessId: businessId})); // Dispatch "fetchProductsSuccess" action with fetched products
        yield put(onShowFlag({
            title: "Deleted product/service successfully",
            flagType: 'SUCCESS',
            description: 'You have successfully deleted a new product with Id' + productId
        }))
    } catch (error) {
        const err0r = error as { message: string };
        const errorResult: ErrorResult = {message: err0r.message, status: 500}
       // yield put(fetchListedProductsFailure(errorResult)); // Dispatch "fetchProductsFailure" action with error message
        yield put(onShowFlag({
            title: "Error encountered while deleting product/service",
            flagType: 'ERROR',
            description: errorResult.status + (errorResult?.message as string)
        }))
    }
}

// Define the saga watcher function
function* listedProductSaga() {
    yield takeLatest(fetchListedProductsStart.type, fetchProductsSaga); // Watch for "fetchProductsStart" action and run the saga worker
    yield takeLatest(reFetchListedProductsStart.type, fetchProductsSaga); // Watch for "fetchProductsStart" action and run the saga worker
    yield takeLatest(deleteProduct.type, deleteProductsSaga); // Watch for "fetchProductsStart" action and run the saga worker
}

export default listedProductSaga;
