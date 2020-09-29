import React from 'react'
import p5 from 'p5'






let grid;
let cols;
let rows;
let res = 20;

let matrix = (cols, rows) => {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows)
    }
    return arr
}

let countNeighbors = (grid, x, y) => {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {

            // let col = (x + i) % cols
            // let row = (y + j) % rows
            sum += grid[x + i][y + j];
        }
    }
    sum -= grid[x][y]
    return sum;
}

class TestGrid extends React.Component {
    constructor(props) {
        super(props)
        //p5 instance mode requires a reference on the DOM to mount the sketch
        //So we use react's createRef function to give p5 a reference
        this.myRef = React.createRef()
    }

    // This uses p5's instance mode for sketch creation and namespacing
    Sketch = (p) => {

        // Native p5 functions work as they would normally but prefixed with 
        // a p5 object "p"
        p.setup = () => {
            p.createCanvas(600,400)
            // setting width and height of cells
            cols = p.width / res;
            rows = p.height / res;

            //creating grid 
            grid = matrix(cols, rows);

            //placing a value of 1 or zero in each index of i and j
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    grid[i][j] = Math.floor(Math.random() * 2);
                }
            }
          

        }

        //drawing the grid to the scren
        p.draw = () => {
            p.background(0);
            p.rectMode(p.CENTER);
            p.stroke(0);

            
            //initial conditional of placing a fill color of black or white inside each cell according to their value
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    let x = i * res;
                    let y = j * res;
                    if (grid[i][j] === 1) {
                        p.fill("black");
                        p.stroke("black");
                    } else {
                        p.fill("white")
                    }
                    //draws out each square(cell) takes position at x,y and width and height
                    p.rect(x, y, res, res);
                }
            }

            let next = matrix(cols,rows)

            
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {

                    let state = grid[i][j];

                    if (i === 0 || i === cols - 1 || j === 0 || j === rows - 1) {
                        next[i][j] = state;
                    } else {
                        // track the neighbors
                        let track = 0;
                        let neighbor = countNeighbors(grid, i, j);

                        if (state === 0 && neighbor === 3) {
                            next[i][j] = 1;
                        } else if (state === 1 && (neighbor < 2 || neighbor > 3)) {
                            next[i][j] = 0;
                        } else {
                            next[i][j] = state;
                        }

                    }
                }
            }

            grid = next;
        }



    }



    componentDidMount() {
        //We create a new p5 object on component mount, feed it 
        this.myP5 = new p5(this.Sketch, this.myRef.current)
    }

    render() {
        return (
            //This div will contain our p5 sketch
            <div ref={this.myRef}></div>
        )
    }
  }
  

export default TestGrid;




// track += grid[i - 1][j - 1];
// track += grid[i][j - 1];
// track += grid[i + 1][j - 1];
// track += grid[i + 1][j];
// track += grid[i + 1][j + 1];
// track += grid[i][j + 1];
// track += grid[i - 1][j + 1];
// track += grid[i - 1][j];