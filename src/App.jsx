import { useEffect, useRef, useState } from 'react'
import './App.css';
import useFetch from './hooks/useFetch';
import LocationCard from './components/LocationCard';
import ResidentCard from './components/ResidentCard';
import Pagination from './components/Pagination';

function App() {
  const [finder, setFinder] = useState(Math.floor(Math.random() * 126 + 1));
  const [location, getLocation, isLoading, hasError] = 
  useFetch();
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${finder}`;
    getLocation(url);
  }, [finder]);

  // console.log(location);
 
const textInput = useRef();

const handleSubmit = event =>{
  event.preventDefault();
  setFinder(textInput.current.value.trim());
}

const quantity = 5;
const second = currentPage * quantity;
const first = second - quantity;
const residensPart = location && location.residents.slice(first, second);
const totalPages = location && Math.floor(location.residents.length / quantity) + 1;

  return (
    
    <div className='app'>
      {
        isLoading ?
        <h2>Loading...</h2>
        :
        <>
        <h1>Rick and Morty</h1>
      <form
       onSubmit={handleSubmit}
       className='app__form'
       >
        <input 
        className='app__text'
        type="number" ref={textInput} placeholder='Type a number (1 to 126)'/>
        <button className='app__btn'>Search</button>
      </form>
      {
        hasError || finder === '0'? //manejo de errores
        <h2>This location do no exist</h2>
        :
        <> 
        <LocationCard 
      location={location}
      />
        <Pagination 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        />
      <div className='app__container'>
      {
        residensPart.map(resident => (
          <ResidentCard
          key={resident}
          url={resident}
          />
        ))
      }
      </div>
      <Pagination 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        />
        </>
      }
        </>
      }
      
    </div>
  )
}

export default App;
