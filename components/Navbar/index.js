import Link from 'next/link';

const Navbar = () => {
    return (
        <>
           

            <header class="header">
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container pe-lg-5">
            <a href="#" class="navbar-brand">
               <h6 class="text-white"><b>LOGO</b></h6>
            </a>
            <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span class="navbar-toggler-icon"></span>
            </button>
            <span class="navbar-text loginbtn d-block d-lg-none">
              <div class="dropdown">
                <button class="btn dropdown-toggle p-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="/img/profile_pic.png"/>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><a class="dropdown-item" href="user_profile.html">Profile</a></li>
                  <li><a class="dropdown-item" href="#">Settings</a></li>
                  <li><a class="dropdown-item" href="login.html">Log Out</a></li>
                </ul>
              </div>
            </span>
            <a href="#" class="text-white me-2 d-lg-none"><i class="fas fa-bell"></i></a>
            <a href="#" class="text-white me-2 d-lg-none"><i class="fas fa-shopping-cart"></i></a>

            <div class="collapse navbar-collapse align-items-center" id="navbarCollapse">
              <ul class="navbar-nav m-auto mb-2 mt-0 mb-lg-0">
                <li class="nav-item">
                  <Link href='/dashboard'>
                    <a class="nav-link">Home</a>
                  </Link>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Message</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="sell_photo.html">Sell</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="product_list.html">Lend</a>
                </li>
              </ul>
              <div class="navbar-text loginbtn d-none d-lg-flex align-items-center">
                <span>
                  <div class="dropdown">
                    <button class="btn dropdown-toggle p-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="/img/profile_pic.png"/>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><a class="dropdown-item" href="user_profile.html">Profile</a></li>
                      <li><a class="dropdown-item" href="#">Settings</a></li>
                      <li><a class="dropdown-item" href="login.html">Log Out</a></li>
                    </ul>
                  </div>
                </span>
                <a href="#" class="text-white me-2 d-none d-lg-block"><i class="fas fa-bell"></i></a>
                <a href="#" class="text-white me-2 d-none d-lg-block"><i class="fas fa-shopping-cart"></i></a>
              </div>
            </div>
        </div>
    </nav>
    </header>
        </>
    )
}

export default Navbar