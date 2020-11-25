import React, {useReducer, useEffect} from 'react'

const API_KEY = 'dngdm5xPKVFbMZ1bLQSv9JsBB5ewR7ZJ'
const API_ENDPOINT = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`

const gifReducer = (state, action) => {
    switch (action.type){
        case 'GIF_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case 'GIF_FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload
            }
        case 'GIF_FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        default:
                throw new Error()
    }
}

const Random = ()=> {
    const [randomGif, dispatchGif] = useReducer(gifReducer, {data: "", isLoading: false, isError: false})
    const fetchGifs = ()=> {
        dispatchGif({type: 'GIF_FETCH_INIT'})

        fetch(`${API_ENDPOINT}`)
        .then(response => response.json())
        .then(results => 
            dispatchGif({type: 'GIF_FETCH_SUCCESS', payload: results.data.images.downsized_large.url}))
        .catch(()=>dispatchGif({type: 'GIF_FETCH_FAILURE'}))
    }
    useEffect(()=>{
        fetchGifs()
    }, [])
    const handleClick = () => {
        fetchGifs()
    }
    return(
        <>
            <div>
                {randomGif.isError && <p>Something went wrong</p>}
                {randomGif.isLoading ? 
                (<p>Loading ....</p>) 
                : (<img width="500" height="500" src={randomGif.data} alt='Random Gif' />) }
                <button onClick={handleClick}>Random Gif</button>
            </div>
        </>
    )
}

export default Random