import NavBar from './NavBar';
import { Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<Stack direction='horizontal' className='bg-primary p-3 text-light fs-5 rounded-3 my-4'>
			<div className='me-auto'>
				<Link to="/" className='text-decoration-none text-white'>
					Waiter.app
				</Link>
			</div>
			<NavBar />
		</Stack>
	)
}

export default Header;