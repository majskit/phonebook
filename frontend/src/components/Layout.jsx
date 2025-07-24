import { Outlet } from "react-router-dom";
import AppBar from "./AppBar/AppBar";
import { Suspense } from "react";
import Loader from "./Loader/Loader";
import Footer from "./Footer/Footer";

const Layout = () => {
  return (
    <>
      <AppBar />
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
