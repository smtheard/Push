var logic = require('../scripts/logic.js');

exports.testCanary = function(test) {
	test.ok(true);
	test.done();
};

exports.defaultCellHasNoPieceOrColor = function(test) {
  var cell = logic.generateCell();
  test.deepEqual(cell.piece, undefined);
  test.deepEqual(cell.color, undefined);
  test.done();
}

exports.cellPassedBlackPawnHasBlackPawn = function(test) {
  var cell = logic.generateCell('black', 'pawn');
  test.deepEqual(cell.piece, 'pawn');
  test.deepEqual(cell.color, 'black');
  test.done();
}

exports.cellPassedBlackPusherHasBlackPusher = function(test) {
  var cell = logic.generateCell('black', 'pusher');
  test.deepEqual(cell.piece, 'pusher');
  test.deepEqual(cell.color, 'black');
  test.done();
}

exports.boardIs4by8 = function(test) {
  var board = logic.generateBoard();
  test.deepEqual(board.length, 4);
  test.deepEqual(board[0].length, 8);
  test.done();
}

/***********
Board should look like this:
        u**u
        ***u
        ****
        ****
        ****
        ****
        u***
        u**u
where u is undefined
*/
exports.boardInvalidAreasAreUndefined = function(test) {
  var board = logic.generateBoard();
  test.deepEqual(board[0][0], undefined);
  test.deepEqual(board[3][0], undefined);
  test.deepEqual(board[3][1], undefined);
  test.deepEqual(board[0][6], undefined);
  test.deepEqual(board[0][7], undefined);
  test.deepEqual(board[3][7], undefined);
  test.done();
}

exports.pieceCanBePlacedAtValidLocation = function(test) {
  var gameState = new GameState;
  gameState.place(2, 2, 'black', 'pusher');
  test.deepEqual(gameState.board[2][2].color, 'black');
  test.deepEqual(gameState.board[2][2].piece, 'pusher');
  test.done();
}

exports.pieceCantBePlacedOffBoard = function(test) {
  var gameState = new GameState;
  try {
    gameState.place(10, 10, 'black', 'pusher');
  }catch(e) {
    test.done();
  }
}

exports.pieceCantBePlacedAtUndefinedPosition = function(test) {
  var gameState = new GameState;
  try {
    gameState.place(0, 0, 'white', 'pawn');
  } catch(e) {
    test.deepEqual(e, 'invalid board position');
    test.done();
  }
}

exports.pawnCantBePlacedOnAnotherPiece = function(test) {
  var gameState = new GameState;
  gameState.place(2, 2, 'black', 'pawn');
  try {
    gameState.place(2, 2, 'white', 'pawn');
  } catch(e) {
    test.deepEqual(e, 'invalid board position');
    test.done();
  }
}

exports.pusherCantBePlacedOnAnotherPiece = function(test) {
  var gameState = new GameState;
  gameState.place(2, 6, 'white', 'pusher');
  try { 
    gameState.place(2, 6, 'white', 'pusher');
  } catch(e) {
    test.deepEqual(e, 'invalid board position');
    test.done();
  }
}

exports.blackCanOnlyBePlacedOnTopHalfOfBoard = function(test) {
  var gameState = new GameState;
  try { 
    gameState.place(1, 4, 'black', 'pusher');
  } catch(e) {
    test.deepEqual(e, 'wrong side of board');
  }
  try { 
    gameState.place(2, 4, 'black', 'pawn');
  } catch(e) {
    test.deepEqual(e, 'wrong side of board');
  }
  gameState.place(1, 3, 'black', 'pusher');
  gameState.place(2, 3, 'black', 'pawn');
  test.deepEqual(gameState.board[1][3].color, 'black');
  test.deepEqual(gameState.board[1][3].piece, 'pusher');
  test.deepEqual(gameState.board[2][3].color, 'black');
  test.deepEqual(gameState.board[2][3].piece, 'pawn');
  test.done();
}

