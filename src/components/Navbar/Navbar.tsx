import './Navbar.css'

export function Navbar() {
  return (
    <div className='navbar'>
      <img src="icon.svg" alt="company logo" width={50} />
      <div>
        <a className='navbarHeading' href='https://www.google.com'>features</a>
        <a className='navbarHeading' href='https://www.google.com'>benefits</a>
        {/* <h1 className='navbarHeading'>Plans</h1> */}
        <a className='navbarHeading' href='https://www.google.com'>faq</a>
      </div>
      <button type="button" className="btn btn-primary btn-lg getStarted">
        get started
      </button>
    </div>
  );
}
