import { Link } from "react-router-dom";
import Routes from "../routes";
import Footer from "../views/footer";

export default function Home() {
  return (
    <>
      <div className="d-flex flex-column justify-content-center px-4 py-5 text-center" style={{ minHeight: "83vh" }}>
        <img className="d-block mx-auto mb-4" src="/logo.png" alt="" width="200" height="180" />
        <h1 className="display-5 fw-bold">Al-Qur'an Online</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">Baca Al-Qur'an secara Online dimana dan kapanpun saja dengan mudah.</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/surah" className="btn btn-lg btn-secondary">
              Baca Quran
            </Link>
            <Link to="/jadwal-sholat" className="btn btn-lg btn-secondary">
              Jadwal Shalat
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