exports.whiteCanOnlyBePlacedOnBottomHalfOfBoard = function(test) {
  var gameState = new GameState;
  try { 
    gameState.place(1, 3, 'white', 'pusher');
  } catch(e) {
    test.deepEqual(e, 'wrong side of board');
  }
  try { 
    gameState.place(2, 3, 'white', 'pawn');
  } catch(e) {
    test.deepEqual(e, 'wrong side of board');
  }
  gameState.place(1, 4, 'white', 'pusher');
  gameState.place(2, 4, 'white', 'pawn');
  test.deepEqual(gameState.board[1][4].color, 'white');
  test.deepEqual(gameState.board[1][4].piece, 'pusher');
  test.deepEqual(gameState.board[2][4].color, 'white');
  test.deepEqual(gameState.board[2][4].piece, 'pawn');
  test.done();
}

exports.whiteCanOnlyBePlacedOnBottomHalfOfBoard = function(test) {
  var gameState = new GameState;
  try { 
    gameState.place(1, 3, 'white', 'pusher')
  } catch(e) {
    test.deepEqual(e, 'wrong side of board');
  }
  try { 
    gameState.place(2, 3, 'white', 'pawn')
  } catch(e) {
    test.deepEqual(e, 'wrong side of board');
  }
  gameState.place(1, 4, 'white', 'pusher');
  gameState.place(2, 4, 'white', 'pawn');
  test.deepEqual(gameState.board[1][4].color, 'white');
  test.deepEqual(gameState.board[1][4].piece, 'pusher');
  test.deepEqual(gameState.board[2][4].color, 'white');
  test.deepEqual(gameState.board[2][4].piece, 'pawn');
  test.done();
}

exports.pawnCanMoveToEmptyPlace = function(test) {
  var gameState = new GameState;
  gameState.place(3, 3, 'black', 'pawn');
  gameState.move(3, 3, 2, 3);
  test.deepEqual(gameState.board[3][3].color, undefined);
  test.deepEqual(gameState.board[3][3].piece, undefined);
  test.deepEqual(gameState.board[2][3].color, 'black');
  test.deepEqual(gameState.board[2][3].piece, 'pawn');
  
  test.done();
}

exports.pawnCannotMoveOffBoard = function(test) {
  var gameState = new GameState;
  gameState.place(3, 3, 'black', 'pawn');
  try { 
    gameState.move(3, 3, 4, 3)
  } catch(e) {
    test.done();
  }
}

exports.pawnCannotMoveToPositionWhereOtherPieceIs = function(test) {
  var gameState = new GameState;
  gameState.place(3, 3, 'black', 'pawn');
  gameState.place(2, 3, 'black', 'pawn');
  try { 
    gameState.move(3, 3, 2, 3)
  } catch(e) {
    test.deepEqual(e, 'piece already here bitch');
    test.done();
  }
}

exports.pawnCannotMoveToEmptyPositionIfThereIsNoPathToDestionation = function(test) {
  var gameState = new GameState;
  gameState.place(3, 2, 'black', 'pawn');
  gameState.place(2, 2, 'black', 'pusher');
  gameState.place(3, 3, 'black', 'pawn');
  try { 
    gameState.move(3, 2, 2, 3)
  } catch(e) {
    test.done();
  }
}

exports.pusherCanMoveToEmptyPlace = function(test) {
  var gameState = new GameState;
  gameState.place(3, 4, 'white', 'pusher');
  gameState.move(3, 4, 2, 4);
  test.deepEqual(gameState.board[3][4].color, undefined);
  test.deepEqual(gameState.board[3][4].piece, undefined);
  test.deepEqual(gameState.board[2][4].color, 'white');
  test.deepEqual(gameState.board[2][4].piece, 'pusher');
  test.done();
}

