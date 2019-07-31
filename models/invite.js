module.exports = function (sq, DataType) {
  const Invites = sq.define('Invites', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    eventID: {
      type: DataType.INTEGER,
      allowNull: false
    },
    email: {
      type: DataType.STRING,
      allowNull: false
    },
    status: {
      type: DataType.STRING,
      allowNull: false,
      defaultValue: 'sending'
    },
  });

  return Invites;
}