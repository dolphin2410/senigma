import './App.css';
import { interpretCode, writeCode } from './firebase';

function checkValid(num: number): boolean {
    if (isNaN(num)) {
        alert("유효하지 않은 숫자입니다.")
        return false
    }

    if (num < 1000 || num > 9999) {
        alert("유효하지 않은 숫자입니다.")
        return false
    }

    return true
}

async function interpretData() {
  const passcode = parseInt((document.querySelector('.interpret_passcode') as HTMLInputElement).value)
  if(!checkValid(passcode))
    return

  const code = parseInt((document.querySelector('.interpret_code') as HTMLInputElement).value)
  if(!checkValid(code))
    return

  const payload = await interpretCode(passcode, code)

  document.querySelector('.results')!!.innerHTML = `해석: ${code} -> ${payload}`
}

async function uploadData() {
  const passcode = parseInt((document.querySelector('.upload_passcode') as HTMLInputElement).value)
  if(!checkValid(passcode))
    return

  const payload = (document.querySelector('.upload_payload') as HTMLInputElement).value

  const code = await writeCode(passcode, payload)

  document.querySelector('.results')!!.innerHTML = `업로드: ${payload} -> ${code}`
}

function App() {
  return (
    <div className="App">
      <h1 className='title'>SENIGMA</h1>
      <div className='results_container'>
        <h3>Results:</h3>
        <div className='results'>-</div>
      </div>
      <div className='action_container'>
        <h3>비밀 암호 복호화</h3>
        <input type="text" id='interpret_passcode' className='interpret_passcode' placeholder='패스코드' />
        <input type="text" id="interpret_code" className='interpret_code' placeholder='복호화할 비밀 암호' />
        <button onClick={interpretData}>해석하기</button>
      </div>

      <div className='action_container'>
        <h3>비밀 내용 암호화</h3>
        <input type="text" className="upload_passcode" placeholder='패스코드' />
        <input type="text" className="upload_payload" placeholder='암호화 할 내용' />
        <button onClick={uploadData}>업로드하기</button>
      </div>
    </div>
  );
}

export default App;
