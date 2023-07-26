import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase';
import "../App.css";

const InputForm = () => {
  const navigate = useNavigate();
  const [PfirstName, PsetFirstName] = useState("");
  const [PlastName, PsetLastName] = useState("");
  const [PphoneNumber, PsetPhoneNumber] = useState("");
  const [Pemail, PsetEmail] = useState("");
  const [Pstreet, PsetStreet] = useState("");
  const [Pcity, PsetCity] = useState("");
  const [Pstate, PsetState] = useState("");
  const [Pzip, PsetZip] = useState("");
  const [PtextOK, PsettextOK] = useState(false);
  const [Pwages, PsetWages] = useState("");
  const [PchildSupport, PsetChildSupport] = useState("");
  const [PAlimony, PsetAlimony] = useState("");
  const [PSocialSecurity, PsetSocialSecurity] = useState("");
  const [PCashAid, PsetCashAid] = useState("");
  const [POther, PsetOther] = useState("");
  const [incomeExplaination, setincomeExplaination] = useState("");
  const [Pworking, Psetworking] = useState(false);
  const [PlookingForWorking, PsetlookingForWorking] = useState(false);
  const [PgoingToSchool, PsetgoingToSchool] = useState(false);
  const [PCPSorAtRisk, PsetCPSorAtRisk] = useState(false);
  const [PIncapacitated, PsetIncapacitate] = useState(false);
  const [PIEPpreschoolOnly, PsetIEPpreschoolOnly] = useState(false);

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
  const [Swages, SsetWages] = useState("");
  const [SchildSupport, SsetChildSupport] = useState("");
  const [SAlimony, SsetAlimony] = useState("");
  const [SSocialSecurity, SsetSocialSecurity] = useState("");
  const [SCashAid, SsetCashAid] = useState("");
  const [SOther, SsetOther] = useState("");
  const [fullDayCareChecked, setFullDayCareChecked] = useState(false);
  const [preschoolOnlyChecked, setPreschoolOnlyChecked] = useState(false);
  const [Sworking, Ssetworking] = useState(false);
  const [SlookingForWorking, SsetlookingForWorking] = useState(false);
  const [SgoingToSchool, SsetgoingToSchool] = useState(false);
  const [SCPSorAtRisk, SsetCPSorAtRisk] = useState(false);
  const [SIncapacitated, SsetIncapacitate] = useState(false);
  const [SIEPpreschoolOnly, SsetIEPpreschoolOnly] = useState(false);
 
  const [understandPartDayYear, setUnderstandPartDayYear] = useState(false);


  // Primary Parent/Guardian additional state variables
  const [PwagesFrequency, setPwagesFrequency] = useState("");
  const [PchildSupportFrequency, setPchildSupportFrequency] = useState("");
  const [PAlimonyFrequency, setPAlimonyFrequency] = useState("");
  const [PSocialSecurityFrequency, setPSocialSecurityFrequency] = useState("");
  const [PCashAidFrequency, setPCashAidFrequency] = useState("");
  const [POtherFrequency, setPOtherFrequency] = useState("");

  // Secondary Parent/Guardian additional state variables
  const [SwagesFrequency, setSwagesFrequency] = useState("");
  const [SchildSupportFrequency, setSchildSupportFrequency] = useState("");
  const [SAlimonyFrequency, setSAlimonyFrequency] = useState("");
  const [SSocialSecurityFrequency, setSSocialSecurityFrequency] = useState("");
  const [SCashAidFrequency, setSCashAidFrequency] = useState("");
  const [SOtherFrequency, setSOtherFrequency] = useState("");


  const [CALWorks, setCalWorks] = useState("");
  const [CALFresh, setCALFresh] = useState("");
  const [WIC, setWIC] = useState("");
  

  const [children, setChildren] = useState([
    { name: "", birthday: "", needCare: false, iepIfsp: false},
  ]);

  const addChildField = () => {
    setChildren([...children, { name: "", birthday: "", needCare: false, iepIfsp: false }]);
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
    PsetPhoneNumber(formattedNumber);
  };

  const changeSPhone = (e) => {
    const input = e.target.value;
    const formattedNumber = formatPhoneNumber(input);
    SsetPhoneNumber(formattedNumber);
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
    let isValid = true;
    if (PfirstName.trim() === '' || PlastName.trim() === ''){
      isValid = false;
      alert("Please fill out all required fields")
    }
    if(isValid){
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
        Pwages,
        PchildSupport,
        PAlimony, 
        PSocialSecurity,
        PCashAid,
        POther,
        incomeExplaination,
        
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
        Swages,
        SchildSupport,
        SAlimony, 
        SSocialSecurity,
        SCashAid,
        SOther,
        preschoolOnlyChecked,
        fullDayCareChecked,
        Pworking,
        PlookingForWorking,
        PgoingToSchool,
        PCPSorAtRisk,
        PIncapacitated,
        PIEPpreschoolOnly,
        Sworking,
        SlookingForWorking,
        SgoingToSchool,
        SCPSorAtRisk,
        SIncapacitated,
        SIEPpreschoolOnly,
               
        CALFresh,
        CALWorks,
        WIC,

        children,
        
       
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    alert("Submission Successful")
    window.location.reload();

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
            <span className="required-indicator">*</span>First Name: 
            </label>
            <input
              type="text"
              id="first-name"
              className="input-box"
              value={PfirstName}
              required 
              onChange={(e) => PsetFirstName(e.target.value.trim())}
            />
                    
            <label htmlFor="last-name" className="input-label">
            <span className="required-indicator">*</span>Last Name:
            </label>
            <input
              type="text"
              id="last-name"
              className="input-box"
              required
              value={PlastName}
              onChange={(e) => PsetLastName(e.target.value.trim())}
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
              onChange={changePPhone}
              maxLength={14}
              pattern="\(\d{0,3}\) \d{0,3}-\d{0,4}"
              placeholder="(XXX) XXX-XXXX"
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
            
            </div>
        </div>
        <h3>Secondary Parent/Guardian</h3>
<div className="group1">
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

  <div>
    <label htmlFor="first-name" className="input-label">
      First Name:
    </label>
    <input
      type="text"
      id="first-name"
      className={`input-box ${SlivesInHome ? '' : 'disabled'}`}
      value={SfirstName}
      onChange={(e) => SsetFirstName(e.target.value.trim())}
      disabled={!SlivesInHome}
    />

    <label htmlFor="last-name" className="input-label">
      Last Name:
    </label>
    <input
      type="text"
      id="last-name"
      className={`input-box ${SlivesInHome ? '' : 'disabled'}`}
      value={SlastName}
      onChange={(e) => SsetLastName(e.target.value.trim())}
      disabled={!SlivesInHome}
    />
  </div>

  <div className="group2">
    <label htmlFor="phone-number" className="input-label">
      Phone Number:
    </label>
    <input
      type="text"
      id="phone-number"
      className={`input-box ${SlivesInHome ? '' : 'disabled'}`}
      value={SphoneNumber}
      onChange={changeSPhone}
      maxLength={14}
      pattern="\(\d{0,3}\) \d{0,3}-\d{0,4}"
      placeholder="(XXX) XXX-XXXX"
      disabled={!SlivesInHome}
    />

    <label htmlFor="text" className="checkbox-label">
      Text OK:
    </label>
    <input
      type="checkbox"
      id="text"
      checked={StextOK}
      onChange={(e) => SsettextOK(e.target.checked)}
      disabled={!SlivesInHome}
    />

    <label htmlFor="email" className="input-label">
      Email:
    </label>
    <input
      type="text"
      id="email"
      className={`input-box ${SlivesInHome ? '' : 'disabled'}`}
      value={Semail}
      onChange={(e) => SsetEmail(e.target.value)}
      disabled={!SlivesInHome}
    />
  </div>

  <div className="group3">
    <label htmlFor="street" className="input-label">
      Street:
    </label>
    <input
      type="text"
      id="street"
      className={`input-box ${SlivesInHome ? '' : 'disabled'}`}
      value={Sstreet}
      onChange={(e) => SsetStreet(e.target.value)}
      disabled={!SlivesInHome}
    />

    <label htmlFor="city" className="input-label">
      City:
    </label>
    <input
      type="text"
      id="city"
      className={`input-box ${SlivesInHome ? '' : 'disabled'}`}
      value={Scity}
      onChange={(e) => SsetCity(e.target.value)}
      disabled={!SlivesInHome}
    />

    <label htmlFor="state" className="input-label">
      State:
    </label>
    <input
      type="text"
      id="state"
      className={`input-box ${SlivesInHome ? '' : 'disabled'}`}
      value={Sstate}
      onChange={(e) => SsetState(e.target.value)}
      disabled={!SlivesInHome}
    />

    <label htmlFor="zip" className="input-label">
      Zip:
    </label>
    <input
      type="text"
      id="zip"
      className={`input-box ${SlivesInHome ? '' : 'disabled'}`}
      value={Szip}
      onChange={(e) => SsetZip(e.target.value)}
      disabled={!SlivesInHome}
    />
  </div>
</div>



        <div className="children-section">
          <h3>Children</h3> 
          <h6>Please List All Childeren under 18</h6>

          
          
   <div className="children-container">
      {children.map((child, index) => (
    
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


        </div>
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
                value={Pwages === '' ? '$' : formatCurrencyInput(Pwages)}
                onChange={(e) => {
                  const inputVal = e.target.value.replace(/[^0-9.]/g, '');
                  PsetWages(inputVal);
                }} />

              <select
                    value={PwagesFrequency}
                    onChange={(e) => setPwagesFrequency(e.target.value)}
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
                value={PchildSupport === '' ? '$' : formatCurrencyInput(PchildSupport)}
                onChange={(e) => {
                  const inputVal = e.target.value.replace(/[^0-9.]/g, '');
                  PsetChildSupport(inputVal);
                }} />
              <select
                    value={PchildSupportFrequency}
                    onChange={(e) => setPchildSupportFrequency(e.target.value)}
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
                value={PAlimony === '' ? '$' : formatCurrencyInput(PAlimony)}
                onChange={(e) => {
                  const inputVal = e.target.value.replace(/[^0-9.]/g, '');
                  PsetAlimony(inputVal);
                }} />
              <select
                    value={PAlimonyFrequency}
                    onChange={(e) => setPAlimonyFrequency(e.target.value)}
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
                value={PSocialSecurity === '' ? '$' : formatCurrencyInput(PSocialSecurity)}
                onChange={(e) => {
                  const inputVal = e.target.value.replace(/[^0-9.]/g, '');
                  PsetSocialSecurity(inputVal);
                }} />
              <select
                    value={PSocialSecurityFrequency}
                    onChange={(e) => setPSocialSecurityFrequency(e.target.value)}
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
                value={PCashAid === '' ? '$' : formatCurrencyInput(PCashAid)}
                onChange={(e) => {
                  const inputVal = e.target.value.replace(/[^0-9.]/g, '');
                  PsetCashAid(inputVal);
                }}/>
              <select
                    value={PCashAidFrequency}
                    onChange={(e) => setPCashAidFrequency(e.target.value)}
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
                value={POther === '' ? '$' : formatCurrencyInput(POther)}
                onChange={(e) => {
                  const inputVal = e.target.value.replace(/[^0-9.]/g, '');
                  PsetOther(inputVal);
                }} />
              <select
                    value={POtherFrequency}
                    onChange={(e) => setPOtherFrequency(e.target.value)}
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
                value={Swages === '' ? '$' : formatCurrencyInput(Swages)}
                onChange={(e) => {
                  const inputVal = e.target.value.replace(/[^0-9.]/g, '');
                  SsetWages(inputVal);
                }}/>

              <select
                    value={SwagesFrequency}
                    onChange={(e) => setSwagesFrequency(e.target.value)}
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
                value={SchildSupport === '' ? '$' : formatCurrencyInput(SchildSupport)}
                onChange={(e) => {
                  const inputVal = e.target.value.replace(/[^0-9.]/g, '');
                  SsetChildSupport(inputVal);
                }}/>
              <select
                    value={SchildSupportFrequency}
                    onChange={(e) => setSchildSupportFrequency(e.target.value)}
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
                value={SAlimony === '' ? '$' : formatCurrencyInput(SAlimony)}
                onChange={(e) => {
                  const inputVal = e.target.value.replace(/[^0-9.]/g, '');
                  SsetAlimony(inputVal);
                }}/>
              <select
                    value={SAlimonyFrequency}
                    onChange={(e) => setSAlimonyFrequency(e.target.value)}
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
                value={SSocialSecurity === '' ? '$' : formatCurrencyInput(SSocialSecurity)}
                onChange={(e) => {
                  const inputVal = e.target.value.replace(/[^0-9.]/g, '');
                  SsetSocialSecurity(inputVal);
                }}/>
              <select
                    value={SSocialSecurityFrequency}
                    onChange={(e) => setSSocialSecurityFrequency(e.target.value)}
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
                value={SCashAid === '' ? '$' : formatCurrencyInput(SCashAid)}
                onChange={(e) => {
                  const inputVal = e.target.value.replace(/[^0-9.]/g, '');
                  SsetCashAid(inputVal);
                }}
                />
              <select
                    value={SCashAidFrequency}
                    onChange={(e) => setSCashAidFrequency(e.target.value)}
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
                value={SOther === '' ? '$' : formatCurrencyInput(SOther)}
                onChange={(e) => {
                  const inputVal = e.target.value.replace(/[^0-9.]/g, '');
                  SsetOther(inputVal);
                }}
              />
              <select
                    value={SOtherFrequency}
                    onChange={(e) => setSOtherFrequency(e.target.value)}
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
          <textarea style ={{resize: "none"}} id="notes" rows="4" cols="50" value={incomeExplaination}
          onChange={(e) => setincomeExplaination(e.target.value)}></textarea>
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
            <input
              placeholder="Amount per month"
              type="text"
              className="input-box"
              value={CALWorks === '' ? '' : formatCurrencyInput(CALWorks)}
              onChange={(e) => {
                const inputVal = e.target.value.replace(/[^0-9.]/g, '');
                setCalWorks(inputVal);
              }}
            />
          </td>
          <td>
            <input
              placeholder="Amount per month"
              type="text"
              className="input-box"
              value={CALFresh === '' ? '' : formatCurrencyInput(CALFresh)}
              onChange={(e) => {
                const inputVal = e.target.value.replace(/[^0-9.]/g, '');
                setCALFresh(inputVal);
              }}
            />
          </td>
          <td>
            <input
              placeholder="Amount per month"
              type="text"
              className="input-box"
              value={WIC === '' ? '' : formatCurrencyInput(WIC)}
              onChange={(e) => {
                const inputVal = e.target.value.replace(/[^0-9.]/g, '');
                setWIC(inputVal);
              }}
            />
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
          checked={fullDayCareChecked}
          onChange={(e) => setFullDayCareChecked(e.target.checked)}
        />
        <label htmlFor="full-day-care">Full Day Care</label>
      </div>

      {fullDayCareChecked && (
        <div className="table2">
            <h5>Please provide information as applicable to your reason for requesting full-day service.<h6>(Select all that apply)</h6></h5>
            
            <h3 className="header">Primary Parent/Guardian</h3>


            <table className="grid">
          <thead>
            <tr>
              <th className="tableCheckHeader">Working</th>
              <th className="tableCheckHeader">Looking for Work</th>
              <th className="tableCheckHeader">Going to School</th>
              <th className="tableCheckHeader">CPS or At Risk</th>
              <th className="tableCheckHeader">Incapacitated w/ Dr Note</th>
              <th className="tableCheckHeader">IEP Preschool Only</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="checkbox" checked={Pworking}
                onChange={(e) => Psetworking(e.target.checked)}/>
              </td>
              <td>
                <input type="checkbox" checked={PlookingForWorking}
                onChange={(e) => PsetlookingForWorking(e.target.checked)}/>
              </td>
              <td>
                <input type="checkbox" checked={PgoingToSchool}
                onChange={(e) => PsetgoingToSchool(e.target.checked)}/>
              </td>
              <td>
                <input type="checkbox" checked={PCPSorAtRisk}
                onChange={(e) => PsetCPSorAtRisk(e.target.checked)}/>
              </td>
              <td>
                <input type="checkbox" checked={PIncapacitated}
                onChange={(e) => PsetIncapacitate(e.target.checked)}/>
              </td>
              <td>
                <input type="checkbox" checked={PIEPpreschoolOnly}
                onChange={(e) => PsetIEPpreschoolOnly(e.target.checked)}/>
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
              <th className="tableCheckHeader">Looking for Work</th>
              <th className="tableCheckHeader">Going to School</th>
              <th className="tableCheckHeader">CPS or At Risk</th>
              <th className="tableCheckHeader">Incapacitated w/ Dr Note</th>
              <th className="tableCheckHeader">IEP Preschool Only</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
              <input type="checkbox" checked={Sworking}
                onChange={(e) => Ssetworking(e.target.checked)}/>
              </td>
              <td>
                <input type="checkbox" checked={SlookingForWorking}
                onChange={(e) => SsetlookingForWorking(e.target.checked)}/>
              </td>
              <td>
                <input type="checkbox" checked={SgoingToSchool}
                onChange={(e) => SsetgoingToSchool(e.target.checked)}/>
              </td>
              <td>
                <input type="checkbox" checked={SCPSorAtRisk}
                onChange={(e) => SsetCPSorAtRisk(e.target.checked)}/>
              </td>
              <td>
                <input type="checkbox" checked={SIncapacitated}
                onChange={(e) => SsetIncapacitate(e.target.checked)}/>
              </td>
              <td>
                <input type="checkbox" checked={SIEPpreschoolOnly}
                onChange={(e) => SsetIEPpreschoolOnly(e.target.checked)}/>
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
          checked={preschoolOnlyChecked}
          onChange={(e) => setPreschoolOnlyChecked(e.target.checked)}
        />
        <label htmlFor="preschool-only">Preschool Only</label>
      </div>

      {preschoolOnlyChecked && (
        <div className="partDayYearCheckbox">
          <input
            type="checkbox"
            id="part-day-year-checkbox"
            checked={understandPartDayYear}
            onChange={(e) => setUnderstandPartDayYear(e.target.checked)}
            required
          />
          <label htmlFor="part-day-year-checkbox">
            I understand this is part day/year
          </label>
        </div>
      )}
    </div>
</div>


      

      </div>

      <div className="btn-container">
        <button type="submit" className="submit-button" onClick={submitForm}>
          Submit
        </button>
        <button
        type="button"
        className="cancel-button"
        onClick={() => (window.location.href = 'https://concordchildcare.org/eligibility%2F-enrollment#355f4dda-9cba-48c0-9e75-a6ffbc980258')}
      >
        Cancel
      </button>
      </div>
    </div>
  );
};

export default InputForm;
