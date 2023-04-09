import {Route, Routes} from "react-router-dom";

export function MainRoutes() {
    return <Routes>
        <Route path="/" element={<p>hello world router home</p>}></Route>
        {/*<Route path="*" element={<NotFound404/>}/>*/}
    </Routes>;
}
