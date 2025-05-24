import { useEffect, useState } from "react";
import GroceryList from "./components/GroceryList/GroceryList";
import RecipeList from "./components/RecipeList/RecipeList";
import { Routes, Route } from "react-router";


function App() {
    const [isDark, setIsDark] = useState(false);

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
            <Route path="/index" element={<GroceryList isDark={isDark} setIsDark={setIsDark}/>} />
            <Route path="/recipes" element={<RecipeList isDark={isDark} setIsDark={setIsDark}/>} />
        </Routes>
    );
}

export default App;
