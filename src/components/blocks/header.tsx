// nextdirect/src/components/header.tsx
import Image from "next/image"

export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">
            <Image src="/theme/logo.png" alt={`${process.env.NEXT_PUBLIC_SITE_NAME} Logo`} width={50} height={50} />
                {process.env.NEXT_PUBLIC_SITE_NAME}
            </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/login">Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/register">Register</a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    )};
