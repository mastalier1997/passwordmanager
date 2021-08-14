import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import './../../style/generatePassword.css';
import {
  numbers,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharacters,
} from './characters'
import 'react-toastify/dist/ReactToastify.css'
import { COPY_SUCCESS } from './message'
import ClipboardIcon from 'react-clipboard-icon';
import Navbar from './../navbar';


function GereratePassword() {
  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(15)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)

  const handleGeneratePassword = (e) => {
    if (
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      notify('You must Select atleast one option', true)
    }
    let characterList = ''

    if (includeLowercase) {
      characterList = characterList + lowerCaseLetters
    }

    if (includeUppercase) {
      characterList = characterList + upperCaseLetters
    }

    if (includeNumbers) {
      characterList = characterList + numbers
    }

    if (includeSymbols) {
      characterList = characterList + specialCharacters
    }

    setPassword(createPassword(characterList))
  }
  const createPassword = (characterList) => {
    let password = ''
    const characterListLength = characterList.length

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    return password
  }

  const copyToClipboard = () => {
    const newTextArea = document.createElement('textarea')
    newTextArea.innerText = password
    document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand('copy')
    newTextArea.remove()
  }

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      toast(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  const handleCopyPassword = (e) => {
    if (password === '') {
      notify('Nothing To Copy', true)
    } else {
      copyToClipboard()
      notify(COPY_SUCCESS)
    }
  }

  const style = { fill: 'white' }

  return (
    <>
      <Navbar />

      <div className='GenPassword'>
        <div className='container'>
          <div className='generator'>
            <h2 className='generator__header'>Password Generator</h2>
            <div className='generator__password'>
              <h3>{password}</h3>
              <button onClick={handleCopyPassword} className='copy__btn'>
                <ClipboardIcon style={style} id="icon"/>
              </button>
            </div>

            <div className='form-group'>
              <p htmlFor='password-strength'>Password length</p>
              <input
                defaultValue={passwordLength}
                onChange={(e) => setPasswordLength(e.target.value)}
                type='number'
                id='password-strength'
                name='password-strength'
                max='20'
                min='10'
              />
            </div>

            <div className='form-group'>
              <p htmlFor='uppercase-letters'>Include Uppercase Letters</p>
              <input
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                type='checkbox'
                id='uppercase-letters'
                name='uppercase-letters'
                className="checkbox"
              />
            </div>

            <div className='form-group'>
              <p htmlFor='lowercase-letters'>Include Lowercase Letters</p>
              <input
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                type='checkbox'
                id='lowercase-letters'
                name='lowercase-letters'
                className="checkbox"
              />
            </div>

            <div className='form-group'>
              <p htmlFor='include-numbers'>Include Numbers</p>
              <input
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                type='checkbox'
                id='include-numbers'
                name='include-numbers'
                className="checkbox"
              />
            </div>

            <div className='form-group'>
              <p htmlFor='include-symbols'>Include Symbols</p>
              <input
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                type='checkbox'
                id='include-symbols'
                name='include-symbols'
                className="checkbox"
              />
            </div>

            <button onClick={handleGeneratePassword} className='generator__btn'>
              Generate Password
            </button>
            <ToastContainer
              position='top-center'
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default GereratePassword