import React from 'react';

class RankSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0
        }
    }
    updateRank = (event) => {
        this.setState({ value: event.target.value })
        this.props.onRankSelected(event.target.value);
    }

    render() {
        return(
            <select onChange={this.updateRank} id='rankSelect'>
                <option value="0" selected className='selectValue'>(Select your Rank)</option>
                <option value="1" className='selectValue'>Bronze</option>
                <option value="2" className='selectValue'>Silver</option>
                <option value="3" className='selectValue'>Gold</option>
                <option value="4" className='selectValue'>Platinum</option>
                <option value="5" className='selectValue'>Diamond</option>
                <option value="6" className='selectValue'>Champ</option>
                <option value="7" className='selectValue'>Grand Champ</option>
                <option value="8" className='selectValue'>Celebrity</option>
                <option value="9" className='selectValue'>Pro</option>
            </select>
        );
    }
}

export default RankSelector