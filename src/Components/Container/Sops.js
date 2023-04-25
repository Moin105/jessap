import React, { useEffect,useState } from 'react'
import Rowsop from './Rowsop'
import setting from "../../Images/setting.png";
import check from "../../Images/check.png";
import document from "../../Images/document.png";
import { Link ,useNavigate} from 'react-router-dom';
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
  const [searchQuery, setSearchQuery] = useState('');
  
  const sop = useSelector(state => state.sops);
  const filteredSops = searchQuery ? sop.data.filter(sop => sop.title.toLowerCase().includes(searchQuery.toLowerCase())) : sop.data;
  // let content;

  // if (filteredSops.length > 0) {
  //   content = (
  //     <ul>
  //       {filteredSops.data.map(sop => <li key={sop.id}>{sop.title}</li>)}
  //     </ul>
  //   );
  // } else if (searchQuery && filteredSops.data.length === 0) {
  //   content = (
  //     <p>No SOPs found.</p>
  //   );
  // } else {
  //   content = (
  //     <ul>
  //       {sop.data.map(sop => <li key={sop.id}>{sop.title}</li>)}
  //     </ul>
  //   );
  // }
  // const filteredSops = searchQuery ? sop.filter(sop => sop.title.toLowerCase().includes(searchQuery.toLowerCase())) : sop;

  // const token ={Authorization:}
  const navigate = useNavigate();
  const config = {
    headers: {
      'Authorization':`Bearer  ${Cookies.get("token")}`
    }
  };
  const handleClick = (id,data) => {
    navigate(`/dynamic/${id}`);
  };
  
  useEffect(() => {
    console.log("container",sop)
    dispatch(fetchData(config));
  }, [])
  // let filteredSops = sop;

 
  // useEffect(() => {
  // console.log("jawab",filteredData)
  // if (Array.isArray(sop)) {
  //   filteredSops = searchQuery ? sop.data.filter(sop => sop.title.toLowerCase().includes(searchQuery.toLowerCase())) : sop;
  // }
  // }, [searchQuery])
  
  return (
   <React.Fragment>
             <div className='container-sop'>
            <h3>SOPs</h3>
           
            <div className='sop-container-row'>
              <div className='input-container'>
                <span><CgSearch/></span>
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                {/* <input type='text'  value={searchQuery} onChange={(e) =>{ setSearchQuery(e.target.value);console.log("e",searchQuery)}} placeholder='Search SOPs'/> */}
              </div>
              <Link to="/addsops"><button>Add SOP</button></Link>  
            </div>
            <div className='card-sop'>
            {filteredSops.length > 0
  ? <>{filteredSops.map((sops,index) => <Rowsop data={sops} key={index}  icon={setting}title={sops.title} description={sops.description}/>)}</>
  : searchQuery && filteredSops.length === 0
    ? <p>No SOPs found.</p>
    : <>{sop.data.map((sops,index) => <Rowsop data={sops} key={index}  icon={setting}title={sops.title} description={sops.description}/>)}</>}
            {/* {filteredSops.length > 0 ? (
      <ul>
        {filteredSops.map(sop => <li key={sop.id}>{sop.title}</li>)}
      </ul>
    ) : (
      <p>No such data exists.</p>
    )} */}
            {/* {filteredData > 0 ?filteredData.data.map((sops,index) => { return(<Rowsop data={sops} key={index}  icon={setting}title={sops.title} description={sops.description}/>)}):
           sop !== [] ? sop.data.map((sops,index )=>{
            return ( <Rowsop data={sops} key={index} icon={setting}title={sops.title} description={sops.description}/>
)              }):"no data" } */}
   {/* {filteredData.data.map((sops,index) => <Rowsop data={sops} key={index} icon={setting}title={sops.title} description={sops.description}/>)} */}
          
              {  }
             
              {/* <Rowsop icon={check}/>
              <Rowsop icon={document}/> */}
            </div>
           </div>
   </React.Fragment>
  )
}

export default Sops