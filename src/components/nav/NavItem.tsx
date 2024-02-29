import "./NavItem.scss"

interface NavItemProps {
    children: React.ReactNode,
    name: string,
    id?: string
}

export default function NavItem({ children, name, id="" }: NavItemProps) {
    return (
        <div id={id} className="nav-item low-hover-lighter">
            <div className="svg-theme-change">
                {children}
            </div>
            {name}
        </div>
    )
}