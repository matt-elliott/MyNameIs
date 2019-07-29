module.exports = function (sq, DataType) {
  const Users = sq.define('Users', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    first_name: {
      type: DataType.STRING,
      allowNull: false
    },
    last_name: {
      type: DataType.STRING,
      allowNull: false
    },
    email: {
      type: DataType.STRING,
      allowNull: false
    },
    profile_img: {
      type: DataType.STRING,
      allowNull: false
    },
    eventID: {
      type: DataType.INTEGER,
      allowNull: false
    },
  })
}