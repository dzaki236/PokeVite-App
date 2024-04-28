import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <>
      <div className="d-flex justify-content-center">
        <div>
          <center>
            <Spinner
              style={{ width: "5rem", height: "5rem", marginTop: "20vh" }}
            />
            <h2>Loading...</h2>
          </center>
        </div>
      </div>
    </>
  );
};
export default Loading;
