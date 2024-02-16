import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { BeatLoader} from 'react-spinners';


function Payment() {
  const [a,setA]=useState(true);
  
  const [loader,setLoader]=useState(false);

  const [DBdata,setDBdata]=useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('https://bsmserver.onrender.com/Getdata');
        const data = result.data;
        if (data.length > 0) {
          const item = data[0];
          setDBdata(item);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);
  const HandlePut=()=>{
    axios.put('https://bsmserver.onrender.com/Updatedata/1',{
      totalAmount:DBdata.totalAmount,
      displayButton:false,
      Name:DBdata.Name
    })
    .then((response)=>{})
    .catch((err)=>{console.log(err.message)})
  }

  return (
    <div className='payment'>
        <div className='bankicon'><i className='fa fa-bank' style={{color:"blue",fontSize:"40px"}}></i></div>
        <div className='username'>{DBdata.Name}</div>
        <div className='amount'>
          <span className='amount1'>
            <h2>&#8377;</h2>
            <input type="text" className='amount1_1' value={DBdata.totalAmount} />
          </span>
        </div>
        <div className='desc'>Please Make Payment of  &#8377;{DBdata.totalAmount} for Booking Tickets</div>
        <div className='paybtn'>
        {
          !a?(
            <button className='btn btn-success' id='paybtn' >Payment Sucessful</button>        
          ) : loader?(<BeatLoader
            color={'#fff'}
            loading={loader}
            size={25}
            aria-label="Loading Spinner"
            data-testid="loader"
            className='beatLoder'
            />) : (<button className='btn btn-primary' id='paybtn' onClick={()=>{setLoader(true);setInterval(()=>{setA(false);HandlePut()},7000);}}>Pay Securly</button>)
          }
          </div>
       
    </div>
  )
}

export default Payment