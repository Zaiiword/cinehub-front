import { useEffect, useState } from 'react';
import axios from 'axios';
import EditUserForm from './EditUserForm';

function UserDetail() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		axios
			.get('http://localhost:8080/user/me')
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
