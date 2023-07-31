import React, {useState, useEffect} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../firebase'
import { collection, query, where, getDoc, updateDoc, doc, deleteDoc, or } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';




 
const SelectedResult = () => {
    
    const { id } = useParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [rank, setRank] = useState('');
    const [officeNotes, setOfficeNotes] = useState('');
    const [formData, setFormData] = useState({});


    
    const navigate = useNavigate();
	const routeChange = () => {
        let path = '/login';
        navigate(path);
    };

    useEffect(() => {
      const fetchData = async () => {
        if (id) {
          try {
            const docRef = doc(db, 'Applicants', id);
            const documentSnapshot = await getDoc(docRef);
  
            if (documentSnapshot.exists()) {
              const documentData = documentSnapshot.data();
              setSearchResults([documentData]);
              setFormData(documentData);
            } else {
              setSearchResults([]);
              setFormData({});
            }
          } catch (error) {
            console.error('Error fetching document:', error);
          }
        }
      };
  
      fetchData();
    }, [id]);

    const formatPhoneNumber = (input) => {
      const digitsOnly = input.replace(/\D/g, '');
      const formattedNumber = digitsOnly
        .replace(/(\d{0,3})(\d{0,3})(\d{0,4})/, (match, part1, part2, part3) => {
          if (part1 && part2 && part3) {
            return `(${part1}) ${part2}-${part3}`;
          } else if (part1 && part2) {
            return `(${part1}) ${part2}`;
          } else if (part1) {
            return `(${part1}`;
          }
          return '';
        });
      return formattedNumber;
    };
  
    const changePPhone = (e) => {
      const input = e.target.value;

      const formattedNumber = formatPhoneNumber(input);
      setFormData({ ...formData, PphoneNumber: formattedNumber })
    };
  
    const changeSPhone = (e) => {
      const input = e.target.value;

      const formattedNumber = formatPhoneNumber(input);
      setFormData({ ...formData, SphoneNumber: formattedNumber })
    };

    const addChildField = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        children: [
          ...prevFormData.children,
          { name: "", birthday: new Date(), needCare: false, iepIfsp: false }
        ],
      }));
    };
    
  
    const handleDeleteChild = (index) => {
      const updatedChildren = [...formData.children];
      updatedChildren.splice(index, 1);
      setFormData((prevFormData) => ({ ...prevFormData, children: updatedChildren }));
    };
    
    const handleChildFieldChange = (index, field, value) => {
      const updatedChildren = [...formData.children];
      updatedChildren[index][field] = value;
      setFormData((prevFormData) => ({ ...prevFormData, children: updatedChildren }));
    };
    // Helper function to format input as dollar and cents
  const formatCurrencyInput = (input) => {
    // Remove non-numeric characters from input
    const numericInput = input.replace(/[^0-9.]/g, '');

    // Split the input into dollars and cents
    const [dollars, cents] = numericInput.split('.');

    // Format dollars with commas
    const formattedDollars = dollars.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Combine dollars and cents (up to 2 decimal places)
    let formattedInput = formattedDollars;
    if (cents !== undefined) {
      formattedInput += `.${cents.slice(0, 2)}`;
    }

    // Add dollar sign
    formattedInput = `$${formattedInput}`;

    return formattedInput;
  };
    
    const submitForm = async (e) => {
      e.preventDefault();
  
      await updateDoc(doc(db, 'Applicants', id), formData);
      window.location.reload();
    };

    const handleDelete = async () => {
      const confirmed = window.confirm('Are you sure you would like to delete this application?');
      if (confirmed) {
        try {
          // Delete the document from Firestore
          await deleteDoc(doc(db, 'Applicants', id));
          navigate(-1);
          console.log('Document deleted successfully!');
        } catch (error) {
          console.error('Error deleting document:', error);
        }
      }
    };
    
    useEffect(() => {
      const authToken = getAuth();
      onAuthStateChanged(authToken, (user) => {
        if (!user) {
          routeChange();
        }
      });
    }, []);
    
    const generatePDF = () => {
      // Select the element to convert to PDF
      const element = document.getElementById('pdf-content');
    
      // Create a canvas from the element
      html2canvas(element).then((canvas) => {
        const imgWidth = 208;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
        heightLeft -= pageHeight;
        const doc = new jsPDF('p', 'mm');
        doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
          heightLeft -= pageHeight;
        }
        doc.save('Application.pdf');
      });
    };


    
 
    return (
      <div>
      <nav className='right-nav'>
      <Link className="home-button" to="/">Home</Link>

            </nav>
        <div>
        <div>
        <button className="delete-button" onClick={handleDelete}>Delete</button>
        </div>
   
          {searchResults.length > 0 ? (
          <div className="results-container">
            
            {searchResults.map((result) => (
            <div id="pdf-content">
              <div key={result.id}>
                <h1>Family Information</h1>
                <div> 
                <h3 className='leftHeader'>Rank</h3>
                <input
                  type="text"
                  className="rank-box"
                  value={formData.rank}
                  onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                />


                </div>
                <div>
                <div>
                <h3>Office Notes</h3>
                </div>
                <textarea  id="notes" rows="4" cols="50"   
                value={formData.officeNotes}
                onChange={(e) => setFormData({ ...formData, officeNotes: e.target.value })}></textarea>
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
              value={formData.PfirstName}
              onChange={(e) => setFormData({ ...formData, PfirstName: e.target.value })}
 
              
            />

            <label htmlFor="last-name" className="input-label">
              Last Name:
            </label>
            <input
              type="text"
              id="last-name"
              className="input-box"
              onChange={(e) => setFormData({ ...formData, PlastName: e.target.value })}
              value={formData.PlastName}
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
              value={formData.PphoneNumber}
              onChange={changePPhone}
              maxLength={14}
              pattern="\(\d{0,3}\) \d{0,3}-\d{0,4}"
            />
            <label htmlFor="text" className="checkbox-label">
                 Text OK:
            </label>
            <input
                type="checkbox"
                id="text"
                checked={formData.PtextOK}
                onChange={(e) => setFormData({...formData, PtextOK: e.target.checked})}

                />
         
            <label htmlFor="email" className="input-label">
              Email:
            </label>
            <input
              type="text"
              id="email"
              className="input-box"
              value={formData.Pemail}
              onChange={(e) => setFormData({ ...formData, Pemail: e.target.value })}

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
              value={formData.Pstreet}
              onChange={(e) => setFormData({ ...formData, Pstreet: e.target.value })}

            />
          
            <label htmlFor="city" className="input-label">
              City:
            </label>
            <input
              type="text"
              id="city"
              className="input-box"
              value={formData.Pcity}
              onChange={(e) => setFormData({ ...formData, Pcity: e.target.value })}

            />
          
            <label htmlFor="state" className="input-label">
              State:
            </label>
            <input
              type="text"
              id="state"
              className="input-box"
              value={formData.Pstate}
              onChange={(e) => setFormData({ ...formData, Pstate: e.target.value })}

            />

            <label htmlFor="zip" className="input-label">
              Zip:
            </label>
            <input
              type="text"
              id="zip"
              className="input-box"
              value={formData.Pzip}
              onChange={(e) => setFormData({ ...formData, Pzip: e.target.value })}

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
              value={formData.SfirstName}
              onChange={(e) => setFormData({ ...formData, SfirstName: e.target.value })}
 
              
            />

            <label htmlFor="last-name" className="input-label">
              Last Name:
            </label>
            <input
              type="text"
              id="last-name"
              className="input-box"
              onChange={(e) => setFormData({ ...formData, SlastName: e.target.value })}
              value={formData.SlastName}
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
              value={formData.SphoneNumber}
              onChange={changeSPhone}
              maxLength={14}
              pattern="\(\d{0,3}\) \d{0,3}-\d{0,4}"
            />
            <label htmlFor="text" className="checkbox-label">
                 Text OK:
            </label>
            <input
                type="checkbox"
                id="text"
                checked={formData.StextOK}
                onChange={(e) => setFormData({...formData, StextOK: e.target.checked})}

                />
         
            <label htmlFor="email" className="input-label">
              Email:
            </label>
            <input
              type="text"
              id="email"
              className="input-box"
              value={formData.Semail}
              onChange={(e) => setFormData({ ...formData, Semail: e.target.value })}

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
              value={formData.Sstreet}
              onChange={(e) => setFormData({ ...formData, Sstreet: e.target.value })}

            />
          
            <label htmlFor="city" className="input-label">
              City:
            </label>
            <input
              type="text"
              id="city"
              className="input-box"
              value={formData.Scity}
              onChange={(e) => setFormData({ ...formData, Scity: e.target.value })}

            />
          
            <label htmlFor="state" className="input-label">
              State:
            </label>
            <input
              type="text"
              id="state"
              className="input-box"
              value={formData.Sstate}
              onChange={(e) => setFormData({ ...formData, Sstate: e.target.value })}

            />

            <label htmlFor="zip" className="input-label">
              Zip:
            </label>
            <input
              type="text"
              id="zip"
              className="input-box"
              value={formData.Szip}
              onChange={(e) => setFormData({ ...formData, Szip: e.target.value })}

            />
            
        </div>
        <h3>Children</h3> 


        <div className="children-display-container">
  {formData.children.map((child, index) => (
    <div key={index} className="child-field">
    <div className="child-info">
      <div>
        <label htmlFor={`child-name-${index}`} className="input-label">
          Full Name:
        </label>
        <input
          type="text"
          id={`child-name-${index}`}
          className="input-box"
          value={child.name}
          onChange={(e) => handleChildFieldChange(index, "name", e.target.value)}
        />
      </div>
      <div>
      <label htmlFor={`child-birthday-${index}`} className="input-label">
        Birthday:
      </label>
      <input
        type="date"
        id={`child-birthday-${index}`}
        className="input-box"
        value={child.birthday.toDate().toISOString().split('T')[0]}
        onChange={(e) => handleChildFieldChange(index, "birthday", e.target.value)}
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
            onChange={(e) => handleChildFieldChange(index, "needCare", e.target.checked)}
          />
        </div>
      <div className="checkbox-group">
        <label htmlFor={`child-full-time-${index}`} className="checkbox-label">
          IEP/ISFP:
        </label>
        <input
          type="checkbox"
          id={`child-full-time-${index}`}
          checked={child.iepIfsp}
          onChange={(e) => handleChildFieldChange(index, "iepisfp", e.target.checked)}
        />
      </div>
      
</div>
{/* Delete Button */}
<button className="remove-child-button" onClick={() => handleDeleteChild(index)}>
  Remove Child
</button>
</div>
  ))}
</div>
<button type="button" className="add-child-button" onClick={addChildField}>Add Child</button>



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
              <input
                type="text"
                className="input-box"
                value={formData.Pwages === '' ? '$' : formatCurrencyInput(formData.Pwages)}
                onChange={(e) => {
                  const inputVal = e.target.value.replace(/[^0-9.]/g, '');
                  setFormData({ ...formData, Pwages: inputVal });
                }}
              />
              <select
                value={formData.PwagesFrequency || ''}
                onChange={(e) => setFormData({ ...formData, PwagesFrequency: e.target.value })}
              >
                <option value="" disabled>Select Weekly/Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              </td>
              <td>
              <input
                type="text"
                className="input-box"
                value={formData.PchildSupport === '' ? '$' : formatCurrencyInput(formData.PchildSupport)}
                onChange={(e) => {
                  const inputVal = e.target.value.replace(/[^0-9.]/g, '');
                  setFormData({ ...formData, PchildSupport: inputVal });
                }}
              />
              <select
                value={formData.PchildSupportFrequency || ''}
                onChange={(e) => setFormData({ ...formData, PchildSupportFrequency: e.target.value })}
              >
                <option value="" disabled>Select Weekly/Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              </td>
              <td>
              <input
                type="text"
                className="input-box"
                value={formData.PAlimony === '' ? '$' : formatCurrencyInput(formData.PAlimony)}
                onChange={(e) => {
                  const inputVal = e.target.value.replace(/[^0-9.]/g, '');
                  setFormData({ ...formData, PAlimony: inputVal });
                }}
              />
              <select
                value={formData.PAlimonyFrequency || ''}
                onChange={(e) => setFormData({ ...formData, PAlimonyFrequency: e.target.value })}
              >
                <option value="" disabled>Select Weekly/Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              </td>
              <td>
              <input
                type="text"
                className="input-box"
                value={formData.PSocialSecurity === '' ? '$' : formatCurrencyInput(formData.PSocialSecurity)}
                onChange={(e) => {
                  const inputVal = e.target.value.replace(/[^0-9.]/g, '');
                  setFormData({...formData, PSocialSecurity: inputVal});
                }} />
              <select
                    value={formData.PSocialSecurityFrequency}
                    onChange={(e) => setFormData({ ...formData, PSocialSecurityFrequency: e.target.value})}
                  >
                    <option value="" disabled>
                      Select Weekly/Monthly
                    </option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
              </td>
              <td>
              <input
                type="text"
                className="input-box"
                value={formData.PCashAid === '' ? '$' : formatCurrencyInput(formData.PCashAid)}
                onChange={(e) => {
                  const inputVal = e.target.value.replace(/[^0-9.]/g, '');
                  setFormData({...formData, PCashAid: inputVal});
                }}/>
              <select
                    value={formData.PCashAidFrequency}
                    onChange={(e) => setFormData({ ...formData, PCashAidFrequency: e.target.value})}
                  >
                    <option value="" disabled>
                      Select Weekly/Monthly
                    </option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
              </td>
              <td>
              <input
                type="text"
                className="input-box"
                value={formData.POther === '' ? '$' : formatCurrencyInput(formData.POther)}
                onChange={(e) => {
                  const inputVal = e.target.value.replace(/[^0-9.]/g, '');
                  setFormData({...formData, POther: inputVal});
                }} />
              <select
                    value={formData.POtherFrequency}
                    onChange={(e) => setFormData({ ...formData, POtherFrequency: e.target.value})}
                  >
                    <option value="" disabled>
                      Select Weekly/Monthly
                    </option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
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
              <input
                type="text"
                className="input-box"
                value={formData.Swages === '' ? '$' : formatCurrencyInput(formData.Swages)}
                onChange={(e) => {
                  const inputVal = e.target.value.replace(/[^0-9.]/g, '');
                  setFormData({ ...formData, Swages: inputVal });
                }}
              />
              <select
                value={formData.SwagesFrequency || ''}
                onChange={(e) => setFormData({ ...formData, SwagesFrequency: e.target.value })}
              >
                <option value="" disabled>Select Weekly/Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              </td>
              <td>
              <input
                type="text"
                className="input-box"
                value={formData.SchildSupport === '' ? '$' : formatCurrencyInput(formData.SchildSupport)}
                onChange={(e) => {
                  const inputVal = e.target.value.replace(/[^0-9.]/g, '');
                  setFormData({ ...formData, SchildSupport: inputVal });
                }}
              />
              <select
                value={formData.SchildSupportFrequency || ''}
                onChange={(e) => setFormData({ ...formData, SchildSupportFrequency: e.target.value })}
              >
                <option value="" disabled>Select Weekly/Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              </td>
              <td>
              <input
                type="text"
                className="input-box"
                value={formData.SAlimony === '' ? '$' : formatCurrencyInput(formData.SAlimony)}
                onChange={(e) => {
                  const inputVal = e.target.value.replace(/[^0-9.]/g, '');
                  setFormData({ ...formData, SAlimony: inputVal });
                }}
              />
              <select
                value={formData.SAlimonyFrequency || ''}
                onChange={(e) => setFormData({ ...formData, SAlimonyFrequency: e.target.value })}
              >
                <option value="" disabled>Select Weekly/Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              </td>
              <td>
              <input
                type="text"
                className="input-box"
                value={formData.SSocialSecurity === '' ? '$' : formatCurrencyInput(formData.SSocialSecurity)}
                onChange={(e) => {
                  const inputVal = e.target.value.replace(/[^0-9.]/g, '');
                  setFormData({...formData, SSocialSecurity: inputVal});
                }} />
              <select
                    value={formData.SSocialSecurityFrequency}
                    onChange={(e) => setFormData({ ...formData, SSocialSecurityFrequency: e.target.value})}
                  >
                    <option value="" disabled>
                      Select Weekly/Monthly
                    </option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
              </td>
              <td>
              <input
                type="text"
                className="input-box"
                value={formData.SCashAid === '' ? '$' : formatCurrencyInput(formData.SCashAid)}
                onChange={(e) => {
                  const inputVal = e.target.value.replace(/[^0-9.]/g, '');
                  setFormData({...formData, SCashAid: inputVal});
                }}/>
              <select
                    value={formData.SCashAidFrequency}
                    onChange={(e) => setFormData({ ...formData, SCashAidFrequency: e.target.value})}
                  >
                    <option value="" disabled>
                      Select Weekly/Monthly
                    </option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
              </td>
              <td>
              <input
                type="text"
                className="input-box"
                value={formData.SOther === '' ? '$' : formatCurrencyInput(formData.SOther)}
                onChange={(e) => {
                  const inputVal = e.target.value.replace(/[^0-9.]/g, '');
                  setFormData({...formData, SOther: inputVal});
                }} />
              <select
                    value={formData.SOtherFrequency}
                    onChange={(e) => setFormData({ ...formData, SOtherFrequency: e.target.value})}
                  >
                    <option value="" disabled>
                      Select Weekly/Monthly
                    </option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
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
              <input placeholder="Amount per month" type="text" className="input-box" 
              value={formData.CALWorks === '' ? '' : formatCurrencyInput(formData.CALWorks)}
              onChange={(e) => {
                const inputVal = e.target.value.replace(/[^0-9.]/g, '');
                setFormData({...formData, CALWorks: inputVal});
              }}/>
            </td>
            <td>
              <input placeholder="Amount per month" type="text" className="input-box" 
              value={formData.CALFresh === '' ? '' : formatCurrencyInput(formData.CALFresh)}
              onChange={(e) => {
                const inputVal = e.target.value.replace(/[^0-9.]/g, '');
                setFormData({...formData, CALFresh: inputVal});
              }}/>
            </td>
            <td>
              <input placeholder="Amount per month" type="text" className="input-box" 
              value={formData.WIC === '' ? '' : formatCurrencyInput(formData.WIC)}
              onChange={(e) => {
                const inputVal = e.target.value.replace(/[^0-9.]/g, '');
                setFormData({...formData, WIC: inputVal});
              }}/>
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
          checked={formData.fullDayCareChecked}
          onChange={(e) => setFormData({...formData, fullDayCareChecked: e.target.checked})}
        />
        <label htmlFor="full-day-care">Full Day Care</label>
      </div>

      {formData.fullDayCareChecked && (
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
                <input type="checkbox" checked={formData.Pworking}
                onChange={(e) => setFormData({...formData, Pworking: e.target.checked})}/>
                </td>
              <td>
                <input type="checkbox" checked={formData.PlookingForWorking}
                onChange={(e) => setFormData({...formData, PlookingForWorking: e.target.checked})}/>
                </td>
              <td>
                <input type="checkbox" checked={formData.PgoingToSchool}
                onChange={(e) => setFormData({...formData, PgoingToSchool: e.target.checked})}/>
                </td>
              <td>
                <input type="checkbox" checked={formData.PCPSorAtRisk}
                onChange={(e) => setFormData({...formData, PCPSorAtRisk: e.target.checked})}/>
                </td>
              <td>
                <input type="checkbox" checked={formData.PsetIncapacitate}
                onChange={(e) => setFormData({...formData, PsetIncapacitate: e.target.checked})}/>
                </td>
              <td>
                <input type="checkbox" checked={formData.PIEPpreschoolOnly}
                onChange={(e) => setFormData({...formData, PIEPpreschoolOnly: e.target.checked})}/>
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
                <input type="checkbox" checked={formData.Sworking}
                onChange={(e) => setFormData({...formData, Sworking: e.target.checked})}/>
                </td>
              <td>
                <input type="checkbox" checked={formData.SlookingForWorking}
                onChange={(e) => setFormData({...formData, SlookingForWorking: e.target.checked})}/>
                </td>
              <td>
                <input type="checkbox" checked={formData.SgoingToSchool}
                onChange={(e) => setFormData({...formData, SgoingToSchool: e.target.checked})}/>
                </td>
              <td>
                <input type="checkbox" checked={formData.SCPSorAtRisk}
                onChange={(e) => setFormData({...formData, SCPSorAtRisk: e.target.checked})}/>
                </td>
              <td>
                <input type="checkbox" checked={formData.SsetIncapacitate}
                onChange={(e) => setFormData({...formData, SsetIncapacitate: e.target.checked})}/>
                </td>
              <td>
                <input type="checkbox" checked={formData.SIEPpreschoolOnly}
                onChange={(e) => setFormData({...formData, SIEPpreschoolOnly: e.target.checked})}/>
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
          checked={formData.preschoolOnlyChecked}
          onChange={(e) => setFormData({...formData, preschoolOnlyChecked: e.target.checked})}/>
         
        <label htmlFor="preschool-only">Preschool Only</label>
      </div>

      
    </div>
    
</div>



          </div>
          </div>
          ))}
          <button className='pdf-button' onClick={generatePDF}>Generate PDF</button>
          <div className="btn-container">
        <button type="submit" className="submit-button" onClick={submitForm}>
          Submit
        </button>
        <button type="cancel" className="cancel-button" onClick={() => {window.location.reload();}}>
          Cancel
        </button>
        
        <div>
        <button type="cancel" className="cancel-button" onClick={() => navigate(-1)}>
          Back to Search
        </button>
        </div>
        

      </div>
          </div>
        ) : (
          <p>No search results found.</p>
        )}

        


        
        </div>
        </div>
      );
    };
    
    export default SelectedResult;