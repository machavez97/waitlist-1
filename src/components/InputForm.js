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
  const [PlivesInHome, PsetLivesInHome] = useState(false);
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
  const [preschoolCPS, setPreSchoolCPS] = useState(false);
  const [preSchoolIEP, setPreSchoolIEP] = useState(false);


  const [CALWorks, setCalWorks] = useState("");
  const [CALFresh, setCALFresh] = useState("");
  const [WIC, setWIC] = useState("");


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
    let isValid = true;
    if (PfirstName.trim() === ''){
      isValid = false;
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
        PlivesInHome,
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
        preSchoolIEP,
        preschoolCPS,
        
        CALFresh,
        CALWorks,
        WIC,

        children,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
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
              onChange={(e) => PsetFirstName(e.target.value)}
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
                <input placeholder="$ Weekly/Monthly" type="text" className="input-box" value={Pwages}
              onChange={(e) => PsetWages(e.target.value)}/>
              </td>
              <td>
                <input placeholder="$ Weekly/Monthly" type="text" className="input-box" value={PchildSupport}
              onChange={(e) => PsetChildSupport(e.target.value)}/>
              </td>
              <td>
              <input placeholder="$ Weekly/Monthly" type="text" className="input-box" value={PAlimony}
              onChange={(e) => PsetAlimony(e.target.value)}/>
              </td>
              <td>
                <input placeholder="$ Weekly/Monthly"type="text" className="input-box" value={PSocialSecurity}
              onChange={(e) => PsetSocialSecurity(e.target.value)}/>
              </td>
              <td>
                <input placeholder="$ Weekly/Monthly"type="text" className="input-box" value={PCashAid}
              onChange={(e) => PsetCashAid(e.target.value)}/>
              </td>
              <td>
                <input placeholder="$ Weekly/Monthly"type="text" className="input-box" value={POther}
              onChange={(e) => PsetOther(e.target.value)}/>
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
                <input placeholder="$ Weekly/Monthly" type="text" className="input-box" value={Swages}
              onChange={(e) => SsetWages(e.target.value)}/>
              </td>
              <td>
                <input placeholder="$ Weekly/Monthly" type="text" className="input-box" value={SchildSupport}
              onChange={(e) => SsetChildSupport(e.target.value)}/>
              </td>
              <td>
                <input placeholder="$ Weekly/Monthly" type="text" className="input-box" value={SAlimony}
              onChange={(e) => SsetAlimony(e.target.value)}/>
              </td>
              <td>
                <input placeholder="$ Weekly/Monthly"type="text" className="input-box" value={SSocialSecurity}
              onChange={(e) => SsetSocialSecurity(e.target.value)}/>
              </td>
              <td>
                <input placeholder="$ Weekly/Monthly"type="text" className="input-box" value={SCashAid}
              onChange={(e) => SsetCashAid(e.target.value)}/>
              </td>
              <td>
                <input placeholder="$ Weekly/Monthly"type="text" className="input-box" value={SOther}
              onChange={(e) => SsetOther(e.target.value)}/>
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
          <textarea id="notes" rows="4" cols="50" value={incomeExplaination}
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
        <input placeholder="Amount per month" type="text" className="input-box" value={CALWorks}
              onChange={(e) => setCalWorks(e.target.value)}/>
      </td>
      <td>
        <input placeholder="Amount per month" type="text" className="input-box" value={CALFresh}
              onChange={(e) => setCALFresh(e.target.value)}/>
      </td>
      <td>
        <input placeholder="Amount per month" type="text" className="input-box" value={WIC}
              onChange={(e) => setWIC(e.target.value)}/>
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
                <input type="checkbox" checked={PsetIncapacitate}
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
                <input type="checkbox" checked={SsetIncapacitate}
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
              <input type="checkbox" checked={preschoolCPS}
                onChange={(e) => setPreSchoolCPS(e.target.checked)}/>
              </td>
              <td>
                <input type="checkbox" checked={preSchoolIEP}
                onChange={(e) => setPreSchoolIEP(e.target.checked)}/>
              </td>
            </tr>
          </table>
        </div>
      )}
    </div>
</div>


      

      </div>

      <div className="btn-container">
        <button type="submit" className="submit-button" onClick={submitForm}>
          Submit
        </button>
        <button type="cancel" className="cancel-button" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default InputForm;
