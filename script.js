const gameBoard = (() => {
    let board = ['','','','','','','','',''];

    const getField = (index) => board[index];

    const getBoard = () => board;

    const setField = (index, player) => board[index]=player;


    const clear = () => {
        for (let i = 0; i < board.length; i++) {
        board[i] = '';
        }
    }

    return {
        getField,
        getBoard,
        setField,
        clear
    };
    
})();

const player = (icon) => {
    this.icon = icon;
    const getIcon = () => icon;

    const changeIcon = (newIcon) => icon = newIcon;

    return {
        getIcon,
        changeIcon
    };
}

const gameController = (() => {
    let p1 = player('X');
    let p2 = player('O');
    let round = 1;
    let invalidField = [];
    let gameOver = false;

    const xIcon = document.getElementById('x');
    const oIcon = document.getElementById('o');
    const resultDisplay = document.getElementById('result');

    const gameRound = (index) => {
        let currentIcon = '';
        if(!gameOver && !invalidField.includes(index)){
            if(round%2 ==0){
                gameBoard.setField(index,p2.getIcon());
                turnSignal(p2.getIcon());
                currentIcon = p2.getIcon();
            }
            else{
                gameBoard.setField(index,p1.getIcon());
                turnSignal(p1.getIcon());
                currentIcon = p1.getIcon();
            }
            invalidField.push(index);
            round++;
            checkWinner(currentIcon);
        }
    }
    const turnSignal = (Icon) => {
        if(Icon == 'X'){
            oIcon.classList.add('active');
            oIcon.classList.remove('inactive');
            xIcon.classList.remove('active');
            xIcon.classList.add('inactive');
        }
        else{
            xIcon.classList.add('active');
            xIcon.classList.remove('inactive');
            oIcon.classList.remove('active');
            oIcon.classList.add('inactive');  
        }
    }

    const checkWinner = (currentIcon) =>{
        let roundWon = false;
        let board = gameBoard.getBoard();
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            let a = board[winCondition[0]];
            let b = board[winCondition[1]];
            let c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break
            }
        }
    
        if (roundWon) {
            gameOver = true;
            resultDisplay.innerText = `Player ${currentIcon} wins!`;
        }
    
        let roundDraw = !board.includes("");
        if (roundDraw && !roundWon) {
            gameOver = true;
            resultDisplay.innerText = `It's a draw!`;
        }


    }
    const reset = () => {
        round = 1;
        invalidField = [];
        gameOver = false;
        p1.changeIcon('X');
        p2.changeIcon('O');
        turnSignal(p2.getIcon());
        resultDisplay.innerText = ` `;
    }

    return{
        gameRound,
        turnSignal,
        checkWinner,
        reset
    }

})();

const displayController = (() => {
    const fields = document.querySelectorAll('.field');
    const resetBtn = document.getElementById('resetBtn');

    fields.forEach((field) => 
        field.addEventListener('click', (e) => {
            gameController.gameRound(parseInt(e.target.dataset.index));
            updateBoard();
        })
    );

    resetBtn.addEventListener('click', (e) => {
        gameBoard.clear();
        gameController.reset();
        updateBoard();
    })

    const updateBoard = () => {
        for (let i = 0; i < fields.length; i++) {
            fields[i].textContent = gameBoard.getField(i);
        }
    }

    return{
        updateBoard
    }

})();


