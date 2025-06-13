import { useEffect, useState } from "react";
import GroceryList from "./components/GroceryList/GroceryList";
import RecipeList from "./components/RecipeList/RecipeList";
import { LoginPage } from "./components/Login/LoginPage";
import { Routes, Route } from "react-router";
import { MainLayout } from "./MainLayout";
import { ValidRoutes } from "../../backend/src/shared/ValidRoutes.ts";
import { ProtectedRoute } from "./ProtectedRoute.tsx";



function App() {
    const [isDark, setIsDark] = useState(false);
    const [authToken, setAuthToken] = useState("");
    const [userId, setUserId] = useState("");

    if (authToken  == userId) {
        console.log("hi");
    }

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.style.setProperty('--nav-bg-color', '#2d1a0a');
            root.style.setProperty('--nav-text-color', '#fdf8f0');
            root.style.setProperty('--main-bg-color', '#3a2d1a');
            root.style.setProperty('--list-bg-color', '#71541e');
            root.style.setProperty('--list-text-color', '#fdf8f0');
        }
        else {
            root.style.setProperty('--nav-bg-color', '#a86523');
            root.style.setProperty('--nav-text-color', '#fcfaf5');
            root.style.setProperty('--main-bg-color', '#fad59a');
            root.style.setProperty('--list-bg-color', '#eeb33e');
            root.style.setProperty('--list-text-color', 'black');
        }}
    , [isDark]);

    return (
        <Routes>
            <Route element={<MainLayout isDark={isDark} setIsDark={setIsDark}/>}>
                <Route path={ValidRoutes.HOME} element={<ProtectedRoute authToken={authToken}><GroceryList authToken={authToken}/></ProtectedRoute>} />
                <Route path={ValidRoutes.RECIPES} element={<ProtectedRoute authToken={authToken}><RecipeList authToken={authToken}/></ProtectedRoute>} />
                {/* <Route path="/test" element={<RecipeList authToken={authToken}/>}/> */}
                <Route path={ValidRoutes.LOGIN} element={<LoginPage setAuthToken={setAuthToken} setUserId={setUserId}/>} />
                <Route path={ValidRoutes.REGISTER} element={<LoginPage isRegistering={true} setAuthToken={setAuthToken} setUserId={setUserId}/>} />
            </Route>
        </Routes>
    );
}

export default App;
