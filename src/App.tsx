import { Route, Routes } from 'react-router-dom';
import { private_routes, public_routes } from './routes/routes';
import { useEffect, useState } from 'react';
import request from './Utils/request';

function App() {
  // const userId = localStorage.getItem("Id");
  const [tokenValid, setTokenValid] = useState(true);
  useEffect(() => {
    request.get("/user/check-jwt").then(() => {
      setTokenValid(true);
    }).catch((e) => {
      console.log(e);
      setTokenValid(false);
    })
  }, [tokenValid])

  // console.log(tokenValid);

  return (
    <Routes>
      {tokenValid ? (
        private_routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))
      ) : (
        public_routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))
      )}
      {/* <Route path="/login" element={<Login />} /> */}
    </Routes>
  );

}

export default App;

