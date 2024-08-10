import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Explore from './pages/Explore';
import Offers from './pages/Offers';
import Category from './pages/Category';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import CreateListing from './pages/CreateListing.jsx';
import EditListing from './pages/EditListing';
import Listing from './pages/Listing';
import Contact from './pages/Contact';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<Offers />} />
          {/* categoryName can be rent or sale */}
          <Route path="/category/:categoryName" element={<Category />} />
          {/* we don't want to access unless they're logged in */}
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route
            path="/category/:categoryName/:listingId"
            element={<Listing />}
          />
          <Route path="/edit-listing/:listingId" element={<EditListing />} />
          <Route path="/contact/:landlordId" element={<Contact />} />
        </Routes>
        <Navbar />
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Navbar from './components/Navbar';
// import PrivateRoute from './components/PrivateRoute';
// import Explore from './pages/Explore';
// import Offers from './pages/Offers';
// // import Category from './pages/Category';
// import Profile from './pages/Profile';
// import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
// import ForgotPassword from './pages/ForgotPassword';
// // import CreateListing from './pages/CreateListing';
// // import EditListing from './pages/EditListing';
// // import Listing from './pages/Listing';
// // import Contact from './pages/Contact';

// function App() {
//   return (
//     <>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Explore />} />
//           <Route path="/offers" element={<Offers />} />
//           {/* <Route path='/category/:categoryName' element={<Category />} /> */}
//           {/* we don't want to access unless they're logged in */}
//           <Route
//             path="/profile"
//             element={
//               <PrivateRoute>
//                 {' '}
//                 <Profile />{' '}
//               </PrivateRoute>
//             }
//           />
//           {/* <Route path="/profile" element={<Profile />} /> */}
//           <Route path="/sign-in" element={<SignIn />} />
//           <Route path="/sign-up" element={<SignUp />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           {/* <Route path='/create-listing' element={<CreateListing />} />
//           <Route path='/edit-listing/:listingId' element={<EditListing />} />
//           <Route
//             path='/category/:categoryName/:listingId'
//             element={<Listing />}
//           />
//           <Route path='/contact/:landlordId' element={<Contact />} /> */}
//         </Routes>
//         <Navbar />
//       </Router>

//       <ToastContainer />
//     </>
//   );
// }

// export default App;
