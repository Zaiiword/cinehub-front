import { useEffect, useState } from 'react';
import axios from 'axios';
import EditUserForm from './EditUserForm';

function UserDetail() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		axios
			.get('http://localhost:8080/user/me')
			.then(response => {
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
		<>
			<div className="user-detail">
				<h2>{user.name}</h2>
				<p>{user.firstName}</p>
				<p>{user.mail}</p>
				<p>{user.language}</p>
				<p>{user.role}</p>
				<img src={user.profilePicture} alt="Profile" />
			</div>
			<EditUserForm />
		</>
	);
}

export default UserDetail;
