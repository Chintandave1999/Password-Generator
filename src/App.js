import React from 'react'
import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'



export default function App() {
  const [length,setlength] = useState(8)
  const [number,setnumber] = useState(false);
  const [character,setcharacter] = useState(false);
  const [password,setpassword] = useState("");

  const passwordref=useRef(null);

  const passwordgenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (character) str +="!@#$%^&*";

    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random()*str.length +1 )
      pass += str.charAt(char)
    }

    setpassword(pass)
    


  },[length,number,character,setpassword])

  const copypassworftoClipboard=useCallback(()=>{
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password)

  },[password])



  useEffect(()=>{
    passwordgenerator()

  },[length,number,character])




  return (
    <>
    <h1 className='heading'>Password Generator</h1>
    <div className='container'>
      <div className='passvalue'>
        <input type='text' className='inp' value={password} placeholder='password'readOnly ref={passwordref}></input>
        <button className='btn' onClick={copypassworftoClipboard}>Copy</button>
      </div>

      <div className='mainparameter'>
        
       <div className='lengthrange'>
         <input type='range' min={1} max={50} value={length} onChange={(e)=>{setlength(e.target.value)}}></input>
         <label>Length {length}</label>
       </div>

       <div>
         <input type='checkbox' className='box' value={number} onChange={()=>{
          setnumber((prev)=>!prev)
         }}></input>
         <label>Number</label>
       </div>
       <div>
         <input type='checkbox' className='box' defaultChecked={character} onChange={()=>{
          setcharacter((prev)=>!prev)
         }}></input>
         <label>Character</label>
       </div>



       

      </div>
    </div>
    </>
  )
}

