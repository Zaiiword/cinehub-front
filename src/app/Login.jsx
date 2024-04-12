import React, { useState } from 'react';

function AuthPage() {
	const [isLogin, setIsLogin] = useState(true);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');

	const handleSubmit = event => {
		event.preventDefault();
		// Handle login or registration logic here
	};

	const getButtonClass = loginState => {
		return `auth-button ${isLogin === loginState ? 'auth-button-active' : ''}`;
	};

	return (
		<div className="auth-page">
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
						<label className="auth-label">
							Email:
							<input
								className="auth-input"
								type="email"
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						</label>
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
