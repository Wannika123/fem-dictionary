import { useEffect, useState } from "react";

const audioCtx = new AudioContext();

function SearchResult(props: any) {

    const {word, phonetic, phonetics, meanings, sourceUrls}: any = props.data[0];
    const audioSrc = phonetics.find((item: any) => item.audio).audio;

    const [audio, setAudio]: [any, Function] = useState(null);

    useEffect(() => {
        fetch(audioSrc)
            .then(data => data.arrayBuffer())
            .then(ArrayBuffer => audioCtx.decodeAudioData(ArrayBuffer))
            .then(decodedAudio => {
                setAudio(decodedAudio)
            })
    }, [])

    const playAudio = () => {
        const playSound = audioCtx.createBufferSource();
        playSound.buffer = audio;
        playSound.connect(audioCtx.destination);
        playSound.start(audioCtx.currentTime);
    }

    return (
        <>
            <div className="search-result-top">
                <div className="word">
                    <h1>{word}</h1>
                    <p className="purple-text">{phonetic}</p>
                </div>
                <div role="button" className="play-btn" onClick={playAudio}>
                    <div className="play-btn-triangle"></div>
                </div>
            </div>
            {meanings.map((meaning: any, index: any) => (
                <fieldset key={'meaningKey: ' + index}>
                    <legend><i>{meaning.partOfSpeech}</i></legend>
                    <h2>Meaning</h2>
                    <ul>
                        {meaning.definitions.map((def: any, index: any) => (
                            <li key={index}>
                                <p>{def.definition}</p>
                                {def.example !== undefined && <div className="example">{'"' + def.example + '"'}</div>}
                            </li>
                        ))}
                    </ul>
                    { meaning.synonyms.length !== 0 &&
                        <div className="syn-an">
                            <h2>Synonyms</h2>
                            <div className="purple-text">{meaning.synonyms.join(', ')}</div>
                        </div>
                    }
                    { meaning.antonyms.length !== 0 &&
                        <div className="syn-an antonyms">
                            <h2>Antonyms</h2>
                            <div className="purple-text">{meaning.antonyms.join(', ')}</div>
                        </div>
                    }
                </fieldset>
            ))}
            <hr className="result-hr" />
            <div className="source">
                <h3>source</h3>
                <div>
                    { sourceUrls.map((url: any, index: any) => (
                        <div key={'urlKey: ' + index}>
                            <a href={url} target="_blank">
                                {url}
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"><path fill="none" stroke="#838383" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.09 3.545H2.456A1.455 1.455 0 0 0 1 5v6.545A1.455 1.455 0 0 0 2.455 13H9a1.455 1.455 0 0 0 1.455-1.455V7.91m-5.091.727 7.272-7.272m0 0H9m3.636 0V5"/></svg>
                            </a>
                        </div>
                        )) 
                    }
                </div>
            </div>
        </>
    )
}

export default SearchResult