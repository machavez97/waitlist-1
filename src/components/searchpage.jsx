import React, {useState, useEffect} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { collection, query, where, getDocs, updateDoc, doc, or } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from 'react-router-dom';



 
const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [rank, setRank] = useState('');
    const [officeNotes, setOfficeNotes] = useState('');
    const [docID, setDocID] = useState('');
    const [documents, setDocuments] = useState([]);

    
    const navigate = useNavigate();
	const routeChange = () => {
        let path = '/login';
        navigate(path);
    };
    const submitForm = async (e) => {
      e.preventDefault();
      console.log(docID);
      await updateDoc(doc(db, "Applicants",docID), {
        rank: {rank},
        officeNotes: {officeNotes}
      });
      window.location.reload();

      
    
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
      if (searchQuery !== '') {
        const q = query(collection(db, 'Applicants'), or(
          where('rank.rank', '==', searchQuery),
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
            <button className="submit-button" type="submit" onClick={handleSearch}>Search</button>
            </div>
          </form>
    
          {searchResults.length > 0 ? (
          <div className="results-container">
            <h3>Search Results:</h3>
            {searchResults.map((result, index) => (
              
              <div key={result.id}>
                
                <h1>Family Information</h1>
                <div> 
                <h3 className='leftHeader'>Rank</h3>
                <input
                type="text"
                className='rank-box'
                value={result.rank?? ''}
                readOnly></input>
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

            <div className="group2">
            <label htmlFor="phone-number" className="input-label">
              Phone Number:
            </label>
            <input
              type="text"
              id="phone-number"
              className="input-box"
              value={result.PphoneNumber}
              readOnly/>
            <label htmlFor="text" className="checkbox-label">
                 Text OK:
            </label>
            <input
                type="checkbox"
                id="text"
                checked={result.PtextOK}
                readOnly/>
         
            <label htmlFor="email" className="input-label">
              Email:
            </label>
            <input
              type="text"
              id="email"
              className="input-box"
              value={result.Pemail}
               readOnly
            />
            </div>


            <div className="group3">
            <label htmlFor="street" className="input-label">
              Street:
            </label>
            <input
              type="text"
              id="street"
              className="input-box"
              value={result.Pstreet}
              readOnly
            />
          
            <label htmlFor="city" className="input-label">
              City:
            </label>
            <input
              type="text"
              id="city"
              className="input-box"
              value={result.Pcity}
              readOnly
            />
          
            <label htmlFor="state" className="input-label">
              State:
            </label>
            <input
              type="text"
              id="state"
              className="input-box"
              value={result.Pstate}
              readOnly
            />

            <label htmlFor="zip" className="input-label">
              Zip:
            </label>
            <input
              type="text"
              id="zip"
              className="input-box"
              value={result.Pzip}
              readOnly
            />
            <div>
            <label htmlFor="lives-in-home" className="checkbox-label">
                Lives in home:
            </label>
            <input
                type="checkbox"
                id="lives-in-home"
                checked={result.PlivesInHome}
                readOnly
            />
            </div>
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

        <div className="group2">
          
            <label htmlFor="phone-number" className="input-label">
              Phone Number:
            </label>
            <input
              type="text"
              id="phone-number"
              className="input-box"
              value={result.SphoneNumber}
              readOnly
            />
            <label htmlFor="text" className="checkbox-label">
                 Text OK:
            </label>
            <input
                type="checkbox"
                id="text"
                checked={result.StextOK}
                readOnly
            />
         
            <label htmlFor="email" className="input-label">
              Email:
            </label>
            <input
              type="text"
              id="email"
              className="input-box"
              value={result.Semail}
              readOnly
            />
          
        </div>

        <div className="group3">
          
            <label htmlFor="street" className="input-label">
              Street:
            </label>
            <input
              type="text"
              id="street"
              className="input-box"
              value={result.Sstreet}
              readOnly
            />
          
            <label htmlFor="city" className="input-label">
              City:
            </label>
            <input
              type="text"
              id="city"
              className="input-box"
              value={result.Scity}
              readOnly
            />
          
            <label htmlFor="state" className="input-label">
              State:
            </label>
            <input
              type="text"
              id="state"
              className="input-box"
              value={result.Sstate}
              readOnly
            />

            <label htmlFor="zip" className="input-label">
              Zip:
            </label>
            <input
              type="text"
              id="zip"
              className="input-box"
              value={result.Szip}
              readOnly
            />
            <div>
            <label htmlFor="lives-in-home" className="checkbox-label">
                Lives in home:
            </label>
            <input
                type="checkbox"
                id="lives-in-home"
                checked={result.SlivesInHome}
                readOnly
            />
            </div>
        </div>

      {result.children.map((child, index) => (
  <div key={index} className="child-field">
    <div>
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
    </div>
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
      ))}

          <div>
            <h1>Income Information</h1>
          </div>

        <div className="Income">
          
          <div className="Form">
          <h3>Primary Parent/Guardian</h3>
        {/* Primary Parent column */}
        <table className="grid">
          <thead>
            <tr>
              <th>Wages</th>
              <th>Child Support</th>
              <th>Alimony</th>
              <th>Social Security</th>
              <th>Cash Aid</th>
              <th>Other</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              
              <td>
                <input  type="text" className="input-box" value={result.Pwages}
              readOnly/>
              </td>
              <td>
                <input  type="text" className="input-box" value={result.PchildSupport}
              readOnly/>
              </td>
              <td>
              <input  type="text" className="input-box" value={result.PAlimony}
              readOnly/>
              </td>
              <td>
                <input type="text" className="input-box" value={result.PSocialSecurity}
              readOnly/>
              </td>
              <td>
                <input type="text" className="input-box" value={result.PCashAid}
              readOnly/>
              </td>
              <td>
                <input type="text" className="input-box" value={result.POther}
              readOnly/>
              </td>
            </tr>
          </tbody>
        </table>

        <h3>Secondary Parent/Guardian</h3>
        {/* Secondary Parent column */}
        <table className="grid">
          <thead>
            <tr>
              <th>Wages</th>
              <th>Child Support</th>
              <th>Alimony</th>
              <th>Social Security</th>
              <th>Cash Aid</th>
              <th>Other</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              
              <td>
                <input  type="text" className="input-box" value={result.Swages}
              readOnly/>
              </td>
              <td>
                <input  type="text" className="input-box" value={result.SchildSupport}
              readOnly/>
              </td>
              <td>
                <input  type="text" className="input-box" value={result.SAlimony}
              readOnly/>
              </td>
              <td>
                <input type="text" className="input-box" value={result.SSocialSecurity}
              readOnly/>
              </td>
              <td>
                <input type="text" className="input-box" value={result.SCashAid}
              readOnly/>
              </td>
              <td>
                <input type="text" className="input-box" value={result.SOther}
              readOnly/>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Notes */}
        <div>
          <div>
          <label htmlFor="notes" className="input-label">
            If no income, please explain how household is supported:
          </label>
          </div>
          <textarea id="notes" rows="4" cols="50" value={result.incomeExplaination}
          readOnly></textarea>
        </div>
          </div>
        </div>


        <div className="table2">
        <div>
          <label className="input-label">
            <h5>Please indicate if you are enrolled in any of the qualifying programs listed below</h5>
          </label>
        </div>

        <table className="grid">
          <tr>
            <th>CALWorks</th>
            <th>CALFresh</th>
            <th>WIC</th>
          </tr>
          <tr>
            <td>
              <input placeholder="Amount per month" type="text" className="input-box" value={result.CALWorks}
                    readOnly/>
            </td>
            <td>
              <input placeholder="Amount per month" type="text" className="input-box" value={result.CALFresh}
                    readOnly/>
            </td>
            <td>
              <input placeholder="Amount per month" type="text" className="input-box" value={result.WIC}
                    readOnly/>
            </td>
          </tr>
        </table>
      </div>

      <div>
    <h1>Reason for Services</h1>
    <div>
         <h3>Type of Service Requested</h3>
         <div>
        <input
          type="checkbox"
          id="full-day-care"
          checked={result.fullDayCareChecked}
          readOnly
        />
        <label htmlFor="full-day-care">Full Day Care</label>
      </div>

      {result.fullDayCareChecked && (
        <div className="table2">
            <h5>Please provide information as applicable to your reason for requesting full-day service.<h6>(Select all that apply)</h6></h5>
            
            <h3 className="header">Primary Parent/Guardian</h3>


            <table className="grid">
          <thead>
            <tr>
              <th className="tableCheckHeader">Working</th>
              <th className="tableCheckHeader">Looking for Care</th>
              <th className="tableCheckHeader">Going to School</th>
              <th className="tableCheckHeader">CPS or At Risk</th>
              <th className="tableCheckHeader">Incapacitated w/ Dr Note</th>
              <th className="tableCheckHeader">IEP Preschool Only</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="checkbox" checked={result.Pworking}
                readOnly/>
              </td>
              <td>
                <input type="checkbox" checked={result.PlookingForWorking}
                readOnly/>
              </td>
              <td>
                <input type="checkbox" checked={result.PgoingToSchool}
                readOnly/>
              </td>
              <td>
                <input type="checkbox" checked={result.PCPSorAtRisk}
                readOnly/>
              </td>
              <td>
                <input type="checkbox" checked={result.PsetIncapacitate}
                readOnly/>
              </td>
              <td>
                <input type="checkbox" checked={result.PIEPpreschoolOnly}
                readOnly/>
              </td>
            </tr>
          </tbody>
        </table>

      <div>
      <h3>Secondary Parent/Guardian</h3>

        <table className="grid">
          <thead>
            <tr>
              <th className="tableCheckHeader">Working</th>
              <th className="tableCheckHeader">Looking for Care</th>
              <th className="tableCheckHeader">Going to School</th>
              <th className="tableCheckHeader">CPS or At Risk</th>
              <th className="tableCheckHeader">Incapacitated w/ Dr Note</th>
              <th className="tableCheckHeader">IEP Preschool Only</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
              <input type="checkbox" checked={result.Sworking}
                readOnly/>
              </td>
              <td>
                <input type="checkbox" checked={result.SlookingForWorking}
                readOnly/>
              </td>
              <td>
                <input type="checkbox" checked={result.SgoingToSchool}
                readOnly/>
              </td>
              <td>
                <input type="checkbox" checked={result.SCPSorAtRisk}
                readOnly/>
              </td>
              <td>
                <input type="checkbox" checked={result.SsetIncapacitate}
                readOnly/>
              </td>
              <td>
                <input type="checkbox" checked={result.SIEPpreschoolOnly}
                readOnly/>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
        </div>

      )}

      <div>
        <input
          type="checkbox"
          id="preschool-only"
          checked={result.preschoolOnlyChecked}
          readOnly
        />
        <label htmlFor="preschool-only">Preschool Only</label>
      </div>

      {result.preschoolOnlyChecked && (
        <div className="table2">
            <h5>For ranking purpose please indicate if child is CPS/At Risk or child has IEP</h5>
          <table className="grid">
            {/* Table for Preschool Only */}
            <tr>
                <th className="tableCheckHeader">CPS/At Risk</th>
                <th className="tableCheckHeader">IEP</th>
            </tr>
            <tr>
            <td>
              <input type="checkbox" checked={result.preschoolCPS}
                readOnly/>
              </td>
              <td>
                <input type="checkbox" checked={result.preSchoolIEP}
                readOnly/>
              </td>
            </tr>
          </table>
        </div>
      )}
    </div>
    <div>
          <div>
          <h3>Office Notes</h3>
          </div>
          <textarea readOnly id="notes" rows="4" cols="50" value={result.officeNotes?? ''}
          ></textarea>
        </div>
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