import React from 'react'
import { useParams, useLocation } from 'react-router-dom';

function EditSop() {
    const { id } = useParams(); // Extract the 'id' route parameter from the URL
    const location = useLocation();
    const dataas = location.state?.dataas; // Extract data from location.state
    const  information = dataas.sop
  return (
    <div>{id}</div>
  )
}

export default EditSop