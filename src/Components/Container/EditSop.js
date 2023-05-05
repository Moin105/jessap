import React from 'react'
import { useParams, useLocation } from 'react-router-dom';

function EditSop() {
    const { id } = useParams(); 
    const location = useLocation();
    const dataas = location.state?.dataas;
    const  information = dataas.sop
  return (
    <div>{id}</div>
  )
}

export default EditSop