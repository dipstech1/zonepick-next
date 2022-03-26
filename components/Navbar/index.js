import Link from 'next/link';
import styles from './navbar.module.css';

const Navbar = () => {
    return (
        <>
            <nav class={`${styles.navbg} navbar navbar-expand-sm`}>
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Logo</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-center" id="collapsibleNavbar">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <Link href='/dashboard'>
                                   <a  className={`${styles.navlinkcolor} nav-link`} >Home</a>
                                </Link>
                            </li>
                            <li class="nav-item">
                                <a className={`${styles.navlinkcolor} nav-link`} >Profile</a>
                            </li>
                            <li class="nav-item">
                                <Link href='/cart'>
                                    <a className={`${styles.navlinkcolor} nav-link`} >Cart</a>
                                </Link>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar