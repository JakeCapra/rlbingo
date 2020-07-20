import React from 'react';
import GitHubLogo from './images/githubLogo.png';
import SteamLogo from './images/steamLogo.png';
import youTubeLogo from './images/youTubeLogo.png';
import redditLogo from './images/redditLogo.png';
import RankSelector from './RankSelector';
import { GetBingoTileItems } from './BingoItemRepository';
import WinScreen from './winScreen';
import Peer from 'peerjs';

const peer = new Peer('123456');
const conn = peer.connect('654321');
conn.on('open', () => {
  conn.send('hi!');
});

peer.on('connection', (conn) => {
    conn.on('data', (data) => {
      // Will print 'hi!'
      console.log(data);
    });
    conn.on('open', () => {
      conn.send('hello!');
    });
  });

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
        }
        this.rankSelected = this.rankSelected.bind(this);
    }

    loadText = () => {
        this.state.showPopup = false;
        var availableTiles = GetBingoTileItems(this.state.selectedMaxLevel);

        var usedIndex = [];
        var usedIndexLoad = [];
        let tileArr =[]; // tiles to added to board

        for (var i=0; i<this.state.addedTiles.length; i++) {
            console.log(this.state.addedTiles[i].use + " " + this.state.addedTiles[i].title);
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
                    console.log(index)
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
        console.log(this.state.showPopup);
    }  


    handleClick = (i, j, e) => {
        if (this.state.showPopup)
            return;
        if (e.target.style.backgroundColor === "red") {
            e.target.style.backgroundColor = "green";
            this.state.rows[i][j].marked = true;
        }
        else {
            e.target.style.backgroundColor = "red";
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
                if (temp[i][j].marked) {
                    pass=true;
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

        //vertical check
        for (i=0; i<5; i++) {
            for (j=0; j<5; j++) {
                if (temp[j][i].marked) {
                    pass=true;
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

        //diagonal check - left to right
        for (i=0; i<5; i++) {
            if (temp[i][i].marked) {
                pass=true;
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
        for (var i=0; i<5; i++) {
            for (var j=0; j<5; j++) {
                this.state.rows[i][j].marked = false;
                var id = i.toString() + j.toString();
                var tmp = document.getElementById(id);
                console.log("ID = " + id);
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
        let content;
        var added = [];
        let resetBtn, winScreen;
        const display = this.disp;
        const dispAdded = this.useAdded;
        const win = this.win;
        if (display) {
            content = 
                <table align="center" cellSpacing="0" cellPadding="0" style={tableStyle}>
                    <tbody>
                        <tr style={rowStyle}>
                            <th id="00" style={itemStyle} onClick={(e) => this.handleClick("0", "0", e)}>{this.state.rows[0][0].title}</th>
                            <th id="01" style={itemStyle} onClick={(e) => this.handleClick("0", "1", e)}>{this.state.rows[0][1].title}</th>
                            <th id="02" style={itemStyle} onClick={(e) => this.handleClick("0", "2", e)}>{this.state.rows[0][2].title}</th>
                            <th id="03" style={itemStyle} onClick={(e) => this.handleClick("0", "3", e)}>{this.state.rows[0][3].title}</th>
                            <th id="04" style={itemStyle} onClick={(e) => this.handleClick("0", "4", e)}>{this.state.rows[0][4].title}</th>
                        </tr>
                        <tr style={rowStyle}>
                            <th id="10" style={itemStyle} onClick={(e) => this.handleClick("1", "0", e)}>{this.state.rows[1][0].title}</th>
                            <th id="11" style={itemStyle} onClick={(e) => this.handleClick("1", "1", e)}>{this.state.rows[1][1].title}</th>
                            <th id="12" style={itemStyle} onClick={(e) => this.handleClick("1", "2", e)}>{this.state.rows[1][2].title}</th>
                            <th id="13" style={itemStyle} onClick={(e) => this.handleClick("1", "3", e)}>{this.state.rows[1][3].title}</th>
                            <th id="14" style={itemStyle} onClick={(e) => this.handleClick("1", "4", e)}>{this.state.rows[1][4].title}</th>
                        </tr>
                        <tr style={rowStyle}>
                            <th id="20" style={itemStyle} onClick={(e) => this.handleClick("2", "0", e)}>{this.state.rows[2][0].title}</th>
                            <th id="21" style={itemStyle} onClick={(e) => this.handleClick("2", "1", e)}>{this.state.rows[2][1].title}</th>
                            <th id="22" style={itemStyle} onClick={(e) => this.handleClick("2", "2", e)}>{this.state.rows[2][2].title}</th>
                            <th id="23" style={itemStyle} onClick={(e) => this.handleClick("2", "3", e)}>{this.state.rows[2][3].title}</th>
                            <th id="24" style={itemStyle} onClick={(e) => this.handleClick("2", "4", e)}>{this.state.rows[2][4].title}</th>
                        </tr>
                        <tr style={rowStyle}>
                            <th id="30" style={itemStyle} onClick={(e) => this.handleClick("3", "0", e)}>{this.state.rows[3][0].title}</th>
                            <th id="31" style={itemStyle} onClick={(e) => this.handleClick("3", "1", e)}>{this.state.rows[3][1].title}</th>
                            <th id="32" style={itemStyle} onClick={(e) => this.handleClick("3", "2", e)}>{this.state.rows[3][2].title}</th>
                            <th id="33" style={itemStyle} onClick={(e) => this.handleClick("3", "3", e)}>{this.state.rows[3][3].title}</th>
                            <th id="34" style={itemStyle} onClick={(e) => this.handleClick("3", "4", e)}>{this.state.rows[3][4].title}</th>
                        </tr>
                        <tr style={rowStyle}>
                            <th id="40" style={itemStyle} onClick={(e) => this.handleClick("4", "0", e)}>{this.state.rows[4][0].title}</th>
                            <th id="41" style={itemStyle} onClick={(e) => this.handleClick("4", "1", e)}>{this.state.rows[4][1].title}</th>
                            <th id="42" style={itemStyle} onClick={(e) => this.handleClick("4", "2", e)}>{this.state.rows[4][2].title}</th>
                            <th id="43" style={itemStyle} onClick={(e) => this.handleClick("4", "3", e)}>{this.state.rows[4][3].title}</th>
                            <th id="44" style={itemStyle} onClick={(e) => this.handleClick("4", "4", e)}>{this.state.rows[4][4].title}</th>
                        </tr>
                        </tbody>
                </table>
                resetBtn = <button onClick={this.reset}>Reset</button>;
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
                <div style={leftDiv}>
                    <button onClick={this.loadText} >Create Board</button>
                    <RankSelector onRankSelected={this.rankSelected} />
                    <h1>This is Rocket League Bingo!</h1>
                    
                    <div>
                        <form onSubmit={this.noReload}>
                        <input id="inputBox" type="text" placeholder="Enter a bingo tile" />
                        </form>
                        <button onClick={this.onSubmit}>Enter</button>
                        {resetBtn}
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
                <div style={rightDiv}>
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

const tableStyle = {
    tableLayout: "fixed",
    width: "80%",
    border: '5px solid white',
    margin: "0",
    paddingTop: ".5vw",
    textAlign: "center"
}

const rowStyle = {
    width: "15%",
    position: "relative",
}

const itemStyle = {
    overflow: "hidden",
    padding: "3.2vw", 
    opacity: "0.75",
    border: '1px solid white',
    background: "red",
    userSelect: "none",
    cursor: "grab"
}

const leftDiv = {
    float: "left",
    width: "15%",
    minHeight: "99%",
    background: "purple",
    opacity: ".9",
    color: "white",
    border: '3px solid white',
    textAlign: "center",
    position: "absolute",
}

const rightDiv = {
    width: "80%",
    float: "right",
    textAlign: "center",
}

const linkStyle = {
    textDecoration: "none",
    color: "inherit"
}



export default Table;