exports.pusherCannotMoveOffBoard = function(test) {
  var gameState = new GameState;
  gameState.place(3, 4, 'white', 'pusher');
  try { 
    gameState.move(3, 4, 4, 4)
  } catch(e) {
    test.done();
  }
}

exports.pusherMovingOnToAnotherPieceCallsPushFunction = function(test) {
  var gameState = new GameState;
  gameState.push = function(x_src, y_src, x_dest, y_dest) {
    test.done();
  }
  gameState.place(3, 4, 'white', 'pusher');
  gameState.place(2, 4, 'white', 'pawn');
  gameState.move(3, 4, 2, 4);
}

exports.pushTranslatesColumnUp = function(test) {
  var gameState = new GameState;
  gameState.place(3, 4, 'white', 'pusher');
  gameState.place(3, 3, 'black', 'pawn');
  gameState.move(3, 4, 3, 3);
  test.deepEqual(gameState.board[3][4].color, undefined);
  test.deepEqual(gameState.board[3][4].piece, undefined);
  test.deepEqual(gameState.board[3][3].color, 'white');
  test.deepEqual(gameState.board[3][3].piece, 'pusher');
  test.deepEqual(gameState.board[3][2].color, 'black');
  test.deepEqual(gameState.board[3][2].piece, 'pawn');
  test.done();
}

exports.pushTranslatesColumnDown = function(test) {
  var gameState = new GameState;
  gameState.place(3, 4, 'white', 'pawn');
  gameState.place(3, 3, 'black', 'pusher');
  gameState.move(3, 3, 3, 4);
  test.deepEqual(gameState.board[3][3].color, undefined);
  test.deepEqual(gameState.board[3][3].piece, undefined);
  test.deepEqual(gameState.board[3][4].color, 'black');
  test.deepEqual(gameState.board[3][4].piece, 'pusher');
  test.deepEqual(gameState.board[3][5].color, 'white');
  test.deepEqual(gameState.board[3][5].piece, 'pawn');
  test.done();
}

exports.pushTranslatesRowLeft = function(test) {
  var gameState = new GameState;
  gameState.place(3, 3, 'black', 'pusher');
  gameState.place(2, 3, 'black', 'pawn');
  gameState.move(3, 3, 2, 3);

  test.deepEqual(gameState.board[1][3].piece, 'pawn');
  test.deepEqual(gameState.board[2][3].piece, 'pusher');
  test.done();
}

exports.pushTranslatesRowRight = function(test) {
  var gameState = new GameState;
  gameState.place(1, 2, 'black', 'pusher');
  gameState.place(2, 2, 'black', 'pawn');
  gameState.move(1, 2, 2, 2);

  test.deepEqual(gameState.board[2][2].piece, 'pusher');
  test.deepEqual(gameState.board[3][2].piece, 'pawn');
  test.done();
}

exports.pushLocksPusherAfterSuccess = function(test) {
  var gameState = new GameState;
  gameState.place(1, 2, 'black', 'pusher');
  gameState.place(2, 2, 'black', 'pawn');
  gameState.move(1, 2, 2, 2);

  test.deepEqual(gameState.board[2][2].piece, 'pusher');
  test.deepEqual(gameState.board[2][2].locked, true);
  test.done();
}

exports.pushLocksPusherAndUnlocksPreviousLockAfterSuccess = function(test) {
  var gameState = new GameState;
  gameState.place(1, 1, 'black', 'pusher');
  gameState.place(1, 2, 'black', 'pawn');
  gameState.move(1, 1, 1, 2);
  test.ok(gameState.board[1][2].locked);

  gameState.place(3, 4, 'white', 'pawn');
  gameState.place(3, 5, 'white', 'pusher');
  gameState.move(3, 5, 3, 4);
  test.ok(gameState.board[3][4].locked);
  test.ok(!gameState.board[1][2].locked);
  test.done();
}

