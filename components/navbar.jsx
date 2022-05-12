import Link from 'next/link';
import Image from 'next/image'
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {clearLocalStorage} from '../utils/storage.util';
import {removeCookies} from 'cookies-next';
import verifyToken from '../services/verifyToken';

const Navbar = () => {
    const router = useRouter();
    let [loggedIn, setLoggedIn ] = useState(false);

    let [ProfileImage, setProfileImage] = useState('/img/profile_pic.png');

    let [enableScrollbar, setEnableScrollbar] = useState(false);

    const [scrollY, setScrollY] = useState(0);

    const logoutClick = (e) => {
        e.preventDefault();
        removeCookies('Login');
        clearLocalStorage();
        router.replace("/account/login");
    };

    useEffect(() => {


        const data = verifyToken()
        
        setLoggedIn(data.verified)


        const handleScroll = () => {
            setEnableScrollbar(window.pageYOffset >= 40);
        };
        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };



        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (<div className="header" id='nav_main'>
        <nav
            className={["navbar navbar-expand-md navbar-dark sticky-top", (enableScrollbar === false && router.pathname === "/dashboard") ? "bgx-navbar2" : "bgx-navbar"].join(" ")}
            id='navbar1'>
            <div className="container pe-md-5">
                <a className="navbar-brand text-white" href="./"><h5 style={{marginBottom: 0}}><b>LOGO</b></h5></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="nav navbar-text d-flex d-md-none">
                    {loggedIn? 
                   ( <><li className="dropdown">
                        <a className="nav-link dropdown-toggle"  id="navbarScrollingDropdown" role="button"
                           data-bs-toggle="dropdown" aria-expanded="false">
                            <Image src={ProfileImage} className="img-avatar" alt="avatar" width={32} height={32}/>
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                            <li><Link href='/profile'><a className="dropdown-item">Profile</a></Link></li>
                            <li><Link href='/wishlist'><a className="dropdown-item">Wishlist</a></Link></li>
                            <li><Link href='/orderhistory'><a className="dropdown-item">Order history</a></Link></li>
                            <li><Link href='/settings'><a className="dropdown-item">Settings</a></Link></li>
                            <li><a className="dropdown-item" onClick={(e) => logoutClick(e)}>Log Out</a></li>
                        </ul>
                    </li>
                    <a  className="nav-link text-white mx-1 mt-1"><i className="fa fa-bell"></i></a>
                    <a  href='/cart' className="nav-link  text-white mx-1 mt-1"><i className="fa fa-shopping-cart"></i></a> </>) :<> <Link href='/account/login'><a  className="nav-link text-white mx-1 mt-1"><i className="fa fa-right-to-bracket"></i> Login </a></Link></>}
                </div>

                <div className="collapse navbar-collapse align-items-center" id="navbarTogglerDemo02"
                     style={{padding: 0.0}}>
                    <ul className="navbar-nav m-auto mb-2 mb-md-2">
                        <li className="nav-item">
                            <Link href='/home'><a
                                className={["nav-link", router.pathname === "/home" ? "active" : ""].join(" ")}
                                aria-current="page">Home</a></Link>
                        </li>
                        <li className="nav-item">
                            <Link href='/message'><a
                                className={["nav-link", router.pathname === "/message" ? "active" : ""].join(" ")}
                                aria-current="page">Message</a></Link>
                        </li>
                        <li className="nav-item">
                            <Link href='/sell'><a
                                className={["nav-link", router.pathname === "/sell" ? "active" : ""].join(" ")}
                                aria-current="page">Sell</a></Link>
                        </li>
                        <li className="nav-item">
                            <Link href='/lend'><a
                                className={["nav-link", router.pathname === "/lend" ? "active" : ""].join(" ")}
                                aria-current="page">Lend</a></Link>
                        </li>
                    </ul>

                    <div className="nav navbar-text ml-auto d-none d-md-flex">
                        {loggedIn? 
                    ( <><li className="dropdown">
                            <a className="nav-link dropdown-toggle"  id="navbarScrollingDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                                <Image src={ProfileImage} className="img-avatar" alt="avatar" width={32} height={32}/>
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                                <li><Link href='/profile'><a className="dropdown-item">Profile</a></Link></li>
                                <li><Link href='/wishlist'><a className="dropdown-item">Wishlist</a></Link></li>
                                <li><Link href='/orderhistory'><a className="dropdown-item">Order history</a></Link></li>
                                <li><Link href='/settings'><a className="dropdown-item">Settings</a></Link></li>
                                <li><a className="dropdown-item" onClick={(e) => logoutClick(e)}>Log Out</a></li>
                            </ul>
                        </li>
                        <a  href='#' className="nav-link text-white mx-1 mt-1"><i className="fa fa-bell"></i></a>
                        <a  href='/cart' className="nav-link  text-white mx-1 mt-1"><i className="fa fa-shopping-cart"></i></a> </>) :<> <Link href='/account/login'><a  className="nav-link text-white mx-1 mt-1"><i className="fa fa-right-to-bracket"></i> Login </a></Link></>}
                    </div>
                   

                </div>


            </div>
        </nav>
    </div>)

}

export default Navbar