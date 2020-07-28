import React from 'react';
import GitHubLogo from './images/githubLogo.png';
import SteamLogo from './images/steamLogo.png';
import youTubeLogo from './images/youTubeLogo.png';
import redditLogo from './images/redditLogo.png';
import RankSelector from './RankSelector';
import { GetBingoTileItems } from './BingoItemRepository';
import WinScreen from './winScreen';

class Table extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rows: [
                [{title: 1, marked: false},{title: 2, marked: false}, {title: 3, marked: false},{title: 4, marked: false},{title: 5, marked: false}],
                [{title: 1, marked: false},{title: 2, marked: false}, {title: 3, marked: false},{title: 4, marked: false},{title: 5, marked: false}],
                [{title: 1, marked: false},{title: 2, marked: false}, {title: 3, marked: false},{title: 4, marked: false},{title: 5, marked: false}],
                [{title: 1, marked: false},{title: 2, marked: false}, {title: 3, marked: false},{title: 4, marked: false},{title: 5, marked: false}],
                [{title: 1, marked: false},{title: 2, marked: false}, {title: 3, marked: false},{title: 4, marked: false},{title: 5, marked: false}]
            ],
            disp: false,
            addedTiles: [],
            useAdded: false,
            sleepAmt: 200,
            selectedMaxLevel: 0,
            showPopup: false,
            //for screen dimensions
            width: 0, height: 0
            
        }
        this.rankSelected = this.rankSelected.bind(this);
        //for screen dimensions
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    //for screen dimensions -https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }


    loadText = () => {
        this.state.showPopup = false;
        var availableTiles = GetBingoTileItems(this.state.selectedMaxLevel);

        var usedIndex = [];
        var usedIndexLoad = [];
        let tileArr =[]; // tiles to added to board

        for (var i=0; i<this.state.addedTiles.length; i++) {
            if (this.state.addedTiles[i].use) {
                tileArr.push(this.state.addedTiles[i].title);
            }
        }

        //25 - length does not work in the for loop (for some reason) - javascript bad
        var insertAmt = 24 - tileArr.length;
        for (i=0; i<insertAmt; i++) {
            do
                    {
                        var index = Math.floor(Math.random() * availableTiles.length);

                    } while (usedIndexLoad.includes(index));
                    usedIndexLoad.push(index);
                    tileArr.push(availableTiles[index]);
        }

        for (i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                if (i === 2 && j === 2) {
                    this.state.rows[i][j].title = "Free";
                }
                else {
                    do
                    {
                        var index = Math.floor(Math.random() * tileArr.length);

                    } while (usedIndex.includes(index));
                    usedIndex.push(index);
                    this.state.rows[i][j].title = tileArr[index];
                    this.state.rows[i][j].marked = false;
                }   
                this.forceUpdate();
            }
        }
        this.disp = true;
        this.forceUpdate();
    }

    togglePopup() {  
        this.setState({  
             showPopup: !this.state.showPopup  
        });
    }  


    handleClick = (i, j) => {
        if (this.state.showPopup)
            return;
        var cell = document.getElementById(i.concat(j));
        if (cell.style.backgroundColor != "green") {
            cell.style.backgroundColor = "green";
            this.state.rows[i][j].marked = true;
        }
        else {
            cell.style.backgroundColor = "red";
            this.state.rows[i][j].marked = false;
        }
        this.checkWin();
        return;
    }

    async checkWin() {
        var pass=false;
        let temp = this.state.rows;
        let slpAmt = this.state.sleepAmt;
        //horizontal check
        for (var i=0; i<5; i++) {
            for (var j=0; j<5; j++) {
                if (temp[i][j].marked) {pass=true;}
                else {
                    pass=false;
                    break;
                }
            }
            if (pass) {
                await sleep(slpAmt);
                this.togglePopup(this)
                return;
            }
        }
        //vertical check
        for (i=0; i<5; i++) {
            for (j=0; j<5; j++) {
                if (temp[j][i].marked) {pass=true;}
                else {
                    pass=false;
                    break;
                }
            }
            if (pass) {
                await sleep(slpAmt);
                this.togglePopup(this)
                return;
            }
        }
        //diagonal check - left to right
        for (i=0; i<5; i++) {
            if (temp[i][i].marked) {pass=true;}
            else {
                pass=false;
                break;
            }
        }
        if (pass) {
            await sleep(slpAmt);
            this.togglePopup(this)
            return;
        }
        //diagonal check - right to left
        j = 4;
        for (i=0; i<5; i++) {
            if (temp[i][j].marked) {
                pass=true;
                j--;
            }
            else {
                pass=false;
                break;
            }
        }
        if (pass) {
            await sleep(slpAmt);
            this.togglePopup(this)
            return;
        }

    } 

    reset = () => {
        if (!this.disp) {
            return;
        }
        for (var i=0; i<5; i++) {
            for (var j=0; j<5; j++) {
                this.state.rows[i][j].marked = false;
                var id = i.toString() + j.toString();
                var tmp = document.getElementById(id);
                tmp.style.backgroundColor = "red";
            }
        }
        this.state.showPopup = false;
        this.forceUpdate();
    }

    onSubmit = (e) => {
        e.preventDefault();
        var input = document.getElementById("inputBox").value;
        this.state.addedTiles.push({title: input, use: false});
        this.useAdded = true;
        this.forceUpdate();
    }
    noReload = (e) => {
        e.preventDefault();
    }
    handleCheckboxClick = (e) => {
        console.log(e.target.id);
        if (e.target.checked) {
            this.state.addedTiles[e.target.id].use = true;
        }
        else {
            this.state.addedTiles[e.target.id].use = false;
        }
        this.forceUpdate();
    }
    rankSelected(value) {
        this.setState({ selectedMaxLevel: value });
    }

    render () {
        let content, sidePannel, topPannel, customTile, aboutPannel;
        var added = [];
        const display = this.disp, dispAdded = this.useAdded;

        if (this.state.width > 600) {
            sidePannel = 
                <div id='leftDiv'>
                    <button onClick={this.loadText} >Create Board</button>
                    <RankSelector onRankSelected={this.rankSelected} />
                    <h1>This is Rocket League Bingo!</h1>
                    
                    <div>
                        <form onSubmit={this.noReload}>
                        <input id="inputBox" type="text" placeholder="Enter a bingo tile" />
                        </form>
                        <button onClick={this.onSubmit}>Enter</button>
                        <button onClick={this.reset}>Reset</button>
                        <div id="customInputDiv">{added}</div>
                    </div>
                    <h3>This is based off a video made by <a href="https://www.youtube.com/channel/UCocHtA1ADT6kTObipYzJoww">SunlessKhan</a></h3>
                    <h3>
                        <a style={linkStyle} href="https://www.youtube.com/watch?v=-3aVf_LilUc" target="_blank"><img className="logoLink" src={youTubeLogo}></img></a>
                        <a style={linkStyle} href="https://www.reddit.com/r/RocketLeague/" target="_blank"><img className="logoLink" src={redditLogo}></img></a>
                        </h3>
                    <h3>
                        <a style={linkStyle} href="https://github.com/JakeCapra/rlbingo" target="_blank"><img className="logoLink" src={GitHubLogo}></img></a>
                        <a style={linkStyle} href="https://steamcommunity.com/id/hip_dips/" target="_blank"><img className="logoLink" src={SteamLogo}></img></a>
                    </h3>
            </div>
        }
        else {
            topPannel = 
             <div id='topPannel'>
                <h1>This is Rocket League Bingo!</h1>
                <button onClick={this.loadText} style={{fontSize: '2vw'}}>Create Board</button>
                <RankSelector onRankSelected={this.rankSelected} />
             </div>

        }

        if (display) {
            content = 
                <table align="center" cellSpacing="0" cellPadding="0">
                    <tbody>
                        <tr>
                            <th id="00" onClick={(e) => this.handleClick("0", "0")}>{this.state.rows[0][0].title}</th>
                            <th id="01" onClick={(e) => this.handleClick("0", "1")}>{this.state.rows[0][1].title}</th>
                            <th id="02" onClick={(e) => this.handleClick("0", "2")}>{this.state.rows[0][2].title}</th>
                            <th id="03" onClick={(e) => this.handleClick("0", "3")}>{this.state.rows[0][3].title}</th>
                            <th id="04" onClick={(e) => this.handleClick("0", "4")}>{this.state.rows[0][4].title}</th>
                        </tr>
                        <tr>
                            <th id="10" onClick={(e) => this.handleClick("1", "0")}>{this.state.rows[1][0].title}</th>
                            <th id="11" onClick={(e) => this.handleClick("1", "1")}>{this.state.rows[1][1].title}</th>
                            <th id="12" onClick={(e) => this.handleClick("1", "2")}>{this.state.rows[1][2].title}</th>
                            <th id="13" onClick={(e) => this.handleClick("1", "3")}>{this.state.rows[1][3].title}</th>
                            <th id="14" onClick={(e) => this.handleClick("1", "4")}>{this.state.rows[1][4].title}</th>
                        </tr>
                        <tr>
                            <th id="20" onClick={(e) => this.handleClick("2", "0")}>{this.state.rows[2][0].title}</th>
                            <th id="21" onClick={(e) => this.handleClick("2", "1")}>{this.state.rows[2][1].title}</th>
                            <th id="22" onClick={(e) => this.handleClick("2", "2")}>{this.state.rows[2][2].title}</th>
                            <th id="23" onClick={(e) => this.handleClick("2", "3")}>{this.state.rows[2][3].title}</th>
                            <th id="24" onClick={(e) => this.handleClick("2", "4")}>{this.state.rows[2][4].title}</th>
                        </tr>
                        <tr>
                            <th id="30" onClick={(e) => this.handleClick("3", "0")}>{this.state.rows[3][0].title}</th>
                            <th id="31" onClick={(e) => this.handleClick("3", "1")}>{this.state.rows[3][1].title}</th>
                            <th id="32" onClick={(e) => this.handleClick("3", "2")}>{this.state.rows[3][2].title}</th>
                            <th id="33" onClick={(e) => this.handleClick("3", "3")}>{this.state.rows[3][3].title}</th>
                            <th id="34" onClick={(e) => this.handleClick("3", "4")}>{this.state.rows[3][4].title}</th>
                        </tr>
                        <tr>
                            <th id="40" onClick={(e) => this.handleClick("4", "0")}>{this.state.rows[4][0].title}</th>
                            <th id="41" onClick={(e) => this.handleClick("4", "1")}>{this.state.rows[4][1].title}</th>
                            <th id="42" onClick={(e) => this.handleClick("4", "2")}>{this.state.rows[4][2].title}</th>
                            <th id="43" onClick={(e) => this.handleClick("4", "3")}>{this.state.rows[4][3].title}</th>
                            <th id="44" onClick={(e) => this.handleClick("4", "4")}>{this.state.rows[4][4].title}</th>
                        </tr>
                        </tbody>
                </table>
        }
        if (dispAdded) {
            for (var i=0; i<this.state.addedTiles.length; i++) {
                added.push(<label className="customInput" htmlFor={i}>{this.state.addedTiles[i].title}
                            <input type="checkbox" id={i} onClick={this.handleCheckboxClick} />
                            <span class="checkmark"></span>
                            <hr />
                            </label>
                            );
            }
        }

        return (
            <React.Fragment>
                {topPannel}
                {sidePannel}
                <div id='rightDiv'>
                    {content}
                    <div>
                        {this.state.showPopup ?  
                        < WinScreen text='Click "Close Button" to hide popup' closePopup={this.togglePopup.bind(this)} />  
                        : null}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
      }

const linkStyle = {
    textDecoration: "none",
    color: "inherit"
}



export default Table;