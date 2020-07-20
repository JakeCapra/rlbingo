import React from 'react';  

class Popup extends React.Component {  
  render() {  
    return (  
        <div className='popup' style={popup} className={'fade'}>  
            <div className='popupInner' style={popupInner}>  
                <h1>This is a popup</h1>  
                <button onClick={this.props.closePopup} style={{color: 'black'}}>close me</button>  
            </div>  
        </div> 
        );  
    }  
}

const popup = {
    position: 'fixed',
    width: '50%' ,
    height: '50%',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    margin: 'auto',
    backgroundColor: 'black',
    opacity: '0.9',
    // transitionDuration: '2s',
    // transitionTimingFunction: 'ease',
}

const popupInner = {
    position: 'absolute',
    // left: '25%',  
    // right:' 25%',
    // top: '25%',
    // bottom: '25%',
    margin: 'auto',
    borderRadius: '20px',
    background: 'white',
    opacity: '1',
}

export default Popup;