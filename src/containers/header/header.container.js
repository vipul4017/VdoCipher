import React, { Component } from 'react';

class Header extends Component {

    render() {
        return (
            <div className="App">
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid" style={{marginLeft: '50px'}}>
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#/">VdoCipher</a>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;
