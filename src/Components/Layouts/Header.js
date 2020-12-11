import React from 'react';


function Header() {

    return (
        <header>
            <div className="navbar navbar-dark bg-primary shadow-sm">
                <div className="container d-flex justify-content-between">
                    <a href="#" className="navbar-brand d-flex align-items-center">
                        <strong>My Todo List</strong>
                    </a>
                </div>
            </div>
        </header>
    )
}


export default Header;