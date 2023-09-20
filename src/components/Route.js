import React from 'react';
import { Routes, Route } from "react-router-dom";
import Form from './Form'
import FormData from './FormData'
import AdminLogin from './AdminLogin';



function RoutesPage() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Form />} />
                <Route path="/FormData" element={<FormData />} />
                <Route path="/AdminLogin" element={<AdminLogin />} />
            </Routes>

        </div>
    )
}

export default RoutesPage
