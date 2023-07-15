import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";



function HomePage({ handleLogout }) {
	const navigate = useNavigate();
	const routeChange = () => {
        let path = '/login';
        navigate(path);
    };
    useEffect(() => {
        const authToken = getAuth();
        onAuthStateChanged(authToken, (user) =>{
            if (!user) {
                routeChange();

            }
        })

    }, [])


 	return (
    	<div className='HomePage'>
            <nav className='right-nav'>
            <button className="logout-button" onClick={handleLogout}>Logout</button>

            </nav>

			<br></br>
			<div className="block5">
				
				<Link to = "signup">
					<button type="Search" id="Search" className="HomePageButton" >Application</button>
				</Link>
				<Link to = "Search">
					<button type="Search" id="Search" className="HomePageButton" >Search</button>
				</Link>
			</div>

			
			
		</div>
	);
}

export default HomePage;