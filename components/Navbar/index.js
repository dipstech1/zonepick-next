import Link from 'next/link';

const Navbar = () => {
    return (
        <>
           

            <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container pe-lg-5">
            <a href="#" className="navbar-brand">
               <h6 className="text-white"><b>LOGO</b></h6>
            </a>
            <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <span className="navbar-text loginbtn d-block d-lg-none">
              <div className="dropdown">
                <button className="btn dropdown-toggle p-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="/img/profile_pic.png"/>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><Link href="profile"><a className="dropdown-item" >Profile</a></Link></li>
                  <li><Link href="wishlist"><a className="dropdown-item" >Wishlist</a></Link></li>
                  <li><Link href="orderhistory"><a className="dropdown-item" >Wishlist</a></Link></li>
                  <li><a className="dropdown-item" href="#">Settings</a></li>
                  <li><a className="dropdown-item" href="login.html">Log Out</a></li>
                </ul>
              </div>
            </span>
            <a href="#" className="text-white me-2 d-lg-none"><i className="fas fa-bell"></i></a>
            <a href="#" className="text-white me-2 d-lg-none"><i className="fas fa-shopping-cart"></i></a>

            <div className="collapse navbar-collapse align-items-center" id="navbarCollapse">
              <ul className="navbar-nav m-auto mb-2 mt-0 mb-lg-0">
                <li className="nav-item">
                  <Link href='/dashboard'>
                    <a className="nav-link">Home</a>
                  </Link>
                </li>
                <Link href='/profile'>
                    <a className="nav-link">Profile</a>
                  </Link>
                <li className="nav-item">
                  <a className="nav-link" href="sell_photo.html">Sell</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="product_list.html">Lend</a>
                </li>
              </ul>
              <div className="navbar-text loginbtn d-none d-lg-flex align-items-center">
                <span>
                  <div className="dropdown">
                    <button className="btn dropdown-toggle p-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="/img/profile_pic.png"/>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><Link href="profile"><a className="dropdown-item" >Profile</a></Link></li>
                    <li><Link href="wishlist"><a className="dropdown-item" >Wishlist</a></Link></li>
                  <li><Link href="orderhistory"><a className="dropdown-item" >Order history</a></Link></li>
                      <li><a className="dropdown-item" href="#">Settings</a></li>
                      <li><a className="dropdown-item" href="login.html">Log Out</a></li>
                    </ul>
                  </div>
                </span>
                <a href="#" className="text-white me-2 d-none d-lg-block"><i className="fas fa-bell"></i></a>
                <a href="#" className="text-white me-2 d-none d-lg-block"><i className="fas fa-shopping-cart"></i></a>
              </div>
            </div>
        </div>
    </nav>
    </header>
        </>
    )
}

export default Navbar