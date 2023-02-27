import './App.css';
import React, {  useState } from 'react'
import axios from 'axios'

function App() {
  const[postdata,setpostdata] = useState([]);
  const[city,setcity] = useState("");
  const[err,seterr] = useState(false);
  // const[msg,setmsg] = useState(" ");
  const[post,setpost] = useState(null);
  const change=(e)=>{
    setcity(e.target.value)
  }
  const search=()=>{
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b65275e1763f274c5b52897cabee1f6d&units=metric`).then((res)=>{
        console.log(res.data);

      setpost(res.data);
      seterr(false);
      setpostdata(...postdata,city);
        console.log(post,postdata);
      }).catch((err)=>{
        seterr(true);
        console.log(err);
      })
  }
  return (
    <div className='App'>
    <div className='heading'>
    <h1>Weather App</h1>
    </div>
    <div className='search-bar'>
      <input type='text' placeholder="Enter City Name" value={city} onChange={(e)=>{change(e)}} size='100' height='2rem'></input><br></br>
      <button onClick={search}>Search</button>
    </div>
    <div className='data'>
      {
        err?
        <div className='err'>
          Please Enter Valid City Name
        </div>:
        post?
        <div>
          <div className='name'>Weather details of city : <span className='city-name'>{post.name}</span></div>
          <div className='name'>Current Temperatue : <span className='city-name'>{post.main.temp} cel</span></div>
          <div className='name'>Temperatue Range : <span className='city-name'>{post.main.temp_max} cel to {post.main.temp_min} cel</span></div>
          <div className='name'>Humidity  : <span className='city-name'>{post.main.humidity}</span></div>
          <div className='name'>Sea Level : <span className='city-name'>{post.main.sea_level}</span></div>
          <div className='name'>Ground Level : <span className='city-name'>{post.main.grnd_level}</span></div>
          
        </div>:
        <div>
{
   postdata.map((items)=>{
    return(
      <li>{items}</li>
    )
   })
}
        </div>
        
      }
    </div>

  </div>
  );
}

export default App;
