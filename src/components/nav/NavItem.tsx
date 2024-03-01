import React from "react"
import "./NavItem.scss"

interface NavItemProps {
    children: React.ReactNode,
    className?: string,
    name?: string,
    id?: string,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const NavItem: React.FC<NavItemProps> = ({ children, className="", name="", id="", onClick=() => {} }) => {
    return (
        <button onClick={onClick} id={id} className={`nav-item low-hover-lighter ${className}`}>
            <div style={{ display: "flex", alignItems: "center" }} className="svg-theme-change">
                {children}
            </div>
            <span>{name}</span>
        </button>
    )
}

export default NavItem