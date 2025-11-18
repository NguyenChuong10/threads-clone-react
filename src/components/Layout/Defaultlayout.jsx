import Header from "../Header/Header";
import { Outlet } from "react-router";
import Footer from "../NavigatorFooter/Footer"
function Defaultlayout() {
    return (
        <div >
            <Header/>
                <main className="">
                    <Outlet></Outlet>
                </main>
            <Footer/>
        </div>
    );
}

export default Defaultlayout;