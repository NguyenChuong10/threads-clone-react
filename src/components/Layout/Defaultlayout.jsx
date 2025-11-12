import Header from "../Header/Header";
import { Outlet } from "react-router";

function Defaultlayout() {
    return (
        <div >
            <Header/>
                <main className="w-screen min-h-screen m-0 p-0">
                    <Outlet></Outlet>
                </main>
            {/* Bottom Navigation Bar  */}
            
        </div>
    );
}

export default Defaultlayout;