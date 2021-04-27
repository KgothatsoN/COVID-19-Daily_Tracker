import React from 'react';

const Header = (props) => {
    return (
        <header>
            <h1 style={{fontSize: '2.5rem', marginTop: '2rem', textAlign: 'center'}}>{props.title}</h1>
        </header>
    )
}

export default Header;