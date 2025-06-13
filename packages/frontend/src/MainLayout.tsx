import Header from "./components/Header";
import { Outlet } from "react-router";

interface propType {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MainLayout(props : propType) {
  return (
    <div>
      <Header isDark={props.isDark} setIsDark={props.setIsDark}/>
      <div style={{ padding: "0 2em" }}>
        <Outlet />
      </div>
    </div>
  );
}
