import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./Layouts/MainLayout";
import { Frontpage } from "./pages/Frontpage";
import { SingleNews } from "./pages/singleNews";
import { Login } from "./pages/Login";
import { UserContextProvider } from "./context/userContext";
import { Countries } from "./pages/Countries";
import { Cities } from "./pages/Cities";
import { Hotels } from "./pages/Hotels";
import { SingleHotel } from "./pages/SingleHotel";
import { Signup } from "./pages/SignUp";
import { Review } from "./pages/Review";
import { Reservation } from "./pages/Reservation";
import { Rooms } from "./pages/Rooms";
import { PageNotFound } from "./pages/PageNotFound";

function App() {
  return (
    <>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Frontpage />}></Route>
              <Route path="/news/:id" element={<SingleNews />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path='/hotels' element={<Countries/>}></Route>
              <Route path='/hotels/:slug' element={<Cities/>}></Route>
              <Route path='/hotels/:slug/:cityslug' element={<Hotels/>}></Route>
              <Route path='/hotels/:slug/:cityslug/:hotelslug' element={<SingleHotel/>}></Route>
              <Route path="/SignUp" element={<Signup/>}></Route>
              <Route path="/hotels/:slug/:cityslug/:hotelslug/review" element={<Review/>}></Route>
              <Route path="/reservation" element={<Reservation/>}></Route>
              <Route path='/rooms' element={<Rooms/>}></Route>
              <Route path='/*' element={<PageNotFound/>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

export default App;
