import { useState, useEffect } from "react";
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";
import '../styles/Search.css';

function Search() {

    const [count, setCount] = useState(0);
    const [inputVal, setInputVal] = useState("keyboard");
    const [data, setData]: [any, Function] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        setIsLoading(true);
        setData(null);
        setError('');

        fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + inputVal)
        .then(res => {
            if (!res.ok) {
                setData(null);
                setIsLoading(false);
                throw Error('No Definitions Found');
            }
            return res.json()
        })
        .then(data => {           
            setData(data); 
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err.message);
            setError(err.message);
            setIsLoading(false);
        })
    }, [count])

    return (
        <div className="Search"> 
            <SearchInput 
                setCount={setCount}
                setInputVal={setInputVal}
                inputVal={inputVal}
            />
            { isLoading && <div style={{marginTop: 30, textAlign: 'center', color: '#a445ed'}}>Loading...</div>}
            { data !== null && <SearchResult data={data} /> }
            { error && 
                <div className="error">
                    <div className="emoji">😕</div>
                    <p className="err-message">{error}</p>
                    { error !== 'Failed to fetch' &&
                        <p style={{color: '#757575'}}>
                            Sorry pal, we couldn't find definitions for the word you were looking for. 
                            You can try the search again at later time or head to the web instead.
                        </p>
                    }
                </div>
            }        
        </div>
    )
}

export default Search