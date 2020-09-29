// make the grid a list of cells that are represented by a series of 0 or 1. O is dead (black), 1 is alive (white). If a cell is on (white, 1), but it is attached to a 0 before and after it, its evolution will result in it being dead because it is isolated. If it has neighbors that are on then it will survive until its future iterations produce a single cell. A few things that have to be introduced is randomness. The reality is there is no way to predict how these "life" forms will turnout. 

// My thought is to create a matrix of indexes tha switch between zeros and ones. I wonder if there is a way to attach each cell to a index, then listen for a zero or one to determine that indexes state. How easy is it to alter a matrix array? or do i create function that will switch the state of each cell? 
import React from 'react'
import p5 from 'p5'




// const s = ( sketch ) => {

//   let x = 100;
//   let y = 100;

//   sketch.setup = () => {
//     sketch.createCanvas(200, 200);
//   };

//   sketch.draw = () => {
//     sketch.background(0);
//     sketch.fill(255);
//     sketch.rect(x,y,50,50);
//   };
// };

// let myp5 = new p5(s);

// function draw() {
// 	background(220);
// 	//For (var BEGIN; END; INTERVAL){
// 	//DO SOMETHING }
// 	for (var x = 0; x < width; x += width / 10) {
// 		for (var y = 0; y < height; y += height / 10) {
// 			stroke(0);
// 			strokeWeight(1);
// 			line(x, 0, x, height);
// 			line(0, y, width, y);
// 		}
// 	}
// }

class Grid extends React.Component {
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
            //Everyhting that normally happens in setup works
            p.createCanvas(400,400)
        }

        p.draw = () => {
            for (var x = 0; x < p.width; x += p.width / 50) {
                for (var y = 0; y < p.height; y += p.height / 50) {
                    p.stroke(0);
                    p.strokeWeight(1);
                    p.line(x, 0, x, p.height);
                    p.line(0, y, p.width, y);
                }
            }
            // And everything that normally goes in draw in here
            // p.background(0)
            // p.circle(p.width / 2, p.height / 2, 50)
        }
    }

    componentDidMount() {
        //We create a new p5 object on component mount, feed it 
        this.myP5 = new p5(this.Sketch, this.myRef.current)
    }

    render() {
        return (
            //This div will contain our p5 sketch
            <div ref={this.myRef}>

            </div>
        )
    }
  }
  

  export default Grid;