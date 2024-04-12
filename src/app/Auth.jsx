// import { useState, useEffect } from 'react';
// import axios from 'axios';

// // Hook personnalisé pour vérifier l'authentification
// function useAuth() {
// 	const [isAuthenticated, setIsAuthenticated] = useState(false);

// 	useEffect(() => {
// 		const checkAuth = async () => {
// 			try {
// 				const token = localStorage.getItem('authToken');
// 				// Remplacez '/api/auth/validate' par votre propre endpoint de validation du token
// 				const response = await axios.get('/api/auth/validate', {
// 					headers: {
// 						Authorization: `Bearer ${token}`,
// 					},
// 				});
// 				setIsAuthenticated(response.data.isAuthenticated);
// 			} catch (error) {
// 				console.error('Auth check failed', error);
// 				setIsAuthenticated(false);
// 			}
// 		};

// 		checkAuth();
// 	}, []); // Le tableau vide signifie que cet effet ne s'exécute qu'une fois après le premier rendu

// 	return isAuthenticated;
// }

// // Exemple d'utilisation dans un composant
// const PrivateRoute = ({ component: Component, ...rest }) => {
// 	const isAuth = useAuth();

// 	return (
// 		<Route
// 			{...rest}
// 			render={props =>
// 				isAuth ? <Component {...props} /> : <Redirect to="/login" />
// 			}
// 		/>
// 	);
// };
