import React, {useState, useEffect} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";


 
const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    
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
    useEffect(() => {
        const fetchData = async () => {
          // Create a Firestore query based on the search query
          const q = query(collection(db, 'Applicants'), where('PfirstName', '==', searchQuery));
    
          // Fetch matching documents from Firestore
          const querySnapshot = await getDocs(q);
          const documents = querySnapshot.docs.map((doc) => doc.data());
    
          setSearchResults(documents);
        };
    
        if (searchQuery !== '') {
          fetchData();
        }
      }, [searchQuery]);
       
    const handleSearch = (e) => {
        e.preventDefault();
        setSearchResults([]);
        if (searchQuery !== ''){
            setSearchQuery(searchQuery.trim());
        }
    };
 
    return (
        <div>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter search query"
            />
            <button className="submit-button" type="submit">Search</button>
          </form>
    
          {searchResults.length > 0 ? (
            <div>
              <h3>Search Results:</h3>
              {searchResults.map((result) => (
                <><div>
                      <h1>Family Information</h1>
                  </div>
                  <h3>Primary Parent/Guardian</h3>
                  <div className="group1">

                          <label htmlFor="first-name" className="input-label">
                              First Name:
                          </label>
                          <div className='result-box'>
                            {result.PfirstName}
                          </div>

                          <label htmlFor="last-name" className="input-label">
                             Last Name:
                          </label>
                          <div className='result-box'>
                            {result.PlastName}
                          </div>

                      </div></>

              ))}
            </div>
          ) : (
            <p>No search results found.</p>
          )}
        </div>
      );
    };
    
    export default Search;