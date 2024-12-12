import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { Container, FormCheck } from 'react-bootstrap';
import FormSelect from 'react-bootstrap/FormSelect'

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useGetVendedores } from '../ApiCalls/VendedoresCall';
import { useGetArticulos } from '../ApiCalls/ArticulosCall';
import {PostPedidos} from "../ApiCalls/PostPedidos"
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const handleSubmit = async (values) => {
  try {
    console.log("Hello")
    const response = await PostPedidos(values);
    console.log(response) 
    if (response?.code == 1) {
      toast.success("Pedido creado con éxito", { position: "top-right" });
    } else {
      toast.error("Hubo un problema al crear el pedido", { position: "top-right" });
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    toast.error("Error del servidor. Intente nuevamente.", { position: "top-right" });
  }
};



export const FormArt = () => {

  const { Articulos, loading, error } = useGetArticulos();

  const [pedidos,SetPedidos] = useState([])

  const { vendedores, loading_2, error_2 } = useGetVendedores();

  if (loading_2) return <p>Cargando...</p>;
  if (error_2) return <p>Error: {error_2}</p>;

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error_2}</p>;


  // Esquema de validación usando Yup
const validationSchema = Yup.object({
  vendedorId: Yup.string().required('Porfavor eliga un vendedor'),
  articuloId: Yup.array().required('El precio es obligatorio').min(1, 'Debe elegir por lo menos 1 artiulo'),
});

  const initialValues = {
    vendedorId: "",
    articuloId: pedidos,
  };

  const toggleArticuloSelection = (id,setFieldValue) => {
    SetPedidos((prevSelected) =>{
      const pedidoId = prevSelected.includes(id)
        ? prevSelected.filter((articuloId) => articuloId !== id)
        : [...prevSelected, id];
        setFieldValue("articuloId", pedidoId);
        return pedidoId;
      });
 // Retornamos el estado actualizado
  };

  return (
    <div>
    <Container>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form noValidate>
          <Row className="mb-3">
          <Col md="3">
              <div className="form-group">
                <label htmlFor="vendedorId">Vendedores</label>
                <FormSelect onChange={(event)=>{console.log(event.currentTarget.options); setFieldValue("vendedorId",vendedores.vendedores?.[event.currentTarget.options.selectedIndex].descripcion)}} aria-label="Default select example">
                  <option>Open this select menu</option>
                  
                  {
                  vendedores.vendedores?.length > 0 ? (
                        vendedores.vendedores.map((x) => (
                          <option key={x.descripcion} id={x.descripcion}>{x.descripcion}</option>
                        ))
                    ) : (
                        <option>No hay disponibles</option>
                    )}
                </FormSelect>
                <ErrorMessage name="vendedorId" component="div" className="text-danger" />
              </div>
            </Col>
            <Col md="9">
              <div className="form-group">
                <label htmlFor="vendedorId">Articulos</label>
                <Container>
                  {Articulos.length > 0 ? (
                        Articulos.map((x) => (
                          <Row style={{marginTop:"15px"}}>
                            <Col>Codigo : {x.codigo}</Col>
                            <Col>N°Deposito : {x.deposito}</Col>
                            <Col>Descripcion : {x.descripcion}</Col>
                            <Col>Precio : {x.precio}</Col>
                            <Col>                            <input
                              type="checkbox"
                              checked={pedidos.includes(x.id)}
                              onChange={() =>{
                                toggleArticuloSelection(x.id,setFieldValue);
                              }
                              }></input></Col>
                          </Row>
                        ))
                    ) : (
                      <Row>No hay Articulos</Row>
                    )}
                </Container>
                <ErrorMessage name="vendedorId" component="div" className="text-danger" />
              </div>
            </Col>
          </Row>

          <Button type="submit" disabled={isSubmitting}>
            Submit form
          </Button>
        </Form>
      )}
    </Formik>
    </Container>
    <ToastContainer />
    </div>
  )
}