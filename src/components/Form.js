import React, { useState, useEffect } from 'react';
import './Form.css';
import './Gallery.css';
import Theme from './Theme';

var patientinfo = {};
const Form = () => {
    const [home, setHome] = useState(true);
    const [move, setMove] = useState(false);
    const [theme, setshowTheme] = useState(false);

    function saveData(){
        if (move) {
            patientinfo['theme'] = document.getElementsByClassName('border-img')[0].id;
            console.log(patientinfo);
            setDone(true);
            setshowTheme(false);
        }
        else {
            alert ("You didn't choose a theme")
        }
    }

    const showTheme = () => {
        if(!document.getElementById('myselect').options[document.getElementById('myselect').selectedIndex].value == "" && !document.getElementById("check-empty").value.length == 0 && !document.getElementById('myselect1').options[document.getElementById('myselect1').selectedIndex].value == ""){
            setHome(false);
            patientinfo = {
                name: document.getElementById("check-empty").value,
                room: document.getElementById('myselect').options[document.getElementById('myselect').selectedIndex].value,
                diet: document.getElementById('myselect1').options[document.getElementById('myselect1').selectedIndex].value,

            };
            setshowTheme(true);
            //console.log(patientinfo);
        }
        else {
            alert ("please fill in the blank fields");
        }
    }; 

    const [done, setDone] = useState(false);
    const [images, setImages] = useState([]);
    const [imagesNames, setImagesNames] = useState([]);
    useEffect(() => {
        fetch("https://gbm1wdp0jl.execute-api.us-east-1.amazonaws.com/api/get_themes")
          .then((res) => res.json())
          .then((data) => {
            //console.log(data);
            setImages(data);
            setImagesNames(data.ThemeName);
          })
    }, []);

  return (
    <div>
       { home &&   <div>
          <h1 className='hospital-title'>Spectrum Health</h1>
            <h2 className='reg-title'>Patient registration</h2>
            <div className='form1'> 
                <h5 className='reg-title2'>Please fill in the information below.</h5>
                <div className='input-info'>
                <label className='label-name name1'>Patient's full name:</label>
                <input required
                    id="check-empty"
                    className="input-name"
                    type= "text"
                    name="name"
                />
                
                <div className='container'> 
                <div class="row">
                    <div class="col-sm-6 col1">
                    <label className='label-name'>Room number:</label>
                    <select id="myselect" required>
                        <option value="">None</option>
                        <option value="1100">1100</option>
                        <option value="1101">1101</option>
                        <option value="1102">1102</option>
                        <option value="1103">1103</option>
                        <option value="1104">1104</option>
                        <option value="1105">1105</option>
                        <option value="1106">1106</option>
                        <option value="1107">1107</option>
                        <option value="1108">1108</option>
                        <option value="1109">1109</option>
                        <option value="1110">1110</option>
                    </select>
                    </div>
                    <div class="col-sm-6 col1">
                    <label className='label-name'>Food restrictions:</label>
                    <select id="myselect1" required>
                        <option value="">None</option>
                        <option value="level1">Level1</option>
                        <option value="level2">Level2</option>
                        <option value="level3">Level3</option>
                    </select>
                    </div>
                </div>
                </div>
                </div>
                <button  id="btn1" className='submit-btn' onClick={showTheme}>Next</button>
            </div>
        </div>}
        
        {theme && <div className='form2'>
            <h5 className='reg-title3'>Turn the screen around and let the patient choose a theme: </h5>
            <div className='form-pic row' id="form-pic"  onClick={() => setMove(true)}>
                {images.length > 0 && images.map((theme) => <Theme {... theme}/>) } 
            </div>
            <button className="btn2" onClick={saveData}>submit</button>

        </div>}

        {done && 
            <div className='form3'>
                <p className='bye-note'>
                    Thank you. Here's the patient's information:
                </p>
                <p className='bye-info'>
                    Name: {patientinfo.name} 
                    <br/>
                    Room Number: {patientinfo.room}
                    <br/>
                    Food restrictions: {patientinfo.diet}
                    <br/>
                    Theme: {patientinfo.theme}
                </p>
            </div>
        }

    </div>
  )
}

export default Form;