import React, { useState } from 'react';
import axios from 'axios';

function AuthPage() {
	const [isLogin, setIsLogin] = useState(true);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmit = event => {
		event.preventDefault();
		const url = isLogin
			? 'http://localhost:8080/login'
			: 'http://localhost:8080/user/register';
		const userData = isLogin
			? { username, password }
			: {
					name: lastName,
					firstName: firstName,
					mail: username,
					language: '',
					password: password,
					role: '',
				};

		axios
			.post(url, userData)
			.then(response => {
				localStorage.setItem('token', response.data.token);
				console.log(isLogin ? 'Login successful' : 'Registration successful');
				console.log(response.data.token);
				sessionStorage.setItem('isAuthenticated', 'true');
				if (isLogin) {
					// Rediriger vers le tableau de bord
					window.location.href = '/';
				} else {
					// Effacer le formulaire et passer en mode connexion
					setUsername('');
					setPassword('');
					setFirstName('');
					setIsLogin(true);
					setMessage('Registration successful !');
				}
			})
			.catch(error => {
				console.error('Error:', error.response.data);
				// Gérer l'affichage des messages d'erreur
			});
	};

	const getButtonClass = loginState => {
		return `auth-button ${isLogin === loginState ? 'auth-button-active' : ''}`;
	};

	return (
		<div className="auth-page">
			{message && <div className="message">{message}</div>}
			<div className="button-login">
				<button
					className={getButtonClass(true)}
					onClick={() => setIsLogin(true)}
				>
					Login
				</button>
				<button
					className={getButtonClass(false)}
					onClick={() => setIsLogin(false)}
				>
					Register
				</button>
			</div>
			<form className="auth-form" onSubmit={handleSubmit}>
				<label className="auth-label">
					Username:
					<input
						className="auth-input"
						type="text"
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
				</label>
				<label className="auth-label">
					Password:
					<input
						className="auth-input"
						type="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</label>
				{!isLogin && (
					<>
						<label className="auth-label">
							Confirm Password:
							<input
								className="auth-input"
								type="password"
								value={confirmPassword}
								onChange={e => setConfirmPassword(e.target.value)}
							/>
						</label>
						<label className="auth-label">
							First Name:
							<input
								className="auth-input"
								type="text"
								value={firstName}
								onChange={e => setFirstName(e.target.value)}
							/>
						</label>
						<label className="auth-label">
							Last Name:
							<input
								className="auth-input"
								type="text"
								value={lastName}
								onChange={e => setLastName(e.target.value)}
							/>
						</label>
						{/* <label className="auth-label">
							Email:
							<input
								className="auth-input"
								type="email"
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						</label> */}
					</>
				)}
				<input
					className="auth-submit"
					type="submit"
					value={isLogin ? 'Login' : 'Register'}
				/>
			</form>
		</div>
	);
}

export default AuthPage;
