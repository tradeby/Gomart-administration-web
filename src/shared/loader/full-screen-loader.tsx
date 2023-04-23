import React from "react";

export function FullScreenLoader(){

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-900 opacity-25"  style={{zIndex:'900'}}></div>

            <div className="bg-white p-6 rounded-md " style={{zIndex:'1000'}}>
                <div className="flex justify-center items-center mb-4">

                                        <span
                                            className="animate-spin mr-2 h-5 w-5 border-t-2 border-blue-500 border-solid rounded-full"></span>
                    <span className="text-gray-900 text-lg">Saving...</span>
                </div>
                <p className="text-gray-600">Please wait while saving your changes...</p>
            </div>
        </div>
    );
}

