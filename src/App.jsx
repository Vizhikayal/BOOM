
import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./Component/Login/Login";
import Header from "./Component/Header/Header";
import Sidebar from "./Component/Sidebar/sidebar"; // Corrected import
import Table from "./Component/Table/Table";
import Form from "./Component/Form/Form";
import Signup from "./Component/Signup/Signup";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/table" /> : <Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/signup" element={<Signup />} />
        {isLoggedIn && (
          <Route
            path="/*"
            element={
              <div className="content">
                <div className="App" style={{ gap: 15 }}>
                  <div className="side" style={{ position: "fixed" }}>
                    <Sidebar setIsLoggedIn={setIsLoggedIn} />
                  </div>
                  <div className="tool flex-column">
                    <Header />
                    <Routes>
                      <Route path="/table" element={<Table />} />
                      <Route path="/form" element={<Form />} />
                    </Routes>
                  </div>
                </div>
              </div>
            }
          />
        )}
      </Routes>
    </BrowserRouter>
  );
}




// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   console.log("isLoggedIn",isLoggedIn);
//   useEffect(() => {
//     if (token) {
//       setIsLoggedIn(true);
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, []); 
  
  
//   return (
//     <BrowserRouter>
//       {!isLoggedIn ? (
//         <Routes>
//           <Route
//             path="/"
//             element={isLoggedIn ? <Navigate to={"/table"} />  :  <Login onLogin={() => setIsLoggedIn(true)} />}
//           />
//           <Route path="/signup" element={<Signup />} />
//         </Routes>
//       ) : (
//         <div className="content">
//           <div className="App" style={{ gap: 15 }}>
//             <div className="side" style={{ position: "fixed" }}>
//               <Sidebar setIsLoggedIn={setIsLoggedIn} />
//             </div>
//             <div className="tool flex-column">
//               <Header />
//               <Routes>
//                 <Route path="/table" element={<Table />} />
//                 <Route path="/form" element={<Form />} />
//                 {/* <Route path="/table" element={<Table />} /> */}
//               </Routes>
//             </div>
//           </div>
//         </div>
//       )}
//     </BrowserRouter>
//   );
// }

export default App;


// import React, { useEffect, useState } from 'react';
// import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
// import Login from "./Component/Login/Login";
// import Header from "./Component/Header/Header";
// import Sidebar from "./Component/Sidebar/sidebar"; 
// import Table from "./Component/Table/Table";
// import Form from "./Component/Form/Form";
// import Signup from "./Component/Signup/Signup";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

  
//   useEffect(() => {
//     const userLoggedIn = localStorage.getItem('userLoggedIn'); 
//     if (!userLoggedIn) {
//       setIsLoggedIn(false);
//     } else {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   return (
//     <BrowserRouter>
//       {!isLoggedIn ? (
//         <Routes>
//           <Route
//             path="/"
//             element={<Login onLogin={() => setIsLoggedIn(true)} />}
//           />
//           <Route path="/signup" element={<Signup />} />
//         </Routes>
//       ) : (
//         <div className="content">
//           <div className="App" style={{ gap: 15 }}>
//             <div className="side" style={{ position: "fixed" }}>
//               <Sidebar setIsLoggedIn={setIsLoggedIn} />
//             </div>
//             <div className="tool flex-column">
//               <Header />
//               <Routes>
//                 <Route path="/table" element={<Table />} />
//                 <Route path="/form" element={<Form />} />
//               </Routes>
//             </div>
//           </div>
//         </div>
//       )}
//     </BrowserRouter>
//   );
// }

// export default App;
