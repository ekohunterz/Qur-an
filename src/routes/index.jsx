//import react router dom
import { Routes, Route } from "react-router-dom";

//import view homepage
import Home from "../views/home.jsx";

//import view surah index
import PostIndex from "../views/index.jsx";

import Detail from "../views/detail.jsx";

function RoutesIndex() {
  return (
    <Routes>
      {/* route "/" */}
      <Route path="/" element={<Home />} />

      {/* route "/surah" */}
      <Route path="/surah" element={<PostIndex />} />
      <Route path="/detail/:nomor" element={<Detail />} />
    </Routes>
  );
}

export default RoutesIndex;
