import React from 'react'
import { Link } from 'react-router-dom';
import styles from './ControlPanel.module.css';

function Tile({icon, title, description, link}) {
  return (
    <div className={styles.method__container}>
        <Link to={link}>
            {icon}
            <h4>{title}</h4>
            <p>{description}</p>
            <span>View</span>
        </Link>
    </div>
  )
}

export default Tile