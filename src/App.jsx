import Axios from "axios";
import { useEffect, useState } from "react";
import { Container, Button, Row, Col, Modal } from "react-bootstrap";
import Loading from "./Loading";
const URL = "https://pokeapi.deno.dev/pokemon/";
const App = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [searchParams, setSearchParams] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [dataExists, setDataExists] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    genus: "",
    description: "",
    imageUrl: "",
    types: [],
    abilities: [],
    stats: [],
    locations: [],
    color: "",
  });
  useEffect(() => {
    loadPokemonData();
  }, []);
  const loadPokemonData = async () => {
    await Axios.get(`${URL}`)
      .then((response) => {
        setPokemonData(response.data);
        console.log(response.data);
      })
      .catch((e) => {});
  };
  const searchDataPokemon = async () => {
    setLoading(true);
    await Axios.get(`${URL}${searchParams}`)
      .then((response) => {
        const data__ = response.data;
        setPokemonName(data__.name);
        setDataExists(true);
        setData({
          name: pokemonName,
          genus: data__.genus,
          description: data__.description,
          types: data__.types,
          stats: data__.stats,
          imageUrl: data__.imageUrl,
          abilities: data__.abilities,
          color: data__.color,
        });
        setLoading(false);
        console.log(data);
      })
      .catch((e) => {
        setPokemonName("");
        setDataExists(false);
        setLoading(false);
      });
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div style={{ backgroundColor: data.color }}>
            <Container>
              <Button variant="secondary" className="mt-5" onClick={handleShow}>
                Open Pokemon List
              </Button>
              <Modal size="lg" show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>List of pokemon (id) Name</Modal.Title>
                </Modal.Header>
                <Modal.Body
                  className="overflow-auto"
                  style={{ height: "100vh" }}
                >
                  <ul>
                    {pokemonData.map((pokeData) => (
                      <li key={pokeData.id}>
                        (<q>{pokeData.id}</q>) {pokeData.name}
                      </li>
                    ))}
                  </ul>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal.Body>
              </Modal>
              <Row className="pt-3">
                <Col className=" mt-1" xs={12} sm={12} md={6} lg={6} xl={6}>
                  <input
                    value={searchParams ? searchParams : null}
                    className="form-control"
                    type="text"
                    placeholder="Search by name or id"
                    onChange={(e) => setSearchParams(e.target.value)}
                  />
                </Col>
                <Col className=" mt-1" xs={12} sm={12} md={6} lg={6} xl={6}>
                  <button className="btn btn-light" onClick={searchDataPokemon}>
                    Cari
                  </button>
                </Col>
              </Row>
              {!dataExists ? (
                ""
              ) : pokemonName == "" ? (
                <h1>Pokemon tidak di temukan!</h1>
              ) : (
                <>
                  <h1>{pokemonName}</h1>
                  <img
                    width={100}
                    src={
                      data
                        ? data.imageUrl
                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                    }
                  />
                  <h1>Type : </h1>
                  <ul>
                    {data.types.map((type) => (
                      <li key={type}>{type}</li>
                    ))}
                  </ul>
                  <h1>Abilities : </h1>
                  <ul>
                    {data.abilities.map((abilities) => (
                      <>
                        <li key={abilities.name}>
                          <b>Name : </b>
                          {abilities.name}
                        </li>
                        <li key={abilities.effect}>
                          <b>Effect : </b>
                          {abilities.effect}
                        </li>
                        <li key={abilities.description}>
                          <b>Description : </b>
                          <q>{abilities.description}</q>
                        </li>
                        <br />
                      </>
                    ))}
                  </ul>
                  <h1>Stats : </h1>
                  <ul>
                    <li>HP : {data.stats["HP"]}</li>
                    <li>Attack : {data.stats["Attack"]}</li>
                    <li>Defense : {data.stats["Defense"]}</li>
                    <li>Special Attack : {data.stats["Special Attack"]}</li>
                    <li>Special Defense : {data.stats["Special Defense"]}</li>
                    <li>Speed : {data.stats["Speed"]}</li>
                  </ul>
                  <br />
                </>
              )}
              <footer className="mt-5">
                <p>
                  Created By <a href="https://github.com/dzaki236">Dzaki</a> | <q>Sorry.. a developer don`t know too much
                  about css :(</q>
                </p><br/>
              </footer>
            </Container>
          </div>
        </>
      )}
    </>
  );
};
export default App;
