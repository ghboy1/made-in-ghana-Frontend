import React from 'react';
import { useParams } from 'react-router-dom';

function Productlist() {
  const { id } = useParams();
  return <h1>Product Detail for ID: {id}</h1>;
}

export default Productlist;