/* eslint-disable @next/next/no-img-element */
import { removeCookies } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import verifyToken from '../services/verifyToken';
import { clearLocalStorage } from '../utils/storage.util';

const Navbar = () => {
  const router = useRouter();
  let [loggedIn, setLoggedIn] = useState(false);

  let [ProfileImage, setProfileImage] = useState('/img/profile_pic.png');

  let [enableScrollbar, setEnableScrollbar] = useState(false);

  const [scrollY, setScrollY] = useState(0);

  const logoutClick = (e) => {
    e.preventDefault();
    removeCookies('Login');
    clearLocalStorage();
    router.replace('/account/login');
  };

  useEffect(() => {
    const data = verifyToken();

    setLoggedIn(data.verified);

    const handleScroll = () => {
      setEnableScrollbar(window.pageYOffset >= 40);
    };
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="header" id="nav_main">
      <nav
        className={[
          'navbar navbar-expand-md navbar-dark sticky-top',
          enableScrollbar === false && router.pathname === '/dashboard' ? 'bgx-navbar2' : 'bgx-navbar'
        ].join(' ')}
        id="navbar1"
      >
        <div className="container pe-md-5">
          <a className="navbar-brand text-white">
            <h5 style={{ marginBottom: 0 }}>
              <img src="/logo.png" style={{ height: '50px', width: '80px' }} alt="logo"></img>
            </h5>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="nav navbar-text d-flex d-md-none">
            {loggedIn ? (
              <>
                <li className="dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    id="navbarScrollingDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img src={ProfileImage} className="img-avatar" alt="avatar" />
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                    <li>
                      <Link href="/profile">
                        <a className="dropdown-item">Profile</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/wishlist">
                        <a className="dropdown-item">Wishlist</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/orderhistory">
                        <a className="dropdown-item">Order history</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/settings">
                        <a className="dropdown-item">Settings</a>
                      </Link>
                    </li>
                    <li>
                      <a className="dropdown-item" onClick={(e) => logoutClick(e)}>
                        Log Out
                      </a>
                    </li>
                  </ul>
                </li>
                <a className="nav-link text-white mx-1 mt-1 position-relative">
                    <i className="fa fa-bell"></i>
                    <span className="position-absolute top-0 badge bg-white text-danger rounded-pill badge-small">3</span>
                  </a>
                  <Link href="/cart">
                    <a className="nav-link  text-white mx-1 mt-1 position-relative">
                      <i className="fa fa-shopping-cart"></i>
                      <small className="position-absolute top-0 badge bg-white text-danger rounded-pill badge-small">2</small>
                    </a>
                  </Link>
              </>
            ) : (
              <>
                <Link href="/account/login">
                  <a className="nav-link text-white mx-1 mt-1">
                    <i className="fa fa-right-to-bracket"></i> Login
                  </a>
                </Link>
              </>
            )}
          </div>

          <div
            className="collapse navbar-collapse align-items-center"
            id="navbarTogglerDemo02"
            style={{ padding: 0.0 }}
          >
            <ul className={['navbar-nav m-auto', loggedIn ? 'mb-3 mb-md-3' : 'mb-5 mb-md-2'].join(' ')}>
              {!loggedIn ? (
                <li className="nav-item">
                  <Link href="/home">
                    <a
                      className={['nav-link', router.pathname === '/home' ? 'active' : ''].join(' ')}
                      aria-current="page"
                    >
                      Home
                    </a>
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link href="/dashboard">
                    <a
                      className={['nav-link', router.pathname === '/dashboard' ? 'active' : ''].join(' ')}
                      aria-current="page"
                    >
                      Dashboard
                    </a>
                  </Link>
                </li>
              )}
            </ul>

            <div className="nav navbar-text ml-auto d-none d-md-flex">
              {loggedIn ? (
                <>
                  <li className="dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      id="navbarScrollingDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={ProfileImage} className="img-avatar" alt="avatar" />
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                      <li>
                        <Link href="/profile">
                          <a className="dropdown-item">Profile</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/wishlist">
                          <a className="dropdown-item">Wishlist</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/orderhistory">
                          <a className="dropdown-item">Order history</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/product/addproduct">
                          <a className="dropdown-item">Add Product</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/sell">
                          <a className="dropdown-item">Sell</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/settings">
                          <a className="dropdown-item">Settings</a>
                        </Link>
                      </li>
                      <li>
                        <a className="dropdown-item" onClick={(e) => logoutClick(e)}>
                          Log Out
                        </a>
                      </li>
                    </ul>
                  </li>
                  <a className="nav-link text-white mx-1 mt-1 position-relative">
                    <i className="fa fa-bell"></i>
                    <span className="position-absolute top-0 badge bg-white text-danger rounded-pill badge-small">3</span>
                  </a>
                  <Link href="/cart">
                    <a className="nav-link  text-white mx-1 mt-1 position-relative">
                      <i className="fa fa-shopping-cart"></i>
                      <small className="position-absolute top-0 badge bg-white text-danger rounded-pill badge-small">2</small>
                    </a>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/account/login">
                    <a className="nav-link text-white mx-1 mt-1">
                      <i className="fa fa-right-to-bracket"></i> Login
                    </a>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