exports.lockedPusherCannotMove = function(test) {
  var gameState = new GameState;
  gameState.place(1, 1, 'black', 'pusher');
  gameState.place(1, 2, 'black', 'pawn');
  gameState.move(1, 1, 1, 2);
  try{
    gameState.move(1, 2, 2, 2);
  } catch(e) {
    test.deepEqual(e, 'cannot move locked piece');
    test.done();
  }
}

exports.pushUpAgainstLockedPusherThrows = function(test) {
  var gameState = new GameState;
  gameState.place(1, 2, 'black', 'pusher');
  gameState.place(2, 2, 'black', 'pawn');
  gameState.move(1, 2, 2, 2);
  gameState.board[2][3].color = 'white';
  gameState.board[2][3].piece = 'pusher';
  try {
    gameState.move(2, 3, 2, 2);
  } catch (e) {
    test.deepEqual(e, 'invalid push, locked pusher is blocking you');
    test.done();
  }
}

exports.pushDownAgainstLockedPusherThrows = function(test) {
  var gameState = new GameState;
  gameState.place(2, 2, 'black', 'pawn');
  gameState.place(2, 1, 'black', 'pusher');
  gameState.move(2, 1, 2, 2);
  gameState.place(2, 1, 'black', 'pusher');

  try {
    gameState.move(2, 1, 2, 2);
  } catch (e) {
    test.deepEqual(e, 'invalid push, locked pusher is blocking you');
    test.done();
  }
}

exports.pushLeftAgainstLockedPusherThrows = function(test) {
  var gameState = new GameState;
  gameState.place(1, 1, 'black', 'pusher');
  gameState.place(1, 2, 'black', 'pawn');
  gameState.move(1, 1, 1, 2);
  gameState.place(2, 2, 'black', 'pusher');
  try {
    gameState.move(2, 2, 1, 2);
  } catch (e) {
    test.deepEqual(e, 'invalid push, locked pusher is blocking you');
    test.done();
  }
}

exports.pushRightAgainstLockedPusherThrows = function(test) {
  var gameState = new GameState;
  gameState.place(1, 1, 'black', 'pusher');
  gameState.place(1, 2, 'black', 'pawn');
  gameState.move(1, 1, 1, 2);
  gameState.place(0, 2, 'black', 'pusher');
  try {
    gameState.move(0, 2, 1, 2);
  } catch (e) {
    test.deepEqual(e, 'invalid push, locked pusher is blocking you');
    test.done();
  }
}

exports.pushingPieceUpOffBoardTriggersWin = function(test) {
  var gameState = new GameState;
  gameState.board[1][0] = generateCell('white', 'pawn');
  gameState.place(1, 1, 'black', 'pusher');
  try {
    gameState.move(1, 1, 1, 0);
  } catch(e) {
    test.deepEqual(e, 'black wins the game!');
    test.done();
  }
}

exports.pushingPieceDownOffBoardTriggersWin = function(test) {
  var gameState = new GameState;
  gameState.board[1][7] = generateCell('black', 'pawn');
  gameState.place(1, 6, 'white', 'pusher');
  try {
    gameState.move(1, 6, 1, 7);
  } catch(e) {
    test.deepEqual(e, 'white wins the game!');
    test.done();
  }
}

exports.pushingPieceLeftOffBoardTriggersWin = function(test) {
  var gameState = new GameState;
  gameState.board[1][6] = generateCell('black', 'pusher');
  gameState.place(2, 6, 'white', 'pusher');
  try {
    gameState.move(2, 6, 1, 6);
  } catch(e) {
    test.deepEqual(e, 'white wins the game!');
    test.done();
  }
}

exports.pushingPieceRightOffBoardTriggersWin = function(test) {
  var gameState = new GameState;
  gameState.board[2][7] = generateCell('black', 'pusher');
  gameState.place(1, 7, 'white', 'pusher');
  try {
    gameState.move(1, 7, 2, 7);
  } catch(e) {
    test.deepEqual(e, 'white wins the game!');
    test.done();
  }
}

