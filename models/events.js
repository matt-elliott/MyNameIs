module.exports = function (sq, DataType) {
  const Events = sq.define('Events', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataType.STRING,
      allowNull: false
    },
    description: {
      type: DataType.STRING,
      allowNull: false
    },
    date: {
      type: DataType.DATE,
      allowNull: false
    },
    start_time: {
      type: DataType.DATE,
      allowNull: false
    },
    end_time: {
      type: DataType.DATE,
      allowNull: false
    }
  });

  return Events;
}