import React, {useState, useEffect} from 'react';
import axios from 'axios'; 
import './App.css';
import 'antd/dist/antd.css';
import { Card } from 'antd'; 

function App() {
  const [data, setData] = useState([]); 

  useEffect(() => {
    axios.get('https://sprint1umekowalker.herokuapp.com/')
    .then(r => {
      console.log(r.data);
      setData(r.data);
    })
    .catch(error => console.log(error))
  },[])

  if(!data){
    return(
      <div>Loading data....</div>
    )
  }else{
    return (
      <div className="App">
        {
          data.map(project =>(<Card style={{"width" : "60%", "margin" : "2% auto"}} key={project.id} title={project.name}><p>{project.description}</p></Card>))
        }
      </div>
  );

}
}

export default App;
