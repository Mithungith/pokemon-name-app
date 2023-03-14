import React,{useEffect, useState} from 'react';
import PokemonList from './PokemonList';
import Pagination from './Pagination';
import axios from 'axios';

function App() {
  const [currentPageUrl,setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [nextPageUrl,setNextPageUrl] = useState();
  const [prevPageUrl,setPrevPageUrl] = useState();
  const [pokemon, setPokemon] = useState([]);
  const [loading,setLoading]= useState(true);
  let cancel;
  useEffect(()=>{
    axios.get(currentPageUrl,{cancelToken: new axios.CancelToken(c=> cancel =c)}).then(res=>{
      setLoading(false);
      setNextPageUrl(res.data.next);
      setPrevPageUrl(res.data.previous);
      setPokemon(res.data.results.map(p=> p.name))})
      return ()=> cancel(); // or write cancel.cancel() // it  will help in not multiple api call
  },[currentPageUrl])

  function gotoNextPage(){
    setCurrentPageUrl(nextPageUrl);
  }
  function gotoPrevPage(){
    setCurrentPageUrl(prevPageUrl);
  }
  if(loading) return "Loading...";
  return (
    <>
   <PokemonList pokemon={pokemon}/>
   <Pagination gotoNextPage={nextPageUrl &&gotoNextPage} gotoPrevPage ={prevPageUrl && gotoPrevPage}/>
   </>
  );
}

export default App;
