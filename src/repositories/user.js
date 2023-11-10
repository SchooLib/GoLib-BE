const { User, userAchievements, Achievement, bookReviews, books, classifications } = require("../models");

exports.createUser = (data) => {
  return User.create(data);
};

exports.getOneUser = (data) => {
  return User.findOne({
    where: { nisn: data.nisn },
    include: [
      {
        model: userAchievements,
        attributes: ["id"],
        as: "achievements"
      },
      {
        model: bookReviews,
        attributes: ["id"],
        as: "reviews",
      },
    ],
  });
};

exports.getOneLoginAdmin = (data) => {
  return User.findOne({
    where: { username: data.username },
  });
};

exports.getUserById = (id) => {
  return User.findOne({
    where: { id: id },
    include: [
      {
        model: userAchievements,
        attributes: ["id", "achievementId"],
        as: "achievements"
      },
      {
        model: bookReviews,
        attributes: ["id", "bookId", "content"],
        as: "reviews",
        include: {
          model: books,
          attributes: ["title"],
          as: "book",
          include: {
            model: classifications,
            as: "classifications",
            attributes: ["name"]
          }
        }
      },
    ],
  });
};

exports.getUserByUsername = (username) => {
  return User.findOne({
    where: { username },
  });
};

exports.getUserByNisn = (nisn) => {
  return User.findOne({
    where: { nisn },
  });
};

exports.getAllUsers = async (limit, offset) => {
  try {
    const users = await User.findAndCountAll({
      limit,
      offset: offset * limit,
      where: { role: "user" },
      include: [
        {
          model: userAchievements,
          attributes: ["id", "achievementId"],
          as: "achievements"
        },
        {
          model: bookReviews,
          attributes: ["id", "bookId", "content"],
          as: "reviews",
          include: {
            model: books,
            attributes: ["title"],
            as: "book",
            include: {
              model: classifications,
              as: "classifications",
              attributes: ["name"]
            }
          }
        },
      ],
    });
    return users;
  } catch (error) {
    console.error("Error fetching users with achievements:", error);
    throw error; // or handle the error as you see fit
  }
};

exports.update = (id, data) => {
  return User.update(data, {
    where: {
      id,
    },
  });
};

exports.delete = (data) => {
  return data.destroy();
};
