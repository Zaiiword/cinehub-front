import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	function fetchUsers() {
		axios
			.get('http://localhost:8080/user')
			.then(response => {
				setUsers(response.data);
			})
			.then(() => setIsLoading(false));
	}

	useEffect(() => {
		setIsLoading(true);
		fetchUsers();
		console.log(users);
	}, []);

	function deleteUser(id) {
		axios
			.delete(`http://localhost:8080/user/${id}`)
			.then(() => {
				setUsers(users.filter(user => user.id !== id));
			})
			.catch(error => {
				console.error(error);
			});
	}

	return (
		<div className="adminDashboard">
			<h1>Admin Dashboard</h1>
			<div className="userList">
				<h2>Users</h2>
				{users?.map(user => (
					<div key={user.id} className="userListItem">
						{console.log(user)}
						<p>
							{user.firstName} {user.name}
						</p>
						{user.role === 'admin' && (
							<button
								className="deleteButton"
								onClick={() => deleteUser(user.id)}
							>
								Delete
							</button>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
