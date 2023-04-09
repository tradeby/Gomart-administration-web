import ProductLayout from "./core/layout/layout";
import React from "react";
import {AuthWrapper} from "./features/authentication/authentication";


function App() {
    return  <AuthWrapper><ProductLayout></ProductLayout></AuthWrapper>;
}

export default App;
