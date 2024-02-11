import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
function Payment() {
  const [a,setA]=useState(true);
  const [displayButtoninScannerpage,setDisplayButton]=useState(true);
  const [totalAmount,setTotalAmount]=useState("0")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('https://bsmserver.onrender.com/Getdata');
        const data = result.data;
        if (data.length > 0) {
          const item = data[0];
          setTotalAmount(item.totalAmount);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);
  const HandlePut=()=>{
    axios.put('https://bsmserver.onrender.com/Updatedata/1',{
      totalAmount:totalAmount,
      displayButton:false,

    })
    .then((response)=>{console.log(response.data)})
    .catch((err)=>{console.log(err.message)})
  }

  return (
    <div className='payment'>
        <div className='bankicon'><i className='fa fa-bank' style={{color:"blue",fontSize:"40px"}}></i></div>
        <div className='username'>Satish Perugu</div>
        <div className='amount'>
            &#8377;
            <input type="text" value={totalAmount} />
        </div>
        <div className='desc'>Please Make Payment of  &#8377;{totalAmount} for Booking Tickets</div>
        {
          (()=>{
            if(!a){
              return <button className='btn btn-success' id='paybtn' >Payment Sucessful</button>
            }
            else{
              return <button className='btn btn-primary' id='paybtn' onClick={()=>{setTimeout(()=>{setA(false);setDisplayButton(false);HandlePut()},5000)}}>Pay Securly</button>
            }
          })()
        }
        
       
    </div>
  )
}

export default Payment