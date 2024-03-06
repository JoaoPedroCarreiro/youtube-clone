import React from "react"
import "./NavItem.scss"

interface NavItemProps {
    children: React.ReactNode,
    href?: string,
    className?: string,
    name?: string,
    id?: string,
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

const NavItem: React.FC<NavItemProps> = ({ children, href="#", className="", name="", id="", onClick=() => {} }) => {
    return (
        <a href={href} onClick={onClick} id={id} className={`nav-item low-hover-lighter ${className}`}>
            <div style={{ display: "flex", alignItems: "center" }} className="svg-theme-change">
                {children}
            </div>
            <span>{name}</span>
        </a>
    )
}

export default NavItem