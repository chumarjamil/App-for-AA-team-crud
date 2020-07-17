import React, { useState, useEffect } from "react";
import "./App.css";
import APIHelper from "./APIHelper.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

function App() {
  const [packages, setPackages] = useState([]);
  const [newPackage, setNewPackage] = useState({
    hotelName: "",
    price: "",
    duration: "",
    validity: "",
    description: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [updatePackageId, setUpdatePackageId] = useState(0);

  useEffect(() => {
    const fetchPackageAndSetPackages = async () => {
      const packages = await APIHelper.getAllPackages();
      console.log("Package", packages);
      setPackages(packages);
    };
    fetchPackageAndSetPackages();
  }, []);

  const createPackage = async (e) => {
    e.preventDefault();
    console.log(newPackage);
    if (newPackage.hotelName === "") {
      return alert("please enter hotel name");
    }
    if (packages.some(({ hotelName }) => hotelName === newPackage.hotelName)) {
      return alert(`Alert: ${newPackage.hotelName} already exists`);
    }
    if (!parseInt(newPackage.price)) {
      return alert("Enter correct Price");
    }
    if (newPackage.price === "") {
      return alert("please enter hotel price");
    }
    if (newPackage.validity === "") {
      return alert("please enter validity");
    }
    if (newPackage.duration === "") {
      return alert("please enter duration");
    }
    if (newPackage.description === "") {
      return alert("please enter description");
    }

    const addedPackage = await APIHelper.createPackage(newPackage);
    setPackages([...packages, addedPackage]);
    resetNewPackageData();
  };

  const deletePackage = async (id) => {
    try {
      await APIHelper.deletePackage(id);
      setPackages(packages.filter(({ _id: i }) => id !== i));
    } catch (err) {}
    resetNewPackageData();
  };

  const toggleEdit = (item) => {
    setIsEdit(true);
    setNewPackage(item);
  };

  const updatePackage = async () => {
    console.log(newPackage);
    const updatedPackage = await APIHelper.updatePackage(
      newPackage._id,
      newPackage
    );
    setPackages(
      packages.map((item) =>
        item._id === newPackage._id ? updatedPackage : item
      )
    );
    resetNewPackageData();
  };

  const _handleInput = ({ target }) => {
    setNewPackage({
      ...newPackage,
      [target.name]: target.value,
    });
  };

  const resetNewPackageData = () => {
    setNewPackage({
      hotelName: "",
      price: "",
      duration: "",
      validity: "",
      description: "",
    });
    setIsEdit(false);
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Hotel Packages</Navbar.Brand>
      </Navbar>
      <Container fluid>
        <Row>
          <Col md={3}>
            <h3 className="pt-5 pb-3">{isEdit ? "Edit" : "Add"} Package</h3>
            <Form>
              <Form.Group controlId="formGroupEmail">
                <Form.Control
                  placeholder="Enter Name"
                  name="hotelName"
                  value={newPackage.hotelName}
                  onChange={_handleInput}
                />
              </Form.Group>
              <Form.Group controlId="formGroupEmail">
                <Form.Control
                  placeholder="Enter Price"
                  name="price"
                  value={newPackage.price}
                  onChange={_handleInput}
                />
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Control
                  placeholder="Enter Validity"
                  name="validity"
                  value={newPackage.validity}
                  onChange={_handleInput}
                />
              </Form.Group>
              <Form.Group controlId="formGroupEmail">
                <Form.Control
                  placeholder="Enter Duration"
                  name="duration"
                  value={newPackage.duration}
                  onChange={_handleInput}
                />
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Control
                  placeholder="Enter Description"
                  name="description"
                  value={newPackage.description}
                  onChange={_handleInput}
                />
              </Form.Group>

              <Form.Group controlId="formGroupPassword">
                <Button
                  as="input"
                  type="submit"
                  value={isEdit ? "Update" : "Submit"}
                  onClick={isEdit ? updatePackage : createPackage}
                />

                {isEdit && (
                  <Button
                    style={{ marginLeft: 20 }}
                    as="input"
                    variant="danger"
                    value={"Cancel"}
                    onClick={resetNewPackageData}
                  />
                )}
              </Form.Group>
            </Form>
          </Col>
          <Col md={9}>
            <h3 className="pt-5 pb-3">List of Hotel Packages</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Hotel Name</th>
                  <th>Price</th>
                  <th>Duration</th>
                  <th>Validity</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {packages &&
                  packages.map((el, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{el.hotelName}</td>
                      <td>{el.price}</td>
                      <td>{el.duration}</td>
                      <td>{el.validity}</td>
                      <td>{el.description}</td>
                      <td>
                        <Button
                          onClick={() => toggleEdit(el)}
                          variant="primary"
                        >
                          Edit
                        </Button>{" "}
                        <Button
                          style={{ marginTop: 10 }}
                          variant="danger"
                          onClick={() => deletePackage(el._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      ;
    </>
  );
}

export default App;
