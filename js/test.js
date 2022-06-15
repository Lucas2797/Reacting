function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {

    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [{ squares: Array(9).fill(null) }],
            lastChanged: Array(),
            stepNumber: 0,
            xIsNext: true,
            rechanging: { step: 0, go: false },
        }
    }

    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }


    handleClick2(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        console.log(this.state.rechanging.go)
        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        const changedList = this.state.lastChanged.slice()
        changedList.push(i)

        this.setState({
            history: history.concat([{ squares: squares }]),
            lastChanged: changedList,
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
        });
    }

    handleClick(i) {
        if (this.state.rechanging.go) {
            console.log(i)
            const untill = this.state.lastChanged.slice(0, this.state.stepNumber)
            untill.push(i)
            this.setState({
                lastChanged: untill,
                rechanging: { step: this.state.rechanging.step, go: false }
            }, this.handleClick2(i))
        }
        else {
            this.handleClick2(i)
        }

    }


    deselectAll() {
        console.log(Array.from(document.getElementById("return_moves").querySelectorAll("button")))
        return Array.from(document.getElementById("return_moves").querySelectorAll("button")).map(i => console.log(i))
        // return [...document.getElementById("return_moves").querySelectorAll("button")].map(i => i.style.fontWeight == 500)
    }


    jumpTo(step) {
        this.deselectAll()
        // const button = document.getElementById("move" + step)
        // button.style.fontWeight = "900"
        this.setState({
            xIsNext: step % 2 === 0,
            stepNumber: step,
            rechanging: { step: step, go: true },
        })
    }

    ShowVariables() {
        console.log(this.state)
        console.log((5 / 3).toFixed(0))
    }


    indexToLocation(index) {
        const x = Math.floor(index / 3)
        const y = index % 3
        return [x, y]
    }


    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);
        // var location = history.length > 1 ? current.squares.indexOf(current["squares"].filter((x) => !history[this.state.stepNumber - 1]["squares"].includes(x))[0]) : "e menor";
        const moves = history.map((step, move) => {
            const location2 = this.state.lastChanged[move - 1]
            const desc = move ? "go to move #" + move + "  at  " + this.indexToLocation(location2)[0] + "," + this.indexToLocation(location2)[1] : "go to game start";
            // console.log(this.state.lastChanged)
            return (
                <li id="return_moves" key={move}>
                    <button id={"move" + move} onClick={() => this.jumpTo(move)}>
                        {desc}
                    </button>
                </li>
            );
        });
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
                <div>
                    <button onClick={() => this.ShowVariables()}>Variables</button>
                </div>
            </div>
        );
    }
}

// ========================================

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<Game />);



ReactDOM.render(
    <Game />,
    document.getElementById('root')
);