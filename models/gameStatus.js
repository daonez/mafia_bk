module.exports = (sequelize, DataTypes) => {
  const GameStatus = sequelize.define(
    'gameStatus',
    {
      roundNo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 0,
      },
      isResult: {
        type: DataTypes.INTEGER,
        allowNull: true,
        default: 0, // 2 : spy win | 1 : empl win
      },
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );

  GameStatus.associate = (db) => {
    db.GameStatus.belongsTo(db.Room, { onDelete: 'CASCADE' });
    db.GameStatus.hasMany(db.Vote, { onDelete: 'CASCADE' });
  };

  return GameStatus;
};