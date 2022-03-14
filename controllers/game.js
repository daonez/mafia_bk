const gameService = require('../services/game');
const { ControllerAsyncWrapper } = require('../utils/wrapper');

module.exports = {
  entryAndExit: {
    enter: ControllerAsyncWrapper(async (req, res) => {
      const { roomId, userId } = req.params;
      const { roomPwd } = req.body;
      await gameService.entryAndExit.enterRoom({
        roomId,
        userId,
        roomPwd,
      });
      return res.status(200).json({ userId });
    }),

    exit: ControllerAsyncWrapper(async (req, res) => {
      
      const { roomId, userId } = req.params;
      await gameService.entryAndExit.exitRoom({ roomId, userId });
      return res.status(200).json({ userId });
    }),
  },

  create: {
    readyGroup: ControllerAsyncWrapper(async (req, res) => {
      const { roomId, userId } = req.params;
      await gameService.create.readyGroup({ roomId, userId });
      return res.status(201).json({ userId });
    }),

    aiPlayer: ControllerAsyncWrapper(async (req, res) => {
      const { roomId } = req.params;
      await gameService.create.aiPlayer({ roomId });
      return res.status(200);
    }),
  },

  cancel: {
    ready: ControllerAsyncWrapper(async (req, res) => {
      const { roomId, userId } = req.params;
      await gameService.cancel.ready({ userId });
      return res.status(200).json({ userId });
    }),
  },

  start: {
    game: ControllerAsyncWrapper(async (req, res) => {
      const { roomId, userId } = req.params;
      const msg = await gameService.start.game({ roomId, userId });
      return res.status(200).json({ msg }); 
    }),
  },

  update: {
    changeMaxPlayer: ControllerAsyncWrapper(async (req, res) => {
      const { roomId } = req.params;
      const { maxPlayer } = req.body;
      const room = await gameService.update.changeMaxPlayer({ roomId, maxPlayer });
      return res.status(200).json({ room });
    }),
  },

  gamePlay: {
    giveRole: ControllerAsyncWrapper(async (req, res) => {
      const { roomId } = req.params;
      await gameService.gamePlay.giveRole({ roomId });
      return res.status(201);
    }),

    lawyerAct: ControllerAsyncWrapper(async (req, res) => {
      const { roomId } = req.params;
      const { userId } = req.body;
      await gameService.gamePlay.lawyerAct({ roomId, userId });
      return res.status(200).json({ game });
    }),

    detectiveAct: ControllerAsyncWrapper(async (req, res) => {
      const { roomId } = req.params;
      const { userId } = req.body;
      const game = await gameService.gamePlay.detectiveAct({ roomId, userId });
      return res.status(200).json({ game });
    }),

    spyAct: ControllerAsyncWrapper(async (req, res) => {
      const { roomId } = req.params;
      const { userId } = req.body;
      const game = await gameService.gamePlay.spyAct({ roomId, userId });
      return res.status(200).json({ game });
    }),

    dayTimeVote: ControllerAsyncWrapper(async (req, res) => {
      const { roomId } = req.params;
      const { userIdArr } = req.body; // obj? arr?
      const game = await gameService.gamePlay.dayTimeVote({ roomId, userIdArr });
      return res.status(200).json({ game });
    }),
  },

  get: {
    gameStatus: ControllerAsyncWrapper(async (req, res) => {
      const { roomId } = req.params;
      const status = await gameService.getGame.status({ roomId });
      return res.status(200).json({ status }); 
    }),

    result: ControllerAsyncWrapper(async (req, res) => {
      const { roomId } = req.params;
      const result = await gameService.getGame.result({ roomId });
      return res.status(200).json({ result }); 
    }),

    users: ControllerAsyncWrapper(async (req, res) => {
      const { roomId } = req.params;
      const users = await gameService.getGame.users({ roomId });
      return res.status(200).json({ users });
    }),
  },
  
};