//import react router dom
import { Routes, Route } from "react-router-dom";

//import view homepage
import Home from "../views/home.jsx";

//import view surah index
import PostIndex from "../views/index.jsx";

import Detail from "../views/detail.jsx";
import JadwalSholat from "../views/jadwal-sholat.jsx";

function RoutesIndex() {
  return (
    <Routes>
      {/* route "/" */}
      <Route path="/" element={<Home />} />

      {/* route "/surah" */}
      <Route path="/surah" element={<PostIndex />} />
      <Route path="/detail/:nomor" element={<Detail />} />
      <Route path="/jadwal-sholat" element={<JadwalSholat />} />
    </Routes>
  );
}

export default RoutesIndex;
