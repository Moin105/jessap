import React, { useEffect } from 'react'
import Rowsop from './Rowsop'
import setting from "../../Images/setting.png";
import check from "../../Images/check.png";
import document from "../../Images/document.png";
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import {CgSearch} from 'react-icons/cg'
import {  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure} from '../../features/counter/sopActions'
import { useDispatch,useSelector} from 'react-redux';
// const config = {
//   headers: {
//     'Authorization': 
//   }
// };
export const fetchData = (config) => {
  return (dispatch) => {
    dispatch(fetchDataRequest());
    fetch('https://phplaravel-391561-3408566.cloudwaysapps.com/api/getSOPs',config) // Replace with your API endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return Promise.all([response.clone().json(), response.text()]);

        // return response.json();
      })
      .then(([json, text]) => {
        // Use parsed JSON data and text data as needed
        console.log('JSON data:', json);
        console.log('Text data:', text);
        dispatch(fetchDataSuccess(json)); // Dispatch success action with fetched data
      })
      .catch(error => {
        dispatch(fetchDataFailure(error.message));
      });
  };
};

function Sops() {
  const dispatch = useDispatch();
  const sop = useSelector(state => state.sops);
  // const token ={Authorization:}
  const config = {
    headers: {
      'Authorization':`Bearer  ${Cookies.get("token")}`
    }
  };
useEffect(() => {
  console.log("container",sop)
  dispatch(fetchData(config));

}, [])

  return (
   <React.Fragment>
             <div className='container-sop'>
            <h3>SOPs</h3>
           
            <div className='sop-container-row'>
              <div className='input-container'>
                <span><CgSearch/></span>
                <input type='text' placeholder='Search SOPs'/>
              </div>
              <Link to="/addsops"><button>Add SOP</button></Link>  
            </div>
            <div className='card-sop'>
              {sop !== [] ? sop.data.map((sops,index )=>{
               return <> <Rowsop  icon={setting}title={sops.title} description={sops.description}/> </>
              }):"no data"  }
             
              {/* <Rowsop icon={check}/>
              <Rowsop icon={document}/> */}
            </div>
            </div>
   </React.Fragment>
  )
}

export default Sops