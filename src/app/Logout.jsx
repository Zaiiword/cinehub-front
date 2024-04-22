import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
	const navigate = useNavigate();

	useEffect(() => {
		// Effacer les informations d'authentification
		// Vous devrez remplacer cette ligne par votre propre logique d'effacement des informations d'authentification
		localStorage.removeItem('token');
		sessionStorage.removeItem('isAuthenticated');

		// Rediriger vers la page de connexion
		navigate('/login');
	}, [navigate]);

	return null;
}
