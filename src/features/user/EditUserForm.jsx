import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditUserForm() {
	const [isEditing, setIsEditing] = useState(false);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmNewPassword, setConfirmNewPassword] = useState('');
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		axios
			.get('http://localhost:8080/user/me')
			.then(response => {
				setUserId(response.data.id);
			})
			.catch(error => {
				console.error(error);
			});
	}, []);

	const handleSubmit = async event => {
		event.preventDefault();
		try {
			await axios.patch(`http://localhost:8080/user/${userId}`, {
				username,
				email,
				newPassword,
			});
			setIsEditing(false);
		} catch (error) {
			console.error('Error:', error.response.data);
		}
	};

	return (
		<div className="edit-user-form">
			<button onClick={() => setIsEditing(!isEditing)}>
				{isEditing ? 'Cancel' : 'Edit'}
			</button>

			{isEditing && (
				<form onSubmit={handleSubmit}>
					<label>
						Username:
						<input
							className="edit-user-input"
							type="text"
							value={username}
							onChange={e => setUsername(e.target.value)}
						/>
					</label>
					<label>
						Email:
						<input
							className="edit-user-input"
							type="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
					</label>
					<label>
						New Password:
						<input
							className="edit-user-input"
							type="password"
							value={newPassword}
							onChange={e => setNewPassword(e.target.value)}
						/>
					</label>
					<label>
						Confirm New Password:
						<input
							className="edit-user-input"
							type="password"
							value={confirmNewPassword}
							onChange={e => setConfirmNewPassword(e.target.value)}
						/>
					</label>
					<button className="edit-user-submit" type="submit">
						Submit
					</button>
				</form>
			)}
		</div>
	);
}

export default EditUserForm;
