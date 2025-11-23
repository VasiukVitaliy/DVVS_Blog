import { Link } from "react-router-dom"

export default function NavBar(){
    return(
        <nav className="flex flex-row justify-center mb-4">
          <Link to="/login" className="mr-4 text-blue-600">Логін</Link>
          <Link to="/registration" className="text-blue-600">Реєстрація</Link>
          <Link to="/" className="ml-4 text-blue-600">Назад</Link>
        </nav>
    )
}

