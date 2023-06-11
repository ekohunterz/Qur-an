import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Card, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "./footer";

export default function PostIndex() {
  const [surah, setSurah] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://equran.id/api/v2/surat");
        setSurah(response.data.data);
      } catch (error) {
        console.log("Error:", error);
      }
    }

    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (searchText === "") {
      setSearchResults(surah);
    } else {
      const filteredSurah = surah.filter((item) => item.namaLatin.toLowerCase().includes(searchText.toLowerCase()));
      setSearchResults(filteredSurah);
    }
  }, [surah, searchText]);

  return (
    <>
      <Container>
        <Row className="mt-5">
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Form.Control type="text" className="form-control shadow-sm" placeholder="Cari surah..." value={searchText} onChange={handleSearchChange} />
          </div>

          {searchResults.length > 0 ? (
            searchResults.map((item) => (
              <Col md={4} className="mb-4 mt-4" key={item.nomor}>
                <Link to={`/detail/${item.nomor}`} className="text-dark text-decoration-none">
                  <Card className="h-100 border-0 rounded-3 shadow card-hover">
                    <Card.Body>
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">{item.nomor}</div>
                        <div className="flex-grow-1 ms-3">
                          <strong>
                            {item.namaLatin} ({item.jumlahAyat})
                          </strong>
                          <br />
                          <small>
                            <i>
                              {item.tempatTurun} | {item.arti}
                            </i>
                          </small>
                        </div>
                        <div className="flex-grow-5 ms-5">
                          <h2>ا{item.nama}</h2>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
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
