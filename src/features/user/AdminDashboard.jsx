/**
 * @file
 * This file contains the AdminDashboard component which is responsible for rendering the admin dashboard.
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * AdminDashboard component.
 * This component is responsible for rendering the admin dashboard.
 * It fetches the users from the server and provides a function to delete a user.
 *
 * @function
 * @returns {JSX.Element} The rendered component.
 */
export default function AdminDashboard() {
	/**
	 * State and setter for every users in the database.
	 * @type {Array}
	 */
	const [users, setUsers] = useState([]);
	/**
	 * State and setter for isLoading.
	 * @type {boolean}
	 */
	const [isLoading, setIsLoading] = useState(false);

	/**
	 * Fetches the users from the server.
	 */
	function fetchUsers() {
		axios
			.get('http://localhost:8080/user')
			.then(response => {
				setUsers(response.data);
			})
			.then(() => setIsLoading(false));
	}

	/**
	 * Fetches the users when the component mounts.
	 */
	useEffect(() => {
		setIsLoading(true);
		fetchUsers();
		console.log(users);
	}, []);

	/**
	 * Sends a delete request to the server to delete a user.
	 * @param {string} id - The ID of the user to delete.
	 */
	function deleteUser(id) {
		if (window.confirm('Are you sure you want to delete this user?')) {
			axios
				.delete(`http://localhost:8080/user/${id}`)
				.then(() => {
					setUsers(users.filter(user => user.id !== id));
				})
				.catch(error => {
					console.error(error);
				});
		}
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

						<button
							className="deleteButton"
							onClick={() => deleteUser(user.id)}
						>
							Delete
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
