import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClickun}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    /*  constructor(props) {
          super(props);
          this.state = {
              columns: Array(42).fill(null),//Array(7).fill(Array(6).fill(null)),
              xIsNext: true,
          };
      }*/
    renderSquare(i, j) {
        let newvalue = this.props.columns[6 * i + j];
        return (<Square
            value={newvalue} //{this.state.columns[i][j]}
            onClickun={() => this.props.onClickun(i, j)}
        />
        );
    }
    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0, 5)}
                    {this.renderSquare(1, 5)}
                    {this.renderSquare(2, 5)}
                    {this.renderSquare(3, 5)}
                    {this.renderSquare(4, 5)}
                    {this.renderSquare(5, 5)}
                    {this.renderSquare(6, 5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(0, 4)}
                    {this.renderSquare(1, 4)}
                    {this.renderSquare(2, 4)}
                    {this.renderSquare(3, 4)}
                    {this.renderSquare(4, 4)}
                    {this.renderSquare(5, 4)}
                    {this.renderSquare(6, 4)}
                </div>
                <div className="board-row">
                    {this.renderSquare(0, 3)}
                    {this.renderSquare(1, 3)}
                    {this.renderSquare(2, 3)}
                    {this.renderSquare(3, 3)}
                    {this.renderSquare(4, 3)}
                    {this.renderSquare(5, 3)}
                    {this.renderSquare(6, 3)}
                </div>
                <div className="board-row">
                    {this.renderSquare(0, 2)}
                    {this.renderSquare(1, 2)}
                    {this.renderSquare(2, 2)}
                    {this.renderSquare(3, 2)}
                    {this.renderSquare(4, 2)}
                    {this.renderSquare(5, 2)}
                    {this.renderSquare(6, 2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(0, 1)}
                    {this.renderSquare(1, 1)}
                    {this.renderSquare(2, 1)}
                    {this.renderSquare(3, 1)}
                    {this.renderSquare(4, 1)}
                    {this.renderSquare(5, 1)}
                    {this.renderSquare(6, 1)}
                </div>
                <div className="board-row">
                    {this.renderSquare(0, 0)}
                    {this.renderSquare(1, 0)}
                    {this.renderSquare(2, 0)}
                    {this.renderSquare(3, 0)}
                    {this.renderSquare(4, 0)}
                    {this.renderSquare(5, 0)}
                    {this.renderSquare(6, 0)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stepNumber: 0,
            history: [{
                squares: Array(42).fill(null),
                columnplayed: null,
            }],
            xIsNext: true,
        };
    }
    handleClick(i, j) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares)) { return; }
        let columnset = squares.slice();
        if (columnset[6 * i + 5]) { return; }
        let cell = 0;
        while (columnset[i * 6 + cell]) { cell = cell + 1 }
        columnset[i * 6 + cell] = (this.state.xIsNext ? "X" : "O");
        this.setState({
            history: history.concat([{
                squares: columnset,
                columnplayed: i + 1,
            }]),
            xIsNext: !this.state.xIsNext,
        })
    }
    jumpTo(step) {
        this.setState({
            history: this.state.history.slice(0, step),
            xIsNext: ((step % 2) === 1),
            stepNumber: step,
        })
    }
    render() {
        const history = this.state.history;
        const current = history[history.length - 1];

        const moves = history.map((step, move) => {
            let sentence = move > 1 ? 'go back to step n°' + (move - 1) : 'go back to begining';
            if (move) {
                let sentenceplayer = null;
                if (move > 1) {
                    sentenceplayer = move % 2 === 0 ? ' ( X in column ' : '( O in column ';
                    sentenceplayer = sentenceplayer + history[move - 1].columnplayed + ' )'
                }
                return (
                    <li key={move}>
                        <button onClick={() => this.jumpTo(move)}>{sentence} {sentenceplayer}</button>
                    </li>
                );
            }
            else { return null };
        });

        let winner = calculateWinner(current.squares)
        let status;
        if (winner) {
            status = "the winner is: " + winner;
        }
        else {
            status = (this.state.xIsNext ? 'Next player: X' : 'Next player: O');
            if (history.length === 43) {
                status = 'drawn';
            }
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        columns={current.squares}
                        onClickun={(i, j) => this.handleClick(i, j)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div id="scroll">
                        <ol id="moves">{moves}</ol>
                    </div>
                </div>
            </div>
        );
    }
}

function calculateWinner(columns) {
    for (let i = 0; i < columns.length; i++) {
        if (i % 6 < 3) {
            if (columns[i] && columns[i] === columns[i + 1] && columns[i] === columns[i + 2]
                && columns[i] === columns[i + 3]) { return columns[i] }
            if (i / 6 < 4) {
                if (columns[i] && columns[i] === columns[i + 6] && columns[i] === columns[i + 12]
                    && columns[i] === columns[i + 18]) { return columns[i] }
                if (columns[i] && columns[i] === columns[i + 7] && columns[i] === columns[i + 14]
                    && columns[i] === columns[i + 21]) { return columns[i] }
            }
        }
        if (i % 6 > 2) {
            if (i / 6 < 4) {
                if (columns[i] && columns[i] === columns[i + 5] && columns[i] === columns[i + 10]
                    && columns[i] === columns[i + 15]) { return columns[i] }
            }
        }
        if (i / 6 < 4) {
            if (columns[i] && columns[i] === columns[i + 6] && columns[i] === columns[i + 12]
                && columns[i] === columns[i + 18]) { return columns[i] }
        }
    }
    return null;
}
// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
