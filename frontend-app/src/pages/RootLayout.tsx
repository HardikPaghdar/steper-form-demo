import React, {useEffect} from 'react'
import {Outlet, useNavigate} from 'react-router-dom'

const RootLayout: React.FC = () => {
	const navigate = useNavigate();
	useEffect(() => {
		if (performance.navigation.type === performance.navigation.TYPE_NAVIGATE || performance.navigation.type === performance.navigation.TYPE_RELOAD) {
			navigate('/step-1');
		}
	}, [navigate]);

	return (
		<div className="root">
			<Outlet />
		</div>
	)
}

export default RootLayout
