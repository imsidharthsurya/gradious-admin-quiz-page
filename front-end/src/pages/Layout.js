import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>

        <div class="header">
<div class="img1">
<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 0H0V13V14.0833H0.0359042C0.572152 21.9888 6.9867 23.8625 10.5935 24.9161C11.9148 25.3021 12.8593 25.578 13 26C13.1479 25.5563 14.0632 25.2741 15.3489 24.8777C18.7715 23.8226 24.8187 21.9584 26 14.0833V0H13Z" fill="#F55533"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.0002 4.33325C10.0086 4.33325 7.5835 6.75838 7.5835 9.74992C7.5835 12.7415 10.0086 15.1666 13.0002 15.1666C15.9917 15.1666 18.4168 12.7415 18.4168 9.74992V4.33325H13.0002ZM13.0002 11.9166C14.1968 11.9166 15.1669 10.9465 15.1669 9.74991C15.1669 8.55329 14.1968 7.58324 13.0002 7.58324C11.8036 7.58324 10.8335 8.55329 10.8335 9.74991C10.8335 10.9465 11.8036 11.9166 13.0002 11.9166Z" fill="white"/>
<path d="M7.5835 19.5C7.5835 17.7051 9.03857 16.25 10.8335 16.25H18.4168V16.25C18.4168 18.0449 16.9618 19.5 15.1668 19.5H7.5835V19.5Z" fill="white"/>
</svg>
</div>
<div class="text1">Gradious</div>
<div className="nav-bar-temp">
<div class="nav-bar">Uploads</div>
<div class="nav-bar">Users</div>
<div class="nav-bar">Learning path</div>
<div class="nav-bar"><Link to="/Addques">Add Question</Link></div>
<div class="nav-bar"><Link to="/CreateTest">Create Test</Link></div>
<div class="nav-bar"><Link to="/">Question</Link></div>
</div>

</div>

      <Outlet />
    </>
  )
};

export default Layout;