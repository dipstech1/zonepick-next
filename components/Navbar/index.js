import styles from './navbar.module.css'
const Navbar = () => {
    return (
        <>
            <ul className={styles.navUl}>
                <li><a href="#home">Home</a></li>
                <li><a href="#news">News</a></li>
                <li><a >Cart</a></li>
                <li><a >Item</a></li>
                <li><a >Logout</a></li>
            </ul>
        </>
    )
}

export default Navbar