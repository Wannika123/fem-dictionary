import searchIcon from "/assets/images/icon-search.svg";

function SearchInput(props: any) {

    const handleChange = (e: any) => {
        props.setInputVal(e.target.value)
    }

    const handleClick = (e: any) => {
        e.preventDefault();
        if (props.inputVal) {
            props.setCount((prevCount: any) => prevCount + 1)
        }
    }

    const warningStyle = { outlineColor: '#ff5252', border: '2px solid #ff5252' }

    return (
        <>
            <form>
                { 
                props.inputVal === ''
                    ? <input type="text" onChange={handleChange} style={warningStyle} />
                    : <input type="text" onChange={handleChange} />
                }
                <button type="submit" onClick={handleClick}>
                    <img src={searchIcon} alt="search button" />
                </button>
                { props.inputVal === '' && <div className="warning">Whoops, can’t be empty…</div>}
            </form> 
        </>
    )
}

export default SearchInput;