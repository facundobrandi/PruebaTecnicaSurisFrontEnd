import { useState, useEffect } from 'react';
import axios from 'axios';

export const PostPedidos = async (values) => {
  let data = values.articuloId; // Artículos seleccionados
  
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `https://localhost:7283/api/Articulo?name=${values.vendedorId}`,
    headers: { 
      'accept': '*/*', 
      'Content-Type': 'application/json',
    },
    data: data,
  };

  try {
    // Usamos await para esperar la respuesta de axios
    const response = await axios.request(config);
    
    console.log("Respuesta del servidor:", response.data);
    
    // Asegúrate de devolver la respuesta para que la función handleSubmit pueda manejarla
    return response.data; 
  } catch (error) {
    console.error("Error al enviar el pedido:", error);
    
    // Puedes devolver un objeto de error para manejarlo en el `handleSubmit`
    return { success: false, error: error.message };
  }
};