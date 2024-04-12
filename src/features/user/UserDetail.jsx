import { useState } from 'react';

export default function UserDetail() {
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState(null);

	useEffect(() => {
		fetch('/api/user')
			.then(response => response.json())
			.then(data => {
				setUser(data);
				setIsLoading(false);
			})
			.catch(error => {
				console.error('Error fetching user data:', error);
				setIsLoading(false);
			});
	}, []);

	return (
		<div className="pageContainer">
			{isLoading ? (
				<div className="is-loading"></div>
			) : (
				<div className="pageContent">
					{user ? (
						<>
							<div className="userInformations">
								<h1>{user.name}</h1>
								<p>Email: {user.email}</p>
							</div>
							<div className="userPicture">
								<img src={user.picture} alt={user.name} />
							</div>
						</>
					) : (
						<p>No user data available.</p>
					)}
				</div>
			)}
		</div>
	);
}
