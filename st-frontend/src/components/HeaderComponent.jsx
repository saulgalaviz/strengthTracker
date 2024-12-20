import React from "react";

const HeaderComponent = () => {
    return (
        <div className="bg-dark">
            <header>
                <div className="container">
                    <nav className="navbar navbar-dark">
                        <span>
                        {/* <a className="navbar-brand " href="http://localhost:3000/visual">Visual</a>
                        <a className="navbar-brand" href="http://localhost:3000/">Main List</a>
                        <a className="navbar-brand" href="http://localhost:3000/about">About</a> */}
                        <a className="navbar-brand " href="https://www.strength-tracker.com/visual">Visual</a>
                        <a className="navbar-brand" href="https://www.strength-tracker.com/">Main List</a>
                        <a className="navbar-brand" href="https://www.strength-tracker.com/about">About</a>
                        </span>
                    </nav>
                </div>
            </header>
        </div>
    )
}

export default HeaderComponent