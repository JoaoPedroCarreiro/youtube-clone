import "./NavItem.scss"

interface NavItemProps {
    children: React.ReactNode,
    className?: string,
    name?: string,
    id?: string,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function NavItem({ children, className="", name="", id="", onClick=(event: React.MouseEvent<HTMLButtonElement>): void => {} }: NavItemProps) {
    return (
        <button onClick={onClick} id={id} className={`nav-item low-hover-lighter ${className}`}>
            <div style={{ display: "flex", alignItems: "center" }} className="svg-theme-change">
                {children}
            </div>
            <span>{name}</span>
        </button>
    )
}