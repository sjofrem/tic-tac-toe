const gameBoard = (() => {
    let board = ['','','','','','','','',''];

    const getField = (index) => board[index];

    const setField = (index, player) => board[index]=player

    const clear = () => {
        for (let i = 0; i < board.length; i++) {
        board[i] = '';
        }
    }

    return {
        getField,
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

    xIcon.addEventListener('click', (e) => {
        if(round == 1 && p1.getIcon() == 'O'){
            turnSignal(p1.getIcon());
            p1.changeIcon('X');
            p2.changeIcon('O');
        }
    });
    oIcon.addEventListener('click', (e) => {
        if(round == 1 && p1.getIcon() == 'X'){
            turnSignal(p1.getIcon());
            p1.changeIcon('O');
            p2.changeIcon('X');
        }
    });

    const gameRound = (index) => {
        if(!invalidField.includes(index)){
            if(round%2 ==0){
                gameBoard.setField(index,p2.getIcon());
                turnSignal(p2.getIcon());
            }
            else{
                gameBoard.setField(index,p1.getIcon());
                turnSignal(p1.getIcon());
            }
            invalidField.push(index);
            round++;
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
    const reset = () => {
        round = 1;
        invalidField = [];
        turnSignal(p2.getIcon());
    }

    return{
        gameRound,
        turnSignal,
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


