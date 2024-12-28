import { Link, Outlet } from 'react-router-dom';

const BaseLayout = () => {
  return (
    <div className="layout">
      <header className="d-flex align-items-center justify-content-between bg-light p-3">
        <h1>
          <Link className="text-decoration-none text-dark" to="/">
            Purrfect Adoption
          </Link>
        </h1>
        <nav>
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/available-cats">
                Available Cats
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/about-us">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/contact-us">
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main id="content" className="p-4">
        <Outlet />
      </main>
      <footer className="bg-light text-center p-3">
        <p>© Copyright 2024 - Purrfect Adoption</p>
      </footer>
    </div>
  );
};

export default BaseLayout;
