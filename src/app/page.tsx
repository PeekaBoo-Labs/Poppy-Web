import Image from 'next/image'
import './page.css'

export default function Home() {
  return (
  <div>
      <div className="nav">
        <p>logo</p>
        <p>hamburger</p>
      </div>
      <div className = "idekWhatthisis">
        <p>Screening</p>
        <p>About</p>
      </div>
      <div  className='main'>
        <div className = "card">
          <div>
            <div className="bars"><p>__________________</p><p>__________________</p><p>__________________</p></div>
            <div><p className="prompt">What are the symptoms in the affected area?</p></div>
            <div><p className='subtext'>Choose one or more options</p></div>
            <div className='buttons'>
              <button>18-24</button>
              <button>Male</button>
              <button>Orange</button>
              <button>AB</button>
              <button>120lb</button>
              <button>{`5\'7\"`}</button>
            </div>
          </div>
          <div className='bruh'><button>Back</button><button>Next</button></div>
        </div>
        
      </div>
  </div>
  )
}
