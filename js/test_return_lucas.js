

function Square(props) {
    return (
        <button className="square" onClick={props.onClick} >
            {props.value}
        </button>
    );
}

// class Moves extends React.Component{
//     const


// }

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            moves: Array(Array(9).fill(null)),
        }
    }

    checkWinner(squares) {
        const winners = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < winners.length; i++) {
            const [a, b, c] = winners[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null
    }

    handleClick(i) {
        const newsquares = this.state.squares.slice();
        if (this.checkWinner(newsquares) || newsquares[i]) {
            return;
        }
        this.state.moves.push(newsquares)
        newsquares[i] = this.state.xIsNext ? 'X' : "O";
        this.setState(
            {
                squares: newsquares,
                xIsNext: !this.state.xIsNext,
            }
        )
    }

    returnMove() {
        console.log(this.state.moves[this.state.moves.length - 2] ? this.state.moves.length > 1 : this.state.moves[this.state.moves.length - 1])
        this.setState(
            {
                squares: this.state.moves.length > 1 ? this.state.moves[this.state.moves.length - 2] : this.state.moves[this.state.moves.length - 1],
                moves: this.state.moves.pop()
            }
        );
        console.log(this.state.squares)
    }

    renderSquare(i) {
        return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
    }

    render() {
        const winner = this.checkWinner(this.state.squares);
        let status;
        if (winner) {
            status = "VENCEDOR " + winner; f
        }
        else {
            status = "Próximo" + (this.state.xIsNext ? 'X' : "O");
        }


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
                <div>
                    <button onClick={() => this.returnMove()} >Return</button>
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

class CounterButton extends React.Component {
    constructor(props, test) {
        super(props);
        this.state = { count: 1 };
        this.test = { test: "test" };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.color !== nextProps.color) {
            return true;
        }
        if (this.state.count !== nextState.count) {
            return true;
        }
        return false;
    }

    render() {
        return (
            <button
                id="test"
                color={this.props.color}
                onClick={() => this.setState(state => ({ count: state.count + 1 }))}>
                Count: {this.state.count}
            </button>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
