import {call, put, takeLatest} from "redux-saga/effects";
import {onErrorLoadingSampleUserData, onLoadSampleUserData, onUpdateSampleUserData} from "./debug.slice";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../shared/firebase/firestore";

function fetchSampleDataFirestore() {
    return getDocs(collection(db, "susers"))
        .then((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
            return {response: data};// array of plain JavaScript objects of the data
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

}

function* loadSampleDataFunction(action: any) {
    try {
        const {response} = yield call(fetchSampleDataFirestore);

        console.log('our response is', response);
        if (response) {
            yield put(onUpdateSampleUserData(response));
        } else {
            // figure out a way to detect firestore errors and display them
            /*const newError = error['response'] as {
                errors: GraphQLError[]
                extensions?: any
                status: number
            };*/
            yield put(onErrorLoadingSampleUserData({status: 500, message: "Network error"}))
            //yield put(onErrorLoadingSampleUserData({status: newError.status, message: newError.errors[0].message}))
        }
    } catch (e) {
        yield put(onErrorLoadingSampleUserData({status: 500, message: "Network error"}))
    }
}


export function* debugSaga() {
    yield takeLatest(onLoadSampleUserData, loadSampleDataFunction);
}
