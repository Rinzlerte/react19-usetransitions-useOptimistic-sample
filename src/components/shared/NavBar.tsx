import { Link } from "react-router"
const NavBar = () => {
  return (
    <div className="p-2 flex justify-start items-start">
        <Link to={"/"}>Home Page</Link>
    </div>
  )
}

export default NavBar