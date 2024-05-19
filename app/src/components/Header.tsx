import { useEffect, useRef } from "react";
import logo from "/assets/images/logo.svg";
import arrowIcon from "/assets/images/icon-arrow-down.svg";
import moonIcon from "/assets/images/icon-moon.svg";
import moonIconPurple from "/assets/images/icon-moon-purple.svg";
import '../styles/Header.css'
import useLocalStorage from "../hooks/useLocalStorage";

type Font = "Sans Serif" | "Serif" | "Mono"
type Theme = "light" | "dark"

type ChangeEvent = React.ChangeEvent<HTMLInputElement> 

function Header() {

    const [font, setFont] = useLocalStorage<Font>("font", "Sans Serif");
    const [theme, setTheme] = useLocalStorage<Theme>("theme", "light");

    useEffect(() => {
        document.body.style.fontFamily = font
    }, [font]);

    useEffect(() => {
        document.documentElement.className = theme
    }, [theme]);

    useEffect(() => {
        const radioBtn = (document.getElementById(theme)) as HTMLInputElement;
        radioBtn.checked = true;
    }, [])

    const changeFont = (font: Font) => {
        setFont(font);
    }

    const changeTheme = (e: ChangeEvent) => {
        if (e.target.value === "light" || e.target.value === "dark") {
            setTheme(e.target.value)
        }
    }

    const fontChoices = useRef<HTMLDivElement>(null);

    const showHideFontChoices = () => {
        if (fontChoices.current) {
            if (fontChoices.current.style.display === 'block') {
                fontChoices.current.style.display = 'none'
            } else {
                fontChoices.current.style.display = 'block'
            }
        }
    }

    return (
        <div className="Header">
            <img src={logo} alt="logo" />
            <div className="Header-2nd-part">
                <div className="font-selector">
                    <div className="curr-font-div">
                        <span className="curr-font" onClick={showHideFontChoices}>{font}</span>
                        <img src={arrowIcon} onClick={showHideFontChoices} />
                    </div>
                    <div className="font-choices" ref={fontChoices}>
                        <div onClick={() => { changeFont("Sans Serif") }} className="font-choice" style={{ fontFamily: "Sans Serif" }}>Sans Serif</div>
                        <div onClick={() => { changeFont("Serif") }} className="font-choice" style={{ fontFamily: "Serif" }}>Serif</div>
                        <div onClick={() => { changeFont("Mono") }} className="font-choice" style={{ fontFamily: "Mono" }}>Mono</div>
                    </div>
                </div>
                <hr className="header-hr" />
                <div className="toggle">
                    <div className="toggle-btns">
                        <input onChange={changeTheme} name="theme-btn" type="radio" value="light" id="light" />
                        <input onChange={changeTheme} name="theme-btn" type="radio" value="dark" id="dark" />
                        <div className="ball"></div>
                    </div>
                    <label htmlFor="dark">
                        {
                        theme === "light"
                            ? <img src={moonIcon} alt="moon icon" />
                            : <img src={moonIconPurple} alt="purple moon icon" />
                        }
                    </label>   
                </div>
            </div>
        </div>
    )
}

export default Header