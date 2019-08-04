module.exports = function (sq, DataType) {
  var moment = require("moment");
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
      allowNull: false,
      get: function () {
        return moment().format('MMMM Do YYYY, h:mm:ss a')
      }
    },
    start_time: {
      type: DataType.DATE,
      allowNull: false,
      get: function () {
        return moment().format("HH:mm a")
      }
    },
    end_time: {
      type: DataType.DATE,
      allowNull: false,
      get: function () {
        return moment().format("HH:mm a")
      }
    },
    adminID: {
      type: DataType.INTEGER,
      allowNull: false
    }
  });

  return Events;
}