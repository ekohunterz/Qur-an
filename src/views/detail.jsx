import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Card, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Footer from "./footer";
import { IconMapPinFilled, IconList, IconArrowBigLeftFilled, IconArrowBigRightFilled } from "@tabler/icons-react";

function Detail(props) {
  const [surah, setSurah] = useState([]);
  const { nomor } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`https://equran.id/api/v2/surat/${nomor}`);
        setSurah(response.data.data);
        // console.log(response.data.data);
      } catch (error) {
        console.log("Error:", error);
      }
    }

    fetchData();
  }, [nomor]);

  return (
    <>
      <Container>
        <Row className="mt-5">
          {surah && Object.keys(surah).length > 0 ? (
            <Col md={12} className="mb-4">
              <Card className="border-0 rounded-3 shadow-sm">
                <Card.Title className="p-3">
                  <Row className="d-flex align-items-center">
                    <Col xs={6} md={6}>
                      {surah.arti}
                    </Col>
                    <Col xs={6} md={6} className="text-end">
                      <h3>{surah.nama}</h3>
                    </Col>
                  </Row>
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
                    <Col md={4} className="d-flex align-self-center ">
                      <Link to={`/detail/${surah.suratSebelumnya["nomor"]}`} className="text-decoration-none">
                        <IconArrowBigLeftFilled className="mx-auto" /> Surah Sebelumnya
                      </Link>
                    </Col>
                    <Col md={4} className="d-flex align-self-center ">
                      <audio className="mx-auto" controls src={surah.audioFull["01"]}></audio>
                    </Col>
                    <Col md={4} className="d-flex align-self-center justify-content-end ">
                      <Link to={`/detail/${surah.suratSelanjutnya["nomor"]}`} className="text-decoration-none">
                        Surah Selanjutnya <IconArrowBigRightFilled className="mx-auto" />
                      </Link>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            </Col>
          ) : null}
          <Col md={12} className="mb-4">
            <Card className="border-0 rounded-3 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-center">
                  <h2>
                    <strong>ِبِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيْم</strong>
                  </h2>
                </div>
              </Card.Body>
            </Card>
          </Col>
          {surah && surah.ayat && surah.ayat.length > 0 ? (
            surah.ayat.map((ayat) => (
              <Col md={12} className="mb-4" key={ayat.nomorAyat}>
                <Card className="border-0 rounded-3 shadow-sm">
                  <Card.Title className="p-4">
                    {surah.nomor}:{ayat.nomorAyat}
                  </Card.Title>
                  <Card.Body>
                    <div className="d-flex align-items-center">
                      <h4 className="ms-auto">
                        <strong>{ayat.teksArab}</strong>
                      </h4>
                    </div>
                    <div className="d-flex align-items-center mt-4">
                      <p className="text-secondary">{ayat.teksLatin}</p>
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <Row className="d-flex align-items-center">
                      <Col md="9" xs="12" className="text-secondary">
                        {ayat.teksIndonesia}
                      </Col>
                      <Col md="3" xs="12">
                        {/* <audio controls src={ayat.audio["01"]}></audio> */}
                      </Col>
                    </Row>
                  </Card.Footer>
                </Card>
              </Col>
            ))
          ) : (
            <div className="text-center mt-5">Tidak ada hasil ditemukan.</div>
          )}
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Detail;
