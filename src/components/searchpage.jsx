import React, {useState, useEffect} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { collection, query, where, getDocs, updateDoc, doc, or, and } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from 'react-router-dom';




 
const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [docID, setDocID] = useState('');
    const [documents, setDocuments] = useState([]);
    const [isFullTimeChecked, setIsFullTimeChecked] = useState(false);
    const [isPartTimeChecked, setIsPartTimeChecked] = useState(false);



    
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
   
    const handleSearch = async (e) => {
      e.preventDefault();
      setSearchResults([]);
      if (searchQuery !== '' && !isFullTimeChecked && !isPartTimeChecked) {
        const q = query(collection(db, 'Applicants'), 
        or(
          where('rank', '==', searchQuery),
          where('PfirstName', '==', searchQuery),
          where('PlastName', '==', searchQuery),
          where('SfirstName', '==', searchQuery),
          where('SlastName', '==', searchQuery),
        ));
        
    
        const querySnapshot = await getDocs(q);
        const fetchedDocuments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setDocuments(fetchedDocuments);
        setSearchResults(fetchedDocuments.map((doc) => doc.data));
      }
      else if (searchQuery !== '' && isFullTimeChecked) {
        const q = query(collection(db, 'Applicants'), and(
        where('fullDayCareChecked', '==', isFullTimeChecked),
        or(
          where('rank', '==', searchQuery),
          where('PfirstName', '==', searchQuery),
          where('PlastName', '==', searchQuery),
          where('SfirstName', '==', searchQuery),
          where('SlastName', '==', searchQuery),
        )));
   
    
        const querySnapshot = await getDocs(q);
        const fetchedDocuments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setDocuments(fetchedDocuments);
        setSearchResults(fetchedDocuments.map((doc) => doc.data));
      }

      else if (searchQuery !== '' && isPartTimeChecked) {
        const q = query(collection(db, 'Applicants'), and( 
        where('preschoolOnlyChecked', '==', isPartTimeChecked),
        or(
          where('rank', '==', searchQuery),
          where('PfirstName', '==', searchQuery),
          where('PlastName', '==', searchQuery),
          where('SfirstName', '==', searchQuery),
          where('SlastName', '==', searchQuery),
        )));
   
    
        const querySnapshot = await getDocs(q);
        const fetchedDocuments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setDocuments(fetchedDocuments);
        setSearchResults(fetchedDocuments.map((doc) => doc.data));
      }
      
      
    };
    
    
    
    
    const handleResultClick = (index) => {
      const selectedResult = documents[index];
      navigate(`/result/${selectedResult.id}`);
    };
  
 
    return (
      <div>
      <nav className='right-nav'>
      <Link className="cancel-button" to="/">Home</Link>

            </nav>
        <div>
          <form onSubmit={handleSearch}>
            <input
              className='search-box'
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter search query"
            />
            <div>
        <input
          type="checkbox"
          id="preschool-only"
          checked={isPartTimeChecked}
          onChange={(e) => setIsPartTimeChecked(e.target.checked)}
        />
        <label htmlFor="preschool-only">Preschool Only</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="full-day-care"
          checked={isFullTimeChecked}
          onChange={(e) => setIsFullTimeChecked(e.target.checked)}
        />
        <label htmlFor="full-day-care">Full Day Care</label>
      </div>
            <div>
            <button className="submit-button" type="submit" onClick={handleSearch}>Search</button>
            </div>
          </form>
    
          {searchResults.length > 0 ? (
          <div className="results-container">
            <h3>Search Results:</h3>
            {searchResults.map((result, index) => (
              
              <div key={result.id}>
                
                <div className="rank-container">
                  <h3 className='leftHeader'>Rank</h3>
                  <input
                    type="text"
                    className='rank-box'
                    value={result.rank ?? ''}
                    readOnly
                  />
                </div>
                <div className="office-notes-container">
                  <h3>Office Notes</h3>
                  <textarea
                    readOnly
                    id="notes"
                    rows="4"
                    cols="50"
                    value={result.officeNotes ?? ''}
                  ></textarea>
                </div>
              

                <h3>Primary Parent/Guardian</h3>
                <div className="group1">
               <label htmlFor="first-name" className="input-label">
              First Name: 
              </label>
            <input
              type="text"
              id="first-name"
              className="input-box"
              value={result.PfirstName}
              readOnly 
              
            />

            <label htmlFor="last-name" className="input-label">
              Last Name:
            </label>
            <input
              type="text"
              id="last-name"
              className="input-box"
              readOnly
              value={result.PlastName}
            />
              </div>

        <h3>Secondary Parent/Guardian</h3>
        <div className="group1">
          
            <label htmlFor="first-name" className="input-label">
              First Name:
            </label>
            <input
              type="text"
              id="first-name"
              className="input-box"
              value={result.SfirstName}
              readOnly
            />
                    
            <label htmlFor="last-name" className="input-label">
              Last Name:
            </label>
            <input
              type="text"
              id="last-name"
              className="input-box"
              value={result.SlastName}
              readOnly
            />
          
        </div>

        <h3>Children</h3> 

        <div className="children-display-container">

      {result.children.map((child, index) => (
  <div key={index} className="child-display-field">
    <div className="child-display-info">
        <div className='stack'>
      <label htmlFor={`child-name-${index}`} className="input-label">
        Full Name:
      </label>
      <input
        type="text"
        id={`child-name-${index}`}
        className="input-box"
        value={child.name}
        readOnly
      />
   
      <label htmlFor={`child-birthday-${index}`} className="input-label">
        Birthday:
      </label>
      <input
        type="date"
        id={`child-birthday-${index}`}
        className="input-box"
        value={child.birthday}
        readOnly
      />
    
    <div className="checkbox-group">
      <label htmlFor={`child-need-care-${index}`} className="checkbox-label">
        Need Care:
      </label>
      <input
        type="checkbox"
        id={`child-need-care-${index}`}
        checked={child.needCare}
        readOnly
      />
    </div>

    <div className="checkbox-group">
      <label htmlFor={`child-full-time-${index}`} className="checkbox-label">
        Full Time:
      </label>
      <input
        type="checkbox"
        id={`child-full-time-${index}`}
        checked={child.fullTime}
        readOnly
        disabled={!child.needCare || child.partTime}
      />
    </div>
    
    <div>
      <label htmlFor={`child-part-time-${index}`} className="checkbox-label">
        Part Time:
      </label>
      <input
        type="checkbox"
        id={`child-part-time-${index}`}
        checked={child.partTime}
        readOnly
        disabled={!child.needCare || child.fullTime}
      />
    </div>
    </div>
    </div>
    </div>
      ))}
          </div>


          

      <div>
    
        <button className= 'submit-button' onClick={() => handleResultClick(index)}>Select</button>
</div>



          </div>
          ))}
          
          </div>
        ) : (
          <p>No search results found.</p>
        )}

      


        
        </div>
        </div>
      );
    };
    
    export default Search;