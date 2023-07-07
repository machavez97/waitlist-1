import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase';
import "../App.css";

const InputForm = () => {
  const [PfirstName, PsetFirstName] = useState("");
  const [PlastName, PsetLastName] = useState("");
  const [PphoneNumber, PsetPhoneNumber] = useState("");
  const [Pemail, PsetEmail] = useState("");
  const [Pstreet, PsetStreet] = useState("");
  const [Pcity, PsetCity] = useState("");
  const [Pstate, PsetState] = useState("");
  const [Pzip, PsetZip] = useState("");
  const [PlivesInHome, PsetLivesInHome] = useState(false);
  const [PtextOK, PsettextOK] = useState(false);

  const [SfirstName, SsetFirstName] = useState("");
  const [SlastName, SsetLastName] = useState("");
  const [SphoneNumber, SsetPhoneNumber] = useState("");
  const [Semail, SsetEmail] = useState("");
  const [Sstreet, SsetStreet] = useState("");
  const [Scity, SsetCity] = useState("");
  const [Sstate, SsetState] = useState("");
  const [Szip, SsetZip] = useState("");
  const [SlivesInHome, SsetLivesInHome] = useState(false);
  const [StextOK, SsettextOK] = useState(false);

  const [children, setChildren] = useState([
    { name: "", birthday: "", fullTime: false, partTime: false, iepIfsp: false, needCare: false },
  ]);

  const addChildField = () => {
    setChildren([...children, { name: "", birthday: "", fullTime: false, iepIfsp: false, needCare: false }]);
  };

  const handleDeleteChild = (index) => {
    const updatedChildren = [...children];
    updatedChildren.splice(index, 1);
    setChildren(updatedChildren);
  };
  

  const handleChildFieldChange = (index, field, value) => {
    const updatedChildren = [...children];
    updatedChildren[index][field] = value;
    setChildren(updatedChildren);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "Applicants"), {
        PfirstName,
        PlastName,
        PphoneNumber,
        PtextOK,
        Pemail,
        Pstreet,
        Pcity,
        Pstate,
        Pzip,
        PlivesInHome,
        
        SfirstName,
        SlastName,
        SphoneNumber,
        StextOK,
        Semail,
        Sstreet,
        Scity,
        Sstate,
        Szip,
        SlivesInHome,

        children,


      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div>
      <div>
        <h1>Family Information</h1>
      </div>

      <div className="Form">
        <h3>Primary Parent/Guardian</h3>
        <div className="group1">
            
          
            <label htmlFor="first-name" className="input-label">
              First Name:
            </label>
            <input
              type="text"
              id="first-name"
              className="input-box"
              value={PfirstName}
              onChange={(e) => PsetFirstName(e.target.value)}
            />
                    
            <label htmlFor="last-name" className="input-label">
              Last Name:
            </label>
            <input
              type="text"
              id="last-name"
              className="input-box"
              value={PlastName}
              onChange={(e) => PsetLastName(e.target.value)}
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
              value={PphoneNumber}
              onChange={(e) => PsetPhoneNumber(e.target.value)}
            />
            <label htmlFor="text" className="checkbox-label">
                 Text OK:
            </label>
            <input
                type="checkbox"
                id="text"
                checked={PtextOK}
                onChange={(e) => PsettextOK(e.target.checked)}
            />
         
            <label htmlFor="email" className="input-label">
              Email:
            </label>
            <input
              type="text"
              id="email"
              className="input-box"
              value={Pemail}
              onChange={(e) => PsetEmail(e.target.value)}
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
              value={Pstreet}
              onChange={(e) => PsetStreet(e.target.value)}
            />
          
            <label htmlFor="city" className="input-label">
              City:
            </label>
            <input
              type="text"
              id="city"
              className="input-box"
              value={Pcity}
              onChange={(e) => PsetCity(e.target.value)}
            />
          
            <label htmlFor="state" className="input-label">
              State:
            </label>
            <input
              type="text"
              id="state"
              className="input-box"
              value={Pstate}
              onChange={(e) => PsetState(e.target.value)}
            />

            <label htmlFor="zip" className="input-label">
              Zip:
            </label>
            <input
              type="text"
              id="zip"
              className="input-box"
              value={Pzip}
              onChange={(e) => PsetZip(e.target.value)}
            />
            <div>
            <label htmlFor="lives-in-home" className="checkbox-label">
                Lives in home:
            </label>
            <input
                type="checkbox"
                id="lives-in-home"
                checked={PlivesInHome}
                onChange={(e) => PsetLivesInHome(e.target.checked)}
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
              value={SfirstName}
              onChange={(e) => SsetFirstName(e.target.value)}
            />
                    
            <label htmlFor="last-name" className="input-label">
              Last Name:
            </label>
            <input
              type="text"
              id="last-name"
              className="input-box"
              value={SlastName}
              onChange={(e) => SsetLastName(e.target.value)}
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
              value={SphoneNumber}
              onChange={(e) => SsetPhoneNumber(e.target.value)}
            />
            <label htmlFor="text" className="checkbox-label">
                 Text OK:
            </label>
            <input
                type="checkbox"
                id="text"
                checked={StextOK}
                onChange={(e) => SsettextOK(e.target.checked)}
            />
         
            <label htmlFor="email" className="input-label">
              Email:
            </label>
            <input
              type="text"
              id="email"
              className="input-box"
              value={Semail}
              onChange={(e) => SsetEmail(e.target.value)}
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
              value={Sstreet}
              onChange={(e) => SsetStreet(e.target.value)}
            />
          
            <label htmlFor="city" className="input-label">
              City:
            </label>
            <input
              type="text"
              id="city"
              className="input-box"
              value={Scity}
              onChange={(e) => SsetCity(e.target.value)}
            />
          
            <label htmlFor="state" className="input-label">
              State:
            </label>
            <input
              type="text"
              id="state"
              className="input-box"
              value={Sstate}
              onChange={(e) => SsetState(e.target.value)}
            />

            <label htmlFor="zip" className="input-label">
              Zip:
            </label>
            <input
              type="text"
              id="zip"
              className="input-box"
              value={Szip}
              onChange={(e) => SsetZip(e.target.value)}
            />
            <div>
            <label htmlFor="lives-in-home" className="checkbox-label">
                Lives in home:
            </label>
            <input
                type="checkbox"
                id="lives-in-home"
                checked={SlivesInHome}
                onChange={(e) => SsetLivesInHome(e.target.checked)}
            />
            </div>
        </div>

        <div className="children-section">
          <h3>Children</h3> 
          
          
          
          {children.map((child, index) => (
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
        value={child.birthday}
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
        Full Time:
      </label>
      <input
        type="checkbox"
        id={`child-full-time-${index}`}
        checked={child.fullTime}
        onChange={(e) => handleChildFieldChange(index, "fullTime", e.target.checked)}
        disabled={!child.needCare || child.partTime} // Disable if needCare and fullTime are both true
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
        onChange={(e) => handleChildFieldChange(index, "partTime", e.target.checked)}
        disabled={!child.needCare || child.fullTime} // Disable if needCare and fullTime are both true
      />
    </div>
    {/* Delete Button */}
    
    <button
      className="remove-child-button"
      onClick={() => handleDeleteChild(index)}
    >
      Remove Child
    </button>
  </div>
))}
          <button type="button" className="add-child-button" onClick={addChildField}>Add Child</button>
        </div>
        <div>
            <h2>Income Information</h2>
          </div>

        <div className="Income">
          
          <div className="Form">
          <h3>Primary Parent/Guardian</h3>
        {/* Primary Parent column */}
        <table className="grid">
          <thead>
            <tr>
              <th></th> {/* Empty cell for spacing */}
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
              <td>Monthly/Weekly</td>
              <td>
                <input placeholder="$weekly/Monthly" type="text" className="input-box"/>
              </td>
              <td>
                <input type="text" className="input-box"/>
              </td>
              <td>
                <input type="text" className="input-box"/>
              </td>
              <td>
                <input type="text" className="input-box"/>
              </td>
              <td>
                <input type="text" className="input-box"/>
              </td>
              <td>
                <input type="text" className="input-box"/>
              </td>
            </tr>
          </tbody>
        </table>

        <h3>Secondary Parent/Guardian</h3>
        {/* Secondary Parent column */}
        <table className="grid">
          <thead>
            <tr>
              <th></th> {/* Empty cell for spacing */}
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
              <td>Monthly/Weekly</td>
              <td>
                <input type="text" className="input-box"/>
              </td>
              <td>
                <input type="text" className="input-box"/>
              </td>
              <td>
                <input type="text" className="input-box"/>
              </td>
              <td>
                <input type="text" className="input-box"/>
              </td>
              <td>
                <input type="text" className="input-box"/>
              </td>
              <td>
                <input type="text" className="input-box"/>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="input-label">
            Notes:
          </label>
          <textarea id="notes" rows="4" cols="50"></textarea>
        </div>
          </div>
        </div>
      

      </div>

      <div className="btn-container">
        <button type="submit" className="submit-button" onClick={submitForm}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default InputForm;
