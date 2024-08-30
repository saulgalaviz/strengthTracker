import React from "react";

const HeaderComponent = () => {
    return (
        <div>
            <header>
                <nav className="navbar navbar-dark bg-dark">
                    <span>
                    <a className="navbar-brand" href="http://localhost:3000/">Strength Tracker</a>
                    <a className="navbar-brand" href="http://localhost:3000/about">About</a>
                    </span>
                    {/* <li style="display:inline-block;">
                        
                    </li>
                    <li style="display:inline-block;">
                        
                    </li> */}
                </nav>
            </header>
        </div>
    )
}

export default HeaderComponent