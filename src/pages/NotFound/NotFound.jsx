import {Link} from "react-router-dom";

function NotFound() {
  return (
    <div>
        <h1>Page not found!</h1>
        <p>Go back to <Link to="/" className="">Home</Link></p>
    </div>
  )
}

export default NotFound