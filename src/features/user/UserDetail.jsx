/**
 * @file
 * This file contains the UserDetail component which is responsible for rendering a user's details.
 */

import { useEffect, useState } from 'react';
import axios from 'axios';
import EditUserForm from './EditUserForm';

/**
 * UserDetail component.
 * This component is responsible for rendering a user's details.
 * It fetches the user's details from the server and displays them.
 * It also provides buttons to navigate to the user's watchlist and the admin dashboard (if the user is an admin).
 *
 * @function
 * @returns {JSX.Element} The rendered component.
 */
function UserDetail() {
	/**
	 * State and setter for user.
	 * @type {[Object, Function]}
	 */
	const [user, setUser] = useState(null);

	/**
	 * Fetches the user's details when the component mounts.
	 */
	useEffect(() => {
		axios
			.get('http://cinehub-back.us-east-1.elasticbeanstalk.com/user/me')
			.then(response => {
				console.log(response.data);
				setUser(response.data);
			})
			.catch(error => {
				console.error(error);
			});
	}, []);

	if (!user) {
		return <div>Loading...</div>;
	}

	return (
		<div className="user-container">
			<div className="user-detail">
				<img src={user?.profilePicture} alt="Profile Picture" />
				<div className="user-info">
					<h2>
						{user.firstName} {user.name}
					</h2>
					<p className="infoDetail">
						<span className="category">E-MAIL :</span>
						<span>{user.mail}</span>
					</p>
					<p className="infoDetail">
						<span className="category">NATIONALITY :</span>
						<span>{user.language}</span>
					</p>
					{user.role === 'admin' && (
						<p className="infoDetail">
							<span className="category">ROLE :</span>
							<span>{user.role}</span>
						</p>
					)}
				</div>
			</div>
			<EditUserForm />
			<div className="userButtons">
				<button
					onClick={() => {
						window.location.href = `/user/${user.id}/watchlist`;
					}}
				>
					<i className="fa-regular fa-clock"></i>
				</button>

				{user.role === 'admin' && (
					<button
						onClick={() => {
							window.location.href = `/admin/dashboard`;
						}}
					>
						<i className="fa-solid fa-shield"></i>{' '}
					</button>
				)}
			</div>
		</div>
	);
}

export default UserDetail;
