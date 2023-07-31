import React, {useState, useEffect} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { collection,Timestamp, query, where, getDocs, collectionGroup, doc, or, and } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from 'react-router-dom';




 
const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchRank, setSearchRank] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [childrenResults, setChildrenResults] = useState([]);

    const [docID, setDocID] = useState('');
    const [documents, setDocuments] = useState([]);
    const [isFullTimeChecked, setIsFullTimeChecked] = useState(false);
    const [isPartTimeChecked, setIsPartTimeChecked] = useState(false);
    const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [iepIfspChecked, setIepIfspChecked] = useState(false);
  const [childrenData, setChildrenData] = useState({});

    
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
      
      if (searchQuery !== '' && !isFullTimeChecked && !isPartTimeChecked && !searchRank) {
        const q = query(collection(db, 'Applicants'), 
        
        or(
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
        console.log("search results ", searchResults);

        const children = query(collectionGroup(db, 'children'));
        const childrenQuerySnapshot = await getDocs(children);
        const fetchedChildren = await fetchChildrenForAllParents(documents)
        setChildrenResults(fetchedChildren)
        console.log(childrenResults);

    }
      else if (searchQuery !== '' && !isFullTimeChecked && !isPartTimeChecked && searchRank) {
        const q = query(collection(db, 'Applicants'), and(
          where('rank', '==', searchRank),
          or(
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
      else if (searchQuery !== '' && isFullTimeChecked && !isPartTimeChecked && !searchRank) {
        const q = query(collection(db, 'Applicants'), and(
        where('fullDayCareChecked', '==', isFullTimeChecked),
        or(
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

      else if (searchQuery !== '' && !isFullTimeChecked && isPartTimeChecked && !searchRank) {
        const q = query(collection(db, 'Applicants'), and( 
        where('preschoolOnlyChecked', '==', isPartTimeChecked),
        or(
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
      else if (searchQuery !== '' && isFullTimeChecked && isPartTimeChecked && !searchRank) {

        const q = query(collection(db, 'Applicants'), and(
        or( 
        where('preschoolOnlyChecked', '==', isPartTimeChecked),
        ),
        or(
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
      
      else if (!searchQuery && searchRank && isPartTimeChecked) {
        const q = query(collection(db, 'Applicants'), and( 
        where('preschoolOnlyChecked', '==', isPartTimeChecked),
        where('rank', '==', searchRank),
        ));
    
        const querySnapshot = await getDocs(q);
        const fetchedDocuments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setDocuments(fetchedDocuments);
        setSearchResults(fetchedDocuments.map((doc) => doc.data));
      }
      else if (!searchQuery && searchRank && isFullTimeChecked) {
        const q = query(collection(db, 'Applicants'), and( 
          where('fullDayCareChecked', '==', isFullTimeChecked),
          where('rank', '==', searchRank),
        ));
    
        const querySnapshot = await getDocs(q);
        const fetchedDocuments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setDocuments(fetchedDocuments);
        setSearchResults(fetchedDocuments.map((doc) => doc.data));
      }

      else if (!searchQuery && !searchRank && isFullTimeChecked) {
        const q = query(collection(db, 'Applicants'), 
        where('fullDayCareChecked', '==', isFullTimeChecked),
        
        );
    
        const querySnapshot = await getDocs(q);
        const fetchedDocuments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setDocuments(fetchedDocuments);
        setSearchResults(fetchedDocuments.map((doc) => doc.data));
      }

      else if (!searchQuery && searchRank && !isFullTimeChecked && !isPartTimeChecked) {
        const q = query(collection(db, 'Applicants'), 
        where('rank', '==', searchRank),
        );
    
        const querySnapshot = await getDocs(q);
        const fetchedDocuments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setDocuments(fetchedDocuments);
        setSearchResults(fetchedDocuments.map((doc) => doc.data));
      }

      let filteredDocs = documents;

  /*if (searchQuery !== '') {
    // Apply the search query filter
    const q = query(collection(db, 'Applicants'), 
      or(
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

    // Update the filteredDocs with the search query results
    filteredDocs = fetchedDocuments;
  }*/

  if (startDate && endDate) {
    const startTimestamp = new Date(startDate);
    const endTimestamp = new Date(endDate);
    const filteredDocuments = await searchChildrenByBirthdayRange(startTimestamp, endTimestamp);
    setSearchResults(filteredDocuments);
  }

  // If iepIfspChecked is true, filter documents based on IEP/IFSP
  if (iepIfspChecked) {
    const filteredDocs = searchChildrenWithIEP(documents);
    setSearchResults(filteredDocs.map((doc) => doc.data));
  }
  //console.log(fetchChildrenData());
};
const fetchChildrenSubcollection = async (parentId) => {
  const childrenRef = collection(db, 'Applicants', parentId, 'children');
  const querySnapshot = await getDocs(childrenRef);
  const childrenData = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }));
  return childrenData;
};
const fetchChildrenForAllParents = async (documentsArray) => {
  try {
    const promises = documentsArray.map((document) => fetchChildrenSubcollection(document.id));
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error('Error fetching children subcollections:', error);
    return [];
  }
};

// Function to filter documents by date range and search the subcollection for children with birthdays in the range
const searchChildrenByBirthdayRange = async (start, end) => {

  const parentsRef = collection(db, 'Applicants');
  const parentQuerySnapshot = await getDocs(parentsRef);

  const filteredDocuments = [];

  // Loop through parent documents
  for (const parentDoc of parentQuerySnapshot.docs) {
    const parentId = parentDoc.id;
    const parentData = parentDoc.data();

    // Get the "children" subcollection reference for the current parent document
    const childrenRef = collection(db, 'Applicants', parentId, 'children');
    const childrenQuerySnapshot = await getDocs(childrenRef);

    // Check if any child has a birthday within the date range
    const filteredChildren = [];
    childrenQuerySnapshot.forEach((childDoc) => {
      const childData = childDoc.data();
      const birthdayTimestamp = childData.birthday.toDate();
      if (birthdayTimestamp >= new Date(start) && birthdayTimestamp <= new Date(end)) {
        filteredChildren.push({
          id: childDoc.id,
          ...childData,
        });
      }
    });

    // If at least one child matches the date range, include the parent document in the results
    if (filteredChildren.length > 0) {
      filteredDocuments.push({
        id: parentId,
        ...parentData,
        children: filteredChildren,
      });
    }
  }

  return filteredDocuments;
};


// Function to filter documents by children with IEP/IFSP
const searchChildrenWithIEP = (docs) => {
  return docs.filter((doc) => {
    const children = doc.data.children; // Access the "children" array correctly
    return children.some((child) => child.iepIfsp);
  });
};

// Function to fetch children subcollection for a specific applicant document


// Function to fetch children subcollection for each document in searchResults



   
    
    const handleResultClick = (index) => {
      const selectedResult = documents[index];
      navigate(`/result/${selectedResult.id}`);
    };
  
 
    return (
      <div>
      <nav className='right-nav'>
      <Link className="home-button" to="/">Home</Link>

            </nav>
        <div>
          <form onSubmit={handleSearch}>
            <input
              className='search-box'
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="First Name/Last Name"
            />
           
            <input
              className='rank-box'
              type="text"
              value={searchRank}
              onChange={(e) => setSearchRank(e.target.value)}
              placeholder="Rank"
            />

              <div>
                <label htmlFor="start-date">Start Date:</label>
                <input
                  type="date"
                  id="start-date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="end-date">End Date:</label>
                <input
                  type="date"
                  id="end-date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

            
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

      {childrenData.map((childDoc) => (
        <div key={childDoc.id} className="child-display-field">
          <div className="child-display-info">
              <div className='stack'>
            <label htmlFor={`child-name-${childDoc.id}`} className="input-label">
              Full Name:
            </label>
            <input
              type="text"
              id={`child-name-${childDoc.id}`}
              className="input-box"
              value={childDoc.name}
              readOnly
            />
        
            <label htmlFor={`child-birthday-${childDoc.id}`} className="input-label">
              Birthday:
            </label>
            <input
              type="date"
              id={`child-birthday-${childDoc.id}`}
              className="input-box"
              value={childDoc.birthday.toDate().toISOString().split('T')[0]}
              readOnly
            />
          
          <div className="checkbox-group">
            <label htmlFor={`child-need-care-${childDoc.id}`} className="checkbox-label">
              Need Care:
            </label>
            <input
              type="checkbox"
              id={`child-need-care-${childDoc.id}`}
              checked={childDoc.needCare}
              readOnly
            />
          </div>

          <div className="checkbox-group">
            <label htmlFor={`child-full-time-${childDoc.id}`} className="checkbox-label">
              Full Time:
            </label>
            <input
              type="checkbox"
              id={`child-full-time-${childDoc.id}`}
              checked={childDoc.fullTime}
              readOnly
              disabled={!childDoc.needCare || childDoc.partTime}
            />
          </div>
          
          <div>
            <label htmlFor={`child-part-time-${childDoc.id}`} className="checkbox-label">
              Part Time:
            </label>
            <input
              type="checkbox"
              id={`child-part-time-${childDoc.id}`}
              checked={childDoc.partTime}
              readOnly
              disabled={!childDoc.needCare || childDoc.fullTime}
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