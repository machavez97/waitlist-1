import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { collection, query, where, getDocs, or, and } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from 'react-router-dom';




 
const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchRank, setSearchRank] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [childrenResults, setChildrenResults] = useState([]);


    const [documents, setDocuments] = useState([]);
    const [isFullTimeChecked, setIsFullTimeChecked] = useState(false);
    const [isPartTimeChecked, setIsPartTimeChecked] = useState(false);
    const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [iepIfspChecked, setIepIfspChecked] = useState(false);

    
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

    })

    
   
    const handleSearch = async (e) => {
      e.preventDefault();
      setSearchResults([]);
      if (!searchQuery && !isFullTimeChecked && !isPartTimeChecked && !searchRank && !startDate && !endDate) {
        const q = query(collection(db, 'Applicants'), 
        
        );
        
    
        const querySnapshot = await getDocs(q);
        const fetchedDocuments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

        setDocuments(fetchedDocuments);
        setSearchResults(fetchedDocuments.map((doc) => doc.data));

        const fetchedChildren = await fetchChildrenForAllParents(fetchedDocuments)
        setChildrenResults(fetchedChildren)

    }
      
      else if (searchQuery !== '' && !isFullTimeChecked && !isPartTimeChecked && !searchRank && !startDate && !endDate) {
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

        const fetchedChildren = await fetchChildrenForAllParents(fetchedDocuments)
        setChildrenResults(fetchedChildren)

    }
      else if (searchQuery !== '' && !isFullTimeChecked && !isPartTimeChecked && searchRank && !startDate && !endDate) {
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
        const fetchedChildren = await fetchChildrenForAllParents(fetchedDocuments)
        setChildrenResults(fetchedChildren)
      }
      else if (searchQuery !== '' && isFullTimeChecked && !isPartTimeChecked && !searchRank && !startDate && !endDate) {
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
        const fetchedChildren = await fetchChildrenForAllParents(fetchedDocuments)
        setChildrenResults(fetchedChildren) 
      }

      else if (searchQuery !== '' && !isFullTimeChecked && isPartTimeChecked && !searchRank && !startDate && !endDate) {
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
        const fetchedChildren = await fetchChildrenForAllParents(fetchedDocuments)
        setChildrenResults(fetchedChildren)
      }
      else if (searchQuery !== '' && isFullTimeChecked && !isPartTimeChecked && searchRank && !startDate && !endDate) {

        const q = query(collection(db, 'Applicants'), and(
        
        where('fullDayCareChecked', '==', isFullTimeChecked),
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
        const fetchedChildren = await fetchChildrenForAllParents(fetchedDocuments)
        setChildrenResults(fetchedChildren)
      }
      else if (searchQuery !== '' && !isFullTimeChecked && isPartTimeChecked && searchRank && !startDate && !endDate) {

        const q = query(collection(db, 'Applicants'), and(
        
        where('preschoolOnlyChecked', '==', isPartTimeChecked),
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
        const fetchedChildren = await fetchChildrenForAllParents(fetchedDocuments)
        setChildrenResults(fetchedChildren)
      }
      
      else if (!searchQuery && searchRank && isPartTimeChecked && !startDate && !endDate) {
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
        const fetchedChildren = await fetchChildrenForAllParents(fetchedDocuments)
        setChildrenResults(fetchedChildren)
      }
      else if (!searchQuery && searchRank && isFullTimeChecked && !startDate && !endDate) {
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
        const fetchedChildren = await fetchChildrenForAllParents(fetchedDocuments)
        setChildrenResults(fetchedChildren)
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
        const fetchedChildren = await fetchChildrenForAllParents(fetchedDocuments)
        setChildrenResults(fetchedChildren)
      }
      else if (!searchQuery && !searchRank && isPartTimeChecked) {
        const q = query(collection(db, 'Applicants'), 
        where('preschoolOnlyChecked', '==', isPartTimeChecked),
        
        );
    
        const querySnapshot = await getDocs(q);
        const fetchedDocuments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setDocuments(fetchedDocuments);
        setSearchResults(fetchedDocuments.map((doc) => doc.data));
        const fetchedChildren = await fetchChildrenForAllParents(fetchedDocuments)
        setChildrenResults(fetchedChildren)
      }

      else if (!searchQuery && searchRank && !isFullTimeChecked && !isPartTimeChecked ) {
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
        const fetchedChildren = await fetchChildrenForAllParents(fetchedDocuments)
        setChildrenResults(fetchedChildren)
      }



      else if (startDate && endDate && !searchQuery) {
        const startTimestamp = new Date(startDate);
        const endTimestamp = new Date(endDate);
    
        // Fetch all parent documents
        const q = collection(db, 'Applicants');
        const querySnapshot = await getDocs(q);
        const fetchedDocuments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
    
        // Filter documents based on date range
        const filteredDocuments = await searchChildrenByBirthdayRange(fetchedDocuments, startTimestamp, endTimestamp);
        setSearchResults(filteredDocuments);
        setDocuments(filteredDocuments)
    
        const fetchedChildren = await fetchChildrenForAllParents(filteredDocuments);
        setChildrenResults(fetchedChildren);
      }
      else if (startDate && endDate && searchQuery) {
        const startTimestamp = new Date(startDate);
        const endTimestamp = new Date(endDate);
    
        // Fetch parent documents that match the searchQuery
        const q = query(collection(db, 'Applicants'), 
          or(
            where('PfirstName', '==', searchQuery),
            where('PlastName', '==', searchQuery),
            where('SfirstName', '==', searchQuery),
            where('SlastName', '==', searchQuery),
          )
        );
        
        const querySnapshot = await getDocs(q);
        const fetchedDocuments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        // Filter documents based on date range and searchQuery
        const filteredDocuments = await searchChildrenByBirthdayRange(fetchedDocuments, startTimestamp, endTimestamp);
        setSearchResults(filteredDocuments);
    
        const fetchedChildren = await fetchChildrenForAllParents(filteredDocuments);
        setChildrenResults(fetchedChildren);
      }
      else if (startDate && endDate && searchRank) {
        const startTimestamp = new Date(startDate);
        const endTimestamp = new Date(endDate);
    
        const q = query(collection(db, 'Applicants'), 
        where('rank', '==', searchRank),
        );
        
        const querySnapshot = await getDocs(q);
        const fetchedDocuments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        // Filter documents based on date range and searchQuery
        const filteredDocuments = await searchChildrenByBirthdayRange(fetchedDocuments, startTimestamp, endTimestamp);
        setSearchResults(filteredDocuments);
    
        const fetchedChildren = await fetchChildrenForAllParents(filteredDocuments);
        setChildrenResults(fetchedChildren);
      }
      else if (startDate && endDate && isFullTimeChecked) {
        const startTimestamp = new Date(startDate);
        const endTimestamp = new Date(endDate);
    
        const q = query(collection(db, 'Applicants'), 
        where('fullDayCareChecked', '==', isFullTimeChecked),
        );
        
        const querySnapshot = await getDocs(q);
        const fetchedDocuments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        // Filter documents based on date range and searchQuery
        const filteredDocuments = await searchChildrenByBirthdayRange(fetchedDocuments, startTimestamp, endTimestamp);
        setSearchResults(filteredDocuments);
    
        const fetchedChildren = await fetchChildrenForAllParents(filteredDocuments);
        setChildrenResults(fetchedChildren);
      }
      else if (startDate && endDate && isPartTimeChecked) {
        const startTimestamp = new Date(startDate);
        const endTimestamp = new Date(endDate);
    
        const q = query(collection(db, 'Applicants'), 
        where('preschoolOnlyChecked', '==', isPartTimeChecked),
        );
        
        const querySnapshot = await getDocs(q);
        const fetchedDocuments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        // Filter documents based on date range and searchQuery
        const filteredDocuments = await searchChildrenByBirthdayRange(fetchedDocuments, startTimestamp, endTimestamp);
        setSearchResults(filteredDocuments);
    
        const fetchedChildren = await fetchChildrenForAllParents(filteredDocuments);
        setChildrenResults(fetchedChildren);
      }

        // If iepIfspChecked is true, filter documents based on IEP/IFSP
        else if (iepIfspChecked) {
          // Fetch all parent documents
          const q = collection(db, 'Applicants');
          const querySnapshot = await getDocs(q);
          const fetchedDocuments = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));

          const filteredDocs = await searchChildrenWithIEP(fetchedDocuments);
          setSearchResults(filteredDocs);
          setDocuments(filteredDocs)
          const fetchedChildren = await fetchChildrenForAllParents(filteredDocs);
          setChildrenResults(fetchedChildren);
        }
      
      // If iepIfspChecked is true, filter documents based on IEP/IFSP
      else if (iepIfspChecked && searchQuery !== '') {
        // Fetch all parent documents
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

        const filteredDocs = await searchChildrenWithIEP(fetchedDocuments);
        setSearchResults(filteredDocs);
        setDocuments(filteredDocs)
        const fetchedChildren = await fetchChildrenForAllParents(filteredDocs);
        setChildrenResults(fetchedChildren);
      }
      else if (iepIfspChecked && searchRank) {
        // Fetch all parent documents
        const q = query(collection(db, 'Applicants'), 
        
        where('rank', '==', searchRank)
        );
        const querySnapshot = await getDocs(q);
        const fetchedDocuments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

        const filteredDocs = await searchChildrenWithIEP(fetchedDocuments);
        setSearchResults(filteredDocs);
        setDocuments(filteredDocs)
        const fetchedChildren = await fetchChildrenForAllParents(filteredDocs);
        setChildrenResults(fetchedChildren);
      }
      else if (iepIfspChecked && isFullTimeChecked) {
        // Fetch all parent documents
        const q = query(collection(db, 'Applicants'), 
        
        where('fullDayCareChecked', '==', isFullTimeChecked),
        );
        const querySnapshot = await getDocs(q);
        const fetchedDocuments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

        const filteredDocs = await searchChildrenWithIEP(fetchedDocuments);
        setSearchResults(filteredDocs);
        setDocuments(filteredDocs)
        const fetchedChildren = await fetchChildrenForAllParents(filteredDocs);
        setChildrenResults(fetchedChildren);
      }
      else if (iepIfspChecked && isPartTimeChecked) {
        // Fetch all parent documents
        const q = query(collection(db, 'Applicants'), 
        
        where('preschoolOnlyChecked', '==', isPartTimeChecked),
        );
        const querySnapshot = await getDocs(q);
        const fetchedDocuments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

        const filteredDocs = await searchChildrenWithIEP(fetchedDocuments);
        setSearchResults(filteredDocs);
        setDocuments(filteredDocs)
        const fetchedChildren = await fetchChildrenForAllParents(filteredDocs);
        setChildrenResults(fetchedChildren);
      }
      else{
        alert('Invalid search parameters')
      }
    
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
    const promises = documentsArray.map(async (document) => {
      const childrenData = await fetchChildrenSubcollection(document.id);
      return childrenData;
    });

    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error('Error fetching children subcollections:', error);
    return [];
  }
};
// Function to filter documents by children with IEP/IFSP
const searchChildrenWithIEP = async (docs) => {
  const filteredDocuments = [];

  for (const document of docs) {
    const parentId = document.id;
    const parentData = document.data;
    const childrenRef = collection(db, 'Applicants', parentId, 'children');

    try {
      const childrenQuerySnapshot = await getDocs(childrenRef);
      const filteredChildren = [];

      childrenQuerySnapshot.forEach((childDoc) => {
        const childData = childDoc.data();

        if (childData.iepIfsp) {
          filteredChildren.push({
            id: childDoc.id,
            ...childData,
          });
        }
      });

      if (filteredChildren.length > 0) {
        filteredDocuments.push({
          id: parentId,
          ...parentData,
          children: filteredChildren,
        });
      }
    } catch (error) {
      console.error('Error searching children with IEP:', error);
    }
  }

  return filteredDocuments; // Move this line outside the loop
};





// Function to filter documents by date range and search the subcollection for children with birthdays in the range
const searchChildrenByBirthdayRange = async (documentsArray, start, end) => {
  try {
    const filteredDocuments = [];

    for (const document of documentsArray) {
      const parentId = document.id;
      const parentData = document.data;
      const childrenRef = collection(db, 'Applicants', parentId, 'children');
      const childrenQuerySnapshot = await getDocs(childrenRef);
      const filteredChildren = [];
      childrenQuerySnapshot.forEach((childDoc) => {
        const childData = childDoc.data();

        // Check if childData.birthday exists and is not undefined
        if (childData && childData.birthday) {
          const birthdayTimestamp = childData.birthday.toDate();

          if (birthdayTimestamp >= new Date(start) && birthdayTimestamp <= new Date(end)) {
            filteredChildren.push({
              id: childDoc.id,
              ...childData,

            });
          }
        }
      });

      if (filteredChildren.length > 0) {
        filteredDocuments.push({
          id: parentId,
          ...parentData,
          children: filteredChildren,
        });
      }
    }

    return filteredDocuments;
  } catch (error) {
    console.error('Error searching children by birthday range:', error);
    return [];
  }
};
    
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
        <input
          type="checkbox"
          id="preschool-only"
          checked={iepIfspChecked}
          onChange={(e) => setIepIfspChecked(e.target.checked)}
        />
        <label htmlFor="preschool-only">IEP/IFSP</label>
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
{childrenResults[index] && childrenResults[index].length > 0 ? (
  <div className="children-display-container">
    {childrenResults[index].map((childDoc) => (
      <div key={childDoc.id} className="child-display-field">
        <div className="child-display-info">
          <div className="stack">
            <label htmlFor={`child-name-${childDoc.id}`} className="input-label">
              Full Name:
            </label>
            <input
              type="text"
              id={`child-name-${childDoc.id}`}
              className="input-box"
              value={childDoc.data.name}
              readOnly
            />

            <label htmlFor={`child-birthday-${childDoc.id}`} className="input-label">
              Birthday:
            </label>
            <input
              type="date"
              id={`child-birthday-${childDoc.id}`}
              className="input-box"
              value={childDoc.data.birthday.toDate().toISOString().split('T')[0]}
              readOnly
            />

            <div className="checkbox-group">
              <label htmlFor={`child-need-care-${childDoc.id}`} className="checkbox-label">
                Need Care:
              </label>
              <input
                type="checkbox"
                id={`child-need-care-${childDoc.id}`}
                checked={childDoc.data.needCare}
                readOnly
              />
            </div>

            <div className="checkbox-group">
            <label htmlFor={`child-full-time-${index}`} className="checkbox-label">
              IEP/ISFP:
            </label>
            <input
              type="checkbox"
              id={`child-full-time-${index}`}
              checked={(childDoc.data && childDoc.data.iepIfsp) || false}
              readOnly
            />
          </div>
          </div>
        </div>
      </div>
    ))}
  </div>
) : (
  <p>No children found for the selected document.</p>
)}

          
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