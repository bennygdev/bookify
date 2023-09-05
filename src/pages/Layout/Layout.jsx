import Navbar from '../../components/Navigation/Navbar';
import styles from './Layout.module.css';
import { Outlet } from "react-router-dom";

function Layout(props) {
  return (
    <div className={styles.layout}>
        <Navbar />
        {props.children}

        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default Layout