import React from "react";
import axios from "axios";
import { useState } from "react";

const MenuHeader = () => {
  const [data, setData] = useState([]);
  // https://tasken.io/api/api/landingpage/tenant/8dc6957b-4869-4877-a511-6563f990d59e?v=1688011765685
  // axios.get('https://tasken.io/templates/landing-page-logged-in.html?v=1688022485978')
  // .then(response => {
  //   console.log(response.data); // Process the HTML content
  // })
  // .catch(error => {
  //   console.error(error); // Handle any errors
  // });


  return <div>MenuHeader</div>;
};

export default MenuHeader;
