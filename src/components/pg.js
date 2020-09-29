import React from 'react'
import { ButtonToolbar } from 'react-bootstrap';

class Box extends React.Component {
    selectBox = () => {
        this.props.selectBox(this.props.row, this.props.col);
    }
    render () {
        return (
            <div 
                className={this.props.boxClass}
                id={this.props.id}
                onClick={this.selectBox}
            ></div>
        )
    }
}

class GridDisplay extends React.Component {
    render () {
        const width = (this.props.cols * 14);
        let rowsArr = [];
        let boxClass = "";
        for (let i = 0; i < this.props.rows; i++) {
            for (let j = 0; j < this.props.cols; j++) {
                let boxId = i + "_" + j

                boxClass = this.props.fullGrid[i][j] ? 'box on' : 'box off';

                rowsArr.push(
                    <Box 
                        boxClass={boxClass}
                        key={boxId} 
                        boxId={boxId}
                        row={i}
                        col={j}
                        selectBox={this.props.selectBox}
                    />
                )
            }
        }
        return (
            <div className='grid' style={{width:width}}>
                {rowsArr}
            </div>
        )
    }
}

class Button extends React.Component {
    render () {
        return(
            <div className="center">
                <ButtonToolbar>
                    <button className='btn btn-primary' onClick={this.props.startButton}>Start</button>
                    <button className='btn btn-primary' onClick={this.props.pauseButton}>Pause</button>
                    <button className='btn btn-primary' onClick={this.props.slowButton}>Slow</button>
                    <button className='btn btn-danger' onClick={this.props.clearButton}>Clear</button>
                    <button className='btn btn-success' onClick={this.props.seed}>Populate</button>
                </ButtonToolbar>
            </div>
        );       
    }
}
class Main extends React.Component {
    constructor (props) {
        super(props);
        this.speed = 100;
        this.rows = 30;
        this.cols = 50;

        this.state = {
            genertion: 0,
            fullGrid: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
        }
    }

    selectBox = (row, col) => {
        let copiedGrid = clonedArrary(this.state.fullGrid);
        copiedGrid[row][col] = !copiedGrid[row][col];
        this.setState({
            fullGrid: copiedGrid
        })
    }

    seed = () => {
        let copiedGrid = clonedArrary(this.state.fullGrid);

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
              if (Math.floor(Math.random() * 4) === 1) {
                  copiedGrid[i][j] = true
              }
            }
        }
        this.setState({
            fullGrid: copiedGrid
        });
    }

    startButton = () => {
        clearInterval(this.intervalId)
        this.intervalId = setInterval(this.playLife, this.speed)
    }

    pauseButton = () => {
        clearInterval(this.intervalId)
    }

    slowButton = () => {
        this.speed = 1000;
        this.startButton(this.playLife, this.speed)
    }

    clearButton = () => {
        let grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
        this.setState({
            fullGrid: grid,
            generation: 0
        })
    }

    // countNeighbors = (grid, x, y) => {
    //     let sum = 0;
    //     for (let i = -1; i < this.rows; i++) {
    //         for (let j = -1; j < this.cols; j++) {
    //             sum += grid[x + i][y + j];
    //             console.log(sum)
    //         }
    //     }
    //     sum -= grid[x][y]
    //     return sum;
    // }

    playLife = () => {
		let gridState = this.state.fullGrid;
        let secondGridState = clonedArrary(this.state.fullGrid);

		for (let i = 0; i < this.rows; i++) {
		  for (let j = 0; j < this.cols; j++) {
            let track = 0;
            // tracking neighbors of a cell and counting how many are alive and dead
            if (i > 0) if (gridState[i - 1][j]) track++;
            
            if (i > 0 && j > 0) if (gridState[i - 1][j - 1]) track++;
            
            if (i > 0 && j < this.cols - 1) if (gridState[i - 1][j + 1]) track++;
            
            if (j < this.cols - 1) if (gridState[i][j + 1]) track++;
            
            if (j > 0) if (gridState[i][j - 1]) track++;
            
            if (i < this.rows - 1) if (gridState[i + 1][j]) track++;
            
            if (i < this.rows - 1 && j > 0) if (gridState[i + 1][j - 1]) track++;
            
            if (i < this.rows - 1 && j < this.cols - 1) if (gridState[i + 1][j + 1]) track++;
            
            // applying the rules of the game
		    if (gridState[i][j] && (track < 2 || track > 3)) secondGridState[i][j] = false;
		    if (!gridState[i][j] && track === 3) secondGridState[i][j] = true;
		  }
		}
		this.setState({
		  fullGrid: secondGridState,
		  generation: this.state.generation + 1
		});

	}
		
	

    componentDidMount() {
        this.seed();
        this.startButton();
    }

    render() {
        return (
           <div>
               <h1>Conways Game of Life</h1>
               <Button
                startButton={this.startButton}
                pauseButton={this.pauseButton}
                slowButton={this.slowButton}
                clearButton={this.clearButton}
                seed={this.seed}
               ></Button>
               <GridDisplay 
                fullGrid={this.state.fullGrid}
                rows={this.rows}
                cols={this.cols}
                selectBox={this.selectBox}
               />
        <       h4>Number of generations: {this.state.genertion}</h4>
           </div>
        )
    }
}

function clonedArrary(arr) {
    return JSON.parse(JSON.stringify(arr))
}
export default Main;





  // if (gridState[i][j] && track === 3) {
                //     secondGridState[i][j] = true;
                // } else if (gridState[i][j] && (track < 2 || track > 3)) {
                //     secondGridState[i][j] = false;
                // } else {
                //     secondGridState[i][j] = gridState;
                // }