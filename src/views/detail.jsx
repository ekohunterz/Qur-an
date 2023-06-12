import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Card, Col, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Footer from "./footer";
import { IconMapPinFilled, IconList, IconArrowBigLeftFilled, IconArrowBigRightFilled } from "@tabler/icons-react";
import ReactAudioPlayer from "react-audio-player";

function Detail(props) {
  const [surah, setSurah] = useState([]);
  const { nomor } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`https://equran.id/api/v2/surat/${nomor}`);
        setSurah(response.data.data);
        setIsLoading(false);
        // console.log(response.data.data);
      } catch (error) {
        console.log("Error:", error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, [nomor]);

  return (
    <>
      <Container>
        <Row className="mt-5">
          {isLoading ? (
            // Menampilkan indikator loading saat data sedang dimuat
            <Col md={12} className="text-center mt-5 vh-100">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Col>
          ) : surah && Object.keys(surah).length > 0 ? (
            <>
              {/* // Menampilkan detail surah jika data tersedia */}
              <Col md={12} className="mb-4">
                <Card className="border-0 rounded-3 shadow-sm" style={{ backgroundColor: "#F9F7F5" }}>
                  <Card.Title className="p-3 mx-auto">
                    <h1>
                      <span className="fs-3 me-3">({surah.arti}) -</span>
                      {surah.nama}
                    </h1>
                  </Card.Title>
                  <Card.Body>
                    <div dangerouslySetInnerHTML={{ __html: surah.deskripsi }}></div>
                    <br></br>
                    <p>
                      <IconList /> Jumlah Ayat: {surah.jumlahAyat}
                    </p>
                    <p>
                      <IconMapPinFilled /> Tempat Turun: {surah.tempatTurun}
                    </p>
                  </Card.Body>
                  <Card.Footer>
                    <Row>
                      <Col md={4} className="d-flex align-self-center text-md-left justify-content-center justify-content-md-start">
                        {/* Tombol Surah Sebelumnya */}
                        <Link to={`/detail/${surah.suratSebelumnya["nomor"]}`} className="btn btn-sm btn-dark text-decoration-none text-light">
                          <IconArrowBigLeftFilled className="mx-auto" /> Surah Sebelumnya
                        </Link>
                      </Col>
                      <Col md={4} className="d-flex my-2 align-self-center justify-content-center">
                        {/* Pemutar Audio */}
                        <ReactAudioPlayer src={surah.audioFull["01"]} controls preload="none" />
                      </Col>
                      <Col md={4} className="d-flex align-self-center text-md-right justify-content-center justify-content-md-end">
                        {/* Tombol Surah Selanjutnya */}
                        <Link to={`/detail/${surah.suratSelanjutnya["nomor"]}`} className="btn btn-sm btn-dark text-decoration-none text-light">
                          Surah Selanjutnya <IconArrowBigRightFilled className="mx-auto" />
                        </Link>
                      </Col>
                    </Row>
                  </Card.Footer>
                </Card>
              </Col>
              <Col md={12} className="mb-4">
                {/* Menampilkan Bismillah jika data tidak tersedia */}
                <Card className="border-0 rounded-3 shadow-sm" style={{ backgroundColor: "#F9F7F5" }}>
                  <Card.Body>
                    <div className="d-flex align-items-center justify-content-center">
                      <h2>
                        <strong>ِبِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيْم</strong>
                      </h2>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              // Menampilkan daftar ayat jika data tersedia
              {surah.ayat.map((ayat) => (
                <Col md={12} className="mb-4" key={ayat.nomorAyat}>
                  <Card className="border-0 rounded-3 shadow-sm" style={{ backgroundColor: "#F9F7F5" }}>
                    <Card.Title className="p-3">
                      {surah.nomor}:{ayat.nomorAyat}
                    </Card.Title>
                    <Card.Body className="p-3">
                      <div className="d-flex align-items-center">
                        <h4 className="ms-auto">
                          <strong>{ayat.teksArab}</strong>
                        </h4>
                      </div>
                      <div className="d-flex align-items-center mt-4">
                        <p className="text-secondary">{ayat.teksLatin}</p>
                      </div>
                    </Card.Body>
                    <Card.Footer className="p-3">
                      <Row className="d-flex align-items-center">
                        <Col md="9" xs="12" className="text-secondary">
                          {ayat.teksIndonesia}
                        </Col>
                        <Col md="3" xs="12" className="mt-2">
                          {/* Pemutar Audio Ayat */}
                          <ReactAudioPlayer src={ayat.audio["01"]} controls preload="none" />
                        </Col>
                      </Row>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </>
          ) : (
            // Menampilkan pesan jika tidak ada hasil ditemukan
            <div className="text-center mt-5">Tidak ada hasil ditemukan.</div>
          )}
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Detail;
