import React from 'react';
import './Slideshow.scss';

class Slideshow extends React.Component {
    render() {
        return (
            <>
                <img src={require('./img/Slideshow1.jpg').default} alt="Slideshow" />

                <div>Hello World</div>
            </>
        );
    }
}

export default Slideshow;
