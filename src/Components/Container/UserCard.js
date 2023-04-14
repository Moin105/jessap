import React from 'react'
import './user.css'
import dots from '../../Images/dots.png'

function UserCard({name,joined_date,sops}) {
  return (
    <div className='user-card'>
        <div className='user-img'>
            <figure>
                {/* <img/> */}
            </figure>
        <div className='user-data'>
            <h4>{name}</h4>
            <p>{joined_date}</p>
        <div className='user-sops'>
            <ul>
            {
                sops.map((sop,index)=>{
                    return <li key={index}>{sop.title}</li>
                })
            }
                {/* <li></li> */}
            </ul>
            {/* <div className='status'>
            <button className='completed'>completed</button>
            <button className='incompleted'>incompleted</button>
            </div> */}
        </div>  
           
        </div>
        </div>

        <span className="dots"><img src={dots}/></span>  
    </div>
  )
}

export default UserCard