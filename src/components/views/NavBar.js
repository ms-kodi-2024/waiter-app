import { NavLink } from "react-router-dom";
import styles from './NavBar.module.scss';

const NavBar = () => {
	return (
		<div>
			<ul className='d-inline-flex list-inline my-0'>
				<li className="list-inline-item px-2">
					<NavLink className={({ isActive }) => isActive ? styles.linkActive : styles.link} to="/">Home</NavLink>
				</li>
			</ul>
		</div>
	)
}

export default NavBar;