import React from 'react';
import winVid from './images/winVideo.mp4';

class Popup extends React.Component {  
  
  
    render() {  
    return (  
            <div className='popup' style={popup} className={'fade'}>  
                <div className='popupInner' style={popupInner}>  
                    <video width="80%" height="auto" autoPlay="true" loop="true" muted="true" id="winVid" style={{float: 'left', margin: '1vw'}}>
                        <source src={winVid} type="video/mp4" />
                    </video>
                    <h2 style={{paddingTop: '5vw'}}>You Win!</h2>
                    <a href="https://www.reddit.com/r/RocketLeague/comments/9r1xjm/this_is_rocket_league_a_fanmade_animation/" target="_blank"><h3>Video Credit</h3></a>
                    <button onClick={this.props.closePopup}>Close</button>  
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
    borderRadius: '20px',
    overflow: 'hidden'
}

const popupInner = {
    position: 'absolute',
    left: '5%',  
    right:'5%',
    top: '5%',
    bottom: '5%',
    margin: 'auto',
    borderRadius: '20px',
    background: 'purple',
    opacity: '1',
    color: 'white',
    textAlign: 'center',
    clear: 'both',
    overflow: 'hidden'
}

export default Popup;