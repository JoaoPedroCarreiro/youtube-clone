import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "./TopHead.scss"

import { normalizeString } from "converters"

import user from "assets/user.jpg"

interface TopHeadProps {}

if(localStorage.getItem("theme") === "dark") {
    if(!document.querySelector("html")?.hasAttribute("dark")) document.querySelector("html")?.toggleAttribute("dark")
}

const TopHead: React.FC<TopHeadProps> = () => {
    const searchIdRef = useRef<HTMLDivElement | null>(null)
    const searchIconRightRef = useRef<HTMLDivElement | null>(null)
    const searchRef = useRef<HTMLInputElement | null>(null)
    const clearBtnRef = useRef<HTMLButtonElement | null>(null)
    const userBtnRef = useRef<HTMLDivElement | null>(null)
    const userRef = useRef<HTMLDivElement | null>(null)
    const topHeadRef = useRef<HTMLDivElement | null>(null)

    const { pathname, search } = useLocation()
    const navigate = useNavigate()

    const [searchQuery, setSearchQuery] = useState<string>("")
    const [theme, setTheme] = useState<string>("Light")

    useEffect(() => {
        window.addEventListener("resize", (): void => {
            if(window.innerWidth > 720 && topHeadRef.current?.hasAttribute("search")) topHeadRef.current.toggleAttribute("search")
        })

        window.addEventListener("click", (event: MouseEvent): void => {
            const target = event.target as HTMLElement

            if(userRef.current) {
                if(!target.classList.contains("user-unique-0pln") && userRef.current.style.display) {
                    userRef.current.style.display = ""
                }
            }
        })
    }, [])

    const toggleMenu = (): void => {
        if(window.innerWidth > 1375 && !pathname.startsWith("/watch")) {
            document.body.toggleAttribute("mini")
            return
        }

        const navMenu = document.getElementById("nav-menu-dec") as HTMLElement
        const screenDark = document.getElementById("screen-darker") as HTMLElement

        navMenu.style.transform = "translateX(0%)"
        screenDark.style.zIndex = "4"
        screenDark.style.opacity = "1"
    }

    const onEnterDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if(event.key === "Enter") {
            navigate(searchQuery ? `/results?search_query=${searchQuery}` : "#")
        }
    }

    const onFocusOnInput = (): void => {
        if(searchIconRightRef?.current && searchIdRef?.current) {
            const svg = searchIconRightRef.current.querySelector("svg") as SVGSVGElement
            svg.style.width = "20px"
            svg.style.height = "20px"

            searchIconRightRef.current.style.width = "20px"
            searchIconRightRef.current.style.height = "20px"
            searchIconRightRef.current.style.marginRight = "12px"

            searchIdRef.current.style.marginLeft = "0px"
            searchIdRef.current.style.border = "1px solid #1c62b9"
            searchIdRef.current.style.boxShadow = "inset 0 1px 2px rgba(0, 0, 0, 0.3)"
        }
    }

    const onBlurOnInput = (): void => {
        if(searchIconRightRef?.current && searchIdRef?.current) {
            const svg = searchIconRightRef.current.querySelector("svg") as SVGSVGElement
            svg.style.width = "0px"
            svg.style.height = "0px"

            searchIconRightRef.current.style.width = "0px"
            searchIconRightRef.current.style.height = "0px"
            searchIconRightRef.current.style.marginRight = "0px"

            if(window.innerWidth > 290) {
                searchIdRef.current.style.marginLeft = "32px"
            }

            searchIdRef.current.style.border = ""
            searchIdRef.current.style.boxShadow = ""
        }
    }

    const onSearchInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if(clearBtnRef?.current) {
            setSearchQuery(event.currentTarget.value)

            if(!!event.currentTarget.value) {
                clearBtnRef.current.style.opacity = "1"
                return
            }

            clearBtnRef.current.style.opacity = "0"
        }
    }

    const clearSearchInput = (): void => {
        if(searchRef?.current && clearBtnRef?.current) {
            searchRef.current.value = ""
            clearBtnRef.current.style.opacity = "0"
        }
    }

    const toggleUser = (): void => {
        if(userRef.current) {
            if(userRef.current.style.display) {
                userRef.current.style.display = ""
                return
            }

            userRef.current.style.display = "block"
        }
    }

    const changeTheme = (): void => {
        document.querySelector("html")?.toggleAttribute("dark")
        localStorage.setItem("theme", document.querySelector("html")?.hasAttribute("dark") ? "dark" : "light")
        setTheme(document.querySelector("html")?.hasAttribute("dark") ? "Dark" : "Light")
    }

    const toggleSearchMobile = (): void => {
        if(topHeadRef.current) topHeadRef.current.toggleAttribute("search")
    }

    return (
        <div id="top-head" ref={topHeadRef}>
            <div id="top-head-left">
                <button id="back" className="low-hover" onClick={toggleSearchMobile}>
                    <div className="svg-theme-change">
                        <svg mirror-in-rtl="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false">
                            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
                        </svg>
                    </div>
                </button>
                <button id="menu" className="low-hover" onClick={toggleMenu}>
                    <div className="svg-theme-change">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false">
                            <path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path>
                        </svg>
                    </div>
                </button>
                <a href="/">
                    <div id="youtube-logo" className="svg-theme-change">
                        <svg xmlns="http://www.w3.org/2000/svg" className="external-icon" viewBox="0 0 90 20" focusable="false">
                            <svg viewBox="0 0 90 20" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                                <g>
                                    <path d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z" fill="#FF0000"></path>
                                    <path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white"></path>
                                </g>
                                <g>
                                    <g>
                                        <path d="M34.6024 13.0036L31.3945 1.41846H34.1932L35.3174 6.6701C35.6043 7.96361 35.8136 9.06662 35.95 9.97913H36.0323C36.1264 9.32532 36.3381 8.22937 36.665 6.68892L37.8291 1.41846H40.6278L37.3799 13.0036V18.561H34.6001V13.0036H34.6024Z"></path>
                                        <path d="M41.4697 18.1937C40.9053 17.8127 40.5031 17.22 40.2632 16.4157C40.0257 15.6114 39.9058 14.5437 39.9058 13.2078V11.3898C39.9058 10.0422 40.0422 8.95805 40.315 8.14196C40.5878 7.32588 41.0135 6.72851 41.592 6.35457C42.1706 5.98063 42.9302 5.79248 43.871 5.79248C44.7976 5.79248 45.5384 5.98298 46.0981 6.36398C46.6555 6.74497 47.0647 7.34234 47.3234 8.15137C47.5821 8.96275 47.7115 10.0422 47.7115 11.3898V13.2078C47.7115 14.5437 47.5845 15.6161 47.3329 16.4251C47.0812 17.2365 46.672 17.8292 46.1075 18.2031C45.5431 18.5771 44.7764 18.7652 43.8098 18.7652C42.8126 18.7675 42.0342 18.5747 41.4697 18.1937ZM44.6353 16.2323C44.7905 15.8231 44.8705 15.1575 44.8705 14.2309V10.3292C44.8705 9.43077 44.7929 8.77225 44.6353 8.35833C44.4777 7.94206 44.2026 7.7351 43.8074 7.7351C43.4265 7.7351 43.156 7.94206 43.0008 8.35833C42.8432 8.77461 42.7656 9.43077 42.7656 10.3292V14.2309C42.7656 15.1575 42.8408 15.8254 42.9914 16.2323C43.1419 16.6415 43.4123 16.8461 43.8074 16.8461C44.2026 16.8461 44.4777 16.6415 44.6353 16.2323Z"></path>
                                        <path d="M56.8154 18.5634H54.6094L54.3648 17.03H54.3037C53.7039 18.1871 52.8055 18.7656 51.6061 18.7656C50.7759 18.7656 50.1621 18.4928 49.767 17.9496C49.3719 17.4039 49.1743 16.5526 49.1743 15.3955V6.03751H51.9942V15.2308C51.9942 15.7906 52.0553 16.188 52.1776 16.4256C52.2999 16.6631 52.5045 16.783 52.7914 16.783C53.036 16.783 53.2712 16.7078 53.497 16.5573C53.7228 16.4067 53.8874 16.2162 53.9979 15.9858V6.03516H56.8154V18.5634Z"></path>
                                        <path d="M64.4755 3.68758H61.6768V18.5629H58.9181V3.68758H56.1194V1.42041H64.4755V3.68758Z"></path>
                                        <path d="M71.2768 18.5634H69.0708L68.8262 17.03H68.7651C68.1654 18.1871 67.267 18.7656 66.0675 18.7656C65.2373 18.7656 64.6235 18.4928 64.2284 17.9496C63.8333 17.4039 63.6357 16.5526 63.6357 15.3955V6.03751H66.4556V15.2308C66.4556 15.7906 66.5167 16.188 66.639 16.4256C66.7613 16.6631 66.9659 16.783 67.2529 16.783C67.4974 16.783 67.7326 16.7078 67.9584 16.5573C68.1842 16.4067 68.3488 16.2162 68.4593 15.9858V6.03516H71.2768V18.5634Z"></path>
                                        <path d="M80.609 8.0387C80.4373 7.24849 80.1621 6.67699 79.7812 6.32186C79.4002 5.96674 78.8757 5.79035 78.2078 5.79035C77.6904 5.79035 77.2059 5.93616 76.7567 6.23014C76.3075 6.52412 75.9594 6.90747 75.7148 7.38489H75.6937V0.785645H72.9773V18.5608H75.3056L75.5925 17.3755H75.6537C75.8724 17.7988 76.1993 18.1304 76.6344 18.3774C77.0695 18.622 77.554 18.7443 78.0855 18.7443C79.038 18.7443 79.7412 18.3045 80.1904 17.4272C80.6396 16.5476 80.8653 15.1765 80.8653 13.3092V11.3266C80.8653 9.92722 80.7783 8.82892 80.609 8.0387ZM78.0243 13.1492C78.0243 14.0617 77.9867 14.7767 77.9114 15.2941C77.8362 15.8115 77.7115 16.1808 77.5328 16.3971C77.3564 16.6158 77.1165 16.724 76.8178 16.724C76.585 16.724 76.371 16.6699 76.1734 16.5594C75.9759 16.4512 75.816 16.2866 75.6937 16.0702V8.96062C75.7877 8.6196 75.9524 8.34209 76.1852 8.12337C76.4157 7.90465 76.6697 7.79646 76.9401 7.79646C77.2271 7.79646 77.4481 7.90935 77.6034 8.13278C77.7609 8.35855 77.8691 8.73485 77.9303 9.26636C77.9914 9.79787 78.022 10.5528 78.022 11.5335V13.1492H78.0243Z"></path>
                                        <path d="M84.8657 13.8712C84.8657 14.6755 84.8892 15.2776 84.9363 15.6798C84.9833 16.0819 85.0821 16.3736 85.2326 16.5594C85.3831 16.7428 85.6136 16.8345 85.9264 16.8345C86.3474 16.8345 86.639 16.6699 86.7942 16.343C86.9518 16.0161 87.0365 15.4705 87.0506 14.7085L89.4824 14.8519C89.4965 14.9601 89.5035 15.1106 89.5035 15.3011C89.5035 16.4582 89.186 17.3237 88.5534 17.8952C87.9208 18.4667 87.0247 18.7536 85.8676 18.7536C84.4777 18.7536 83.504 18.3185 82.9466 17.446C82.3869 16.5735 82.1094 15.2259 82.1094 13.4008V11.2136C82.1094 9.33452 82.3987 7.96105 82.9772 7.09558C83.5558 6.2301 84.5459 5.79736 85.9499 5.79736C86.9165 5.79736 87.6597 5.97375 88.1771 6.32888C88.6945 6.684 89.059 7.23433 89.2707 7.98457C89.4824 8.7348 89.5882 9.76961 89.5882 11.0913V13.2362H84.8657V13.8712ZM85.2232 7.96811C85.0797 8.14449 84.9857 8.43377 84.9363 8.83593C84.8892 9.2381 84.8657 9.84722 84.8657 10.6657V11.5641H86.9283V10.6657C86.9283 9.86133 86.9001 9.25221 86.846 8.83593C86.7919 8.41966 86.6931 8.12803 86.5496 7.95635C86.4062 7.78702 86.1851 7.7 85.8864 7.7C85.5854 7.70235 85.3643 7.79172 85.2232 7.96811Z"></path>
                                    </g>
                                </g>
                            </svg>
                        </svg>
                    </div>
                </a>
            </div>
            <div id="top-head-center">
                <div ref={searchIdRef} id="search">
                    <div ref={searchIconRightRef} id="search-icon-right" className="svg-theme-change">
                        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false">
                            <path d="m20.87 20.17-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"></path>
                        </svg>
                    </div>
                    <input
                        ref={searchRef}
                        onKeyDown={onEnterDown}
                        onFocus={onFocusOnInput}
                        onBlur={onBlurOnInput}
                        onChange={onSearchInput}
                        type="text" autoComplete="off" aria-label="Search"
                        defaultValue={search.startsWith("?search_query=") ? normalizeString(search.split("?search_query=")[1]) : ""}
                        placeholder="Search" autoCorrect="off"
                    />
                    <button ref={clearBtnRef} onClick={clearSearchInput} id="clear-button" className="low-hover">
                        <div className="svg-theme-change">
                            <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false">
                                <path d="m12.71 12 8.15 8.15-.71.71L12 12.71l-8.15 8.15-.71-.71L11.29 12 3.15 3.85l.71-.71L12 11.29l8.15-8.15.71.71L12.71 12z"></path>
                            </svg>
                        </div>
                    </button>
                </div>
                <a id="search-button" href={searchQuery ? `/results?search_query=${searchQuery}` : "#"}>
                    <span>Search</span>
                    <div className="svg-theme-change">
                        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false">
                            <path d="m20.87 20.17-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"></path>
                        </svg>
                    </div>
                </a>
                <button id="search-voice" className="low-hover">
                    <span>Search with your voice</span>
                    <div className="svg-theme-change">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false">
                            <path d="M12 3c-1.66 0-3 1.37-3 3.07v5.86c0 1.7 1.34 3.07 3 3.07s3-1.37 3-3.07V6.07C15 4.37 13.66 3 12 3zm6.5 9h-1c0 3.03-2.47 5.5-5.5 5.5S6.5 15.03 6.5 12h-1c0 3.24 2.39 5.93 5.5 6.41V21h2v-2.59c3.11-.48 5.5-3.17 5.5-6.41z"></path>
                        </svg>
                    </div>
                </button>
            </div>
            <div id="top-head-right">
                <button id="search-right" className="low-hover" onClick={toggleSearchMobile}>
                    <span>Search</span>
                    <div className="svg-theme-change">
                        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false">
                            <path d="m20.87 20.17-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"></path>
                        </svg>
                    </div>
                </button>
                <button id="search-voice-right" className="low-hover">
                    <span>Search with your voice</span>
                    <div className="svg-theme-change">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false">
                            <path d="M12 3c-1.66 0-3 1.37-3 3.07v5.86c0 1.7 1.34 3.07 3 3.07s3-1.37 3-3.07V6.07C15 4.37 13.66 3 12 3zm6.5 9h-1c0 3.03-2.47 5.5-5.5 5.5S6.5 15.03 6.5 12h-1c0 3.24 2.39 5.93 5.5 6.41V21h2v-2.59c3.11-.48 5.5-3.17 5.5-6.41z"></path>
                        </svg>
                    </div>
                </button>
                <button id="upload" className="low-hover">
                    <span>Upload</span>
                    <div className="svg-theme-change">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false">
                            <title>outlined copy</title>
                            <path d="M17 18v1H6v-1ZM6.49 9l.71.71 3.8-3.8V16h1V5.91l3.8 3.81.71-.72-5-5Z"></path>
                        </svg>
                    </div>
                </button>
                <button id="notifications" className="low-hover">
                    <span>Notifications</span>
                    <div className="svg-theme-change">
                        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false">
                            <path d="M10 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm10-2.65V19H4v-1.65l2-1.88v-5.15C6 7.4 7.56 5.1 10 4.34v-.38c0-1.42 1.49-2.5 2.99-1.76.65.32 1.01 1.03 1.01 1.76v.39c2.44.75 4 3.06 4 5.98v5.15l2 1.87zm-1 .42-2-1.88v-5.47c0-2.47-1.19-4.36-3.13-5.1-1.26-.53-2.64-.5-3.84.03C8.15 6.11 7 7.99 7 10.42v5.47l-2 1.88V18h14v-.23z"></path>
                        </svg>
                    </div>
                </button>
                <div className="user-unique-0pln" ref={userBtnRef} role="button" tabIndex={0} id="user">
                    <img className="user-unique-0pln" src={user} alt="User" onClick={toggleUser} />
                    <div className="user-unique-0pln" ref={userRef}>
                        <div className="user-unique-0pln" id="user-info">
                            <img className="user-unique-0pln" src={user} alt="User" />
                            <div className="user-unique-0pln">
                                <p className="user-unique-0pln">User</p>
                                <p className="user-unique-0pln">@user</p>
                            </div>
                        </div>
                        <button id="appearence" className="low-hover-lighter user-unique-0pln" onClick={changeTheme}>
                            <div className="svg-theme-change user-unique-0pln">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false">
                                    <path d="M12 22C10.93 22 9.86998 21.83 8.83998 21.48L7.41998 21.01L8.83998 20.54C12.53 19.31 15 15.88 15 12C15 8.12 12.53 4.69 8.83998 3.47L7.41998 2.99L8.83998 2.52C9.86998 2.17 10.93 2 12 2C17.51 2 22 6.49 22 12C22 17.51 17.51 22 12 22ZM10.58 20.89C11.05 20.96 11.53 21 12 21C16.96 21 21 16.96 21 12C21 7.04 16.96 3 12 3C11.53 3 11.05 3.04 10.58 3.11C13.88 4.81 16 8.21 16 12C16 15.79 13.88 19.19 10.58 20.89Z"></path>
                                </svg>
                            </div>
                            <span className="user-unique-0pln">Appearence: {theme}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopHead