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
            <select onChange={this.updateRank}>
                <option value="0" selected>(Select your Rank)</option>
                <option value="1">Bronze</option>
                <option value="2">Silver</option>
                <option value="3">Gold</option>
                <option value="4">Platinum</option>
                <option value="5">Diamond</option>
                <option value="6">Champ</option>
                <option value="7">Grand Champ</option>
                <option value="8">Celebrity</option>
                <option value="9">Pro</option>
            </select>
        );
    }
}

export default RankSelector