module.exports = function (sq, DataType) {
  const Events = sq.define('Events', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    eventName: {
      type: DataType.STRING,
      allowNull: false
    },
    eventDescription: {
      type: DataType.STRING,
      allowNull: false
    },
    eventData: {
      type: DataType.DATE,
      allowNull: false
    },
    eventStartTime: {
      type: DataType.DATE,
      allowNull: false
    },
    eventEndTime: {
      type: DataType.DATE,
      allowNull: false
    }
  });

  return Events;
}