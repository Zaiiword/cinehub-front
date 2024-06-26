/**
 * @file
 * This file contains the AuthPage component which is responsible for rendering the login and registration forms.
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * AuthPage component.
 * This component is responsible for rendering the login and registration forms.
 * It manages the state of the form fields and validates the password.
 *
 * @function
 * @returns {JSX.Element} The rendered component.
 */
function AuthPage() {
	const [isLogin, setIsLogin] = useState(true);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [message, setMessage] = useState('');
	const [passwordStrength, setPasswordStrength] = useState({
		minLength: false,
		uppercase: false,
		lowercase: false,
		number: false,
		specialChar: false,
	});
	const [isError, setIsError] = useState(false);

	/**
	 * This effect validates the password whenever it changes.
	 * It checks for minimum length, presence of uppercase and lowercase letters, numbers, and special characters.
	 */
	useEffect(() => {
		setPasswordStrength({
			minLength: password.length >= 8,
			uppercase: /[A-Z]/.test(password),
			lowercase: /[a-z]/.test(password),
			number: /[0-9]/.test(password),
			specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password),
		});
	}, [password]);

	/**
	 * This effect validates the password whenever it changes.
	 * It checks for minimum length, presence of uppercase and lowercase letters, numbers, and special characters.
	 */
	const handleSubmit = event => {
		event.preventDefault();
		setIsError(false);
		if (!isLogin) {
			if (
				!passwordStrength.minLength ||
				!passwordStrength.uppercase ||
				!passwordStrength.lowercase ||
				!passwordStrength.number ||
				!passwordStrength.specialChar
			) {
				setMessage('Password does not meet all requirements');
				setIsError(true);
				return;
			}

			if (password !== confirmPassword) {
				setMessage('Passwords do not match');
				setIsError(true);
				return;
			}

			if (!username || !password || !firstName || !lastName) {
				setMessage('All fields must be filled out');
				setIsError(true);
				return;
			}
		}

		const url = isLogin
			? 'http://backend.cinehub.ovh/login'
			: 'http://backend.cinehub.ovh/user/register';
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
					// redirect to dashboard
					window.location.href = '/';
				} else {
					// Remove the form and switch to login mode
					setUsername('');
					setPassword('');
					setFirstName('');
					setIsLogin(true);
					setMessage('Registration successful !');
					setIsError(false);
				}
			})
			.catch(error => {
				console.error('Error:', error.response.data);
				if (!isLogin) {
					setMessage('An account with this email already exist');
					setIsError(true);
				}
				// handle error display
			});
	};

	const getButtonClass = loginState => {
		return `auth-button ${isLogin === loginState ? 'auth-button-active' : ''}`;
	};

	return (
		<div className="auth-page">
			{message && (
				<div className={isError ? 'message error' : 'message'}>{message}</div>
			)}
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
					<div className="check-condition">
						<div className={passwordStrength.minLength ? 'valid' : 'invalid'}>
							Minimum 8 characters
						</div>
						<div className={passwordStrength.uppercase ? 'valid' : 'invalid'}>
							Contains uppercase letter
						</div>
						<div className={passwordStrength.lowercase ? 'valid' : 'invalid'}>
							Contains lowercase letter
						</div>
						<div className={passwordStrength.number ? 'valid' : 'invalid'}>
							Contains number
						</div>
						<div className={passwordStrength.specialChar ? 'valid' : 'invalid'}>
							Contains special character
						</div>
					</div>
				)}
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
