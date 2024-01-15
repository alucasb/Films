import { useState , useEffect} from "react"

//isso que permite pegar a query da url e usar como precisa 
import { useSearchParams } from "react-router-dom"
import MovieCard from "../components/MovieCard"

import './MovieGrid.css'

const searchUrl = import.meta.env.VITE_SEARCH


const auth = import.meta.env.VITE_API_KEY
const config = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: auth
  }
};



const Search = () => {

  const [searchParams] = useSearchParams()

  const [movies, setMovies] = useState([])
  
  const query = searchParams.get('q')

  const getSearchedMovies =async (url) => {
    const res = await fetch(url, config)
    const data = await res.json()

    setMovies(data.results)
  }

  useEffect(()=>{
    const searchQueryUrl = `${searchUrl}?${auth}&query=${query}`

    getSearchedMovies(searchQueryUrl)
  },[query])

  return (
    <div className="container">
      <h2 className="title">Resultados para <span className="query-text">{query}</span></h2>
      <div className="movies-container">
      {movies.length === 0 && <p>Carregando</p>}
      {movies.length > 0 && 
          movies.map((movie)=>
          (<MovieCard key={movie.id} movie={movie}/>)
        )
      }
      </div>
    </div>
  )
}

export default Search