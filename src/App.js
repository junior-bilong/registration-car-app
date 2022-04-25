// import logo from './logo.svg';
// import './App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

let App = () => {
  let [ cars, setCars ] = useState([]);
  let [ brand, setBrand ] = useState("");
  let [ model, setModel ] = useState("");
  let [ year, setYear ] = useState("");
  let [ horsePower, setHorsePower ] = useState("");
  let [ isValid, setIsValid ] = useState(false);

  let addCarHandler = () => {
    // alert("button was clicked");
    let oldCars = [...cars];
    let newCar = {
      brand,
      model,
      year,
      horsePower,
      id:Math.floor(Math.random()*1000)
    }

    let newCars = oldCars.concat(newCar);

    if (brand === "" || model === "" || year === "" || horsePower === "") {
      alert("field can't be empty");
      setIsValid(true)
    } else {
      // let newCars = oldCars.concat(newCar);
      setIsValid(false)
    }
    setCars(newCars);

    localStorage.setItem("cars", JSON.stringify(newCars));

    setBrand("")
    setModel("")
    setYear("")
    setHorsePower("")
  }

  let deleteCarHandler = (id) => {
    let oldCars = [...cars]
    let newCars = oldCars.filter((car)=>car.id !== id);
    setCars(newCars);

    localStorage.setItem("cars", JSON.stringify(newCars));
  }

  useEffect(() => {
    const localStorageCars = JSON.parse(localStorage.getItem("cars"));
    setCars(localStorageCars); 
  },[setCars])

  return (
    <div className="App">
      <img className="car" src="/src/images/car.jpg" alt="#" />
      <h1 className="name">Car Registration App</h1>
      <TextField
        id="outlined-basic"
        label="Brand" variant="outlined"
        className="textfield"
        onChange={(e) => setBrand(e.target.value)}
        value={brand}
        error={isValid}
      />
      <TextField
        id="outlined-basic"
        label="Models" variant="outlined"
        className="textfield"
        onChange={(e) => setModel(e.target.value)}
        value={model}
        error={isValid}
      />
      <TextField
        id="outlined-basic"
        label="Years"
        variant="outlined"
        className="textfield"
        onChange={(e) => setYear(e.target.value)}
        value={year}
        error={isValid}
      />
      <TextField
        id="outlined-basic"
        label="HorsePower"
        variant="outlined"
        className="textfield"
        onChange={(e) => setHorsePower(e.target.value)}
        value={horsePower}
        error={isValid}
      />
      <Button variant="contained" color="secondary" onClick={addCarHandler} >Register Car</Button>

      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Brand</TableCell>
            <TableCell align="center">Models</TableCell>
            <TableCell align="center">Years</TableCell>
            <TableCell align="center">HorsePower</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {cars.map((car, index) => {
           return(
             <TableRow key={index} onClick={() => deleteCarHandler(car.id)}>
               <TableCell align="center">{car.brand}</TableCell>
               <TableCell align="center">{car.model}</TableCell>
               <TableCell align="center">{car.year}</TableCell>
               <TableCell align="center">{car.horsePower}</TableCell>
             </TableRow>
           )
         })}
        </TableBody>
      </Table>

    </div>
  )
}

export default App;
