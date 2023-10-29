const {
  createUserAchievement,
  readAllUserAchievements,
  readUserAchievement,
  updateUserAchievement,
  deleteUserAchievement,
} = require("../services/userAchievementService");

// Create UserAchievement
exports.addUserAchievement = async (req, res) => {
  try {
    const newUserAchievement = await createUserAchievement({
      ...req.body,
    });

    res.status(200).json({
      meta: {
        status: "success",
        message: "Successfully added userAchievement!",
        code: 200,
      },
      data: {
        ...newUserAchievement?.dataValues,
      },
    });
  } catch (error) {
    res.status(400).json({
      meta: {
        status: "failed",
        message: error.message,
        code: 400,
      },
      data: {},
    });
  }
};

// Show All UserAchievements
exports.showAllUserAchievements = async (req, res) => {
  try {
    const offsetAsNumber = Number.parseInt(req.query.page);
    const limitAsNumber = Number.parseInt(req.query.limit);

    let page = 0;
    if (!Number.isNaN(offsetAsNumber) && offsetAsNumber > 0) {
      page = offsetAsNumber;
    }

    let size = 10;
    if (
      !Number.isNaN(limitAsNumber) &&
      limitAsNumber > 0 &&
      limitAsNumber < 10
    ) {
      size = limitAsNumber;
    }

    const userAchievements = await readAllUserAchievements(size, page);

    // Map the userAchievements and create a modified response
    const modifiedAchievements = userAchievements.rows.map(
      (userAchievement) => {
        // Include only the necessary properties
        return {
          id: userAchievement.id,
          userId: userAchievement.userId,
          userAchievementId: userAchievement.userAchievementId,
          createdAt: userAchievement.createdAt,
          updatedAt: userAchievement.updatedAt,
        };
      }
    );

    res.status(200).json({
      meta: {
        status: "success",
        message: "Successfully show all userAchievements!",
        code: 200,
      },
      data: {
        totalContents: userAchievements.count,
        totalPages: Math.ceil(userAchievements.count / size),
        currentPage: page,
        contents: modifiedAchievements,
      },
    });
  } catch (error) {
    res.status(400).json({
      meta: {
        status: "failed",
        message: error.message,
        code: 400,
      },
      data: {},
    });
  }
};

// Show UserAchievement By ID
exports.showUserAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const userAchievement = await readUserAchievement(id);

    if (!userAchievement) {
      res.status(404).json({
        meta: {
          status: "failed",
          message: `User Achievement with id ${id} not found!`,
          code: 404,
        },
      });
    }

    res.status(200).json({
      meta: {
        status: "success",
        message: "Successfully show userAchievement!",
        code: 200,
      },
      data: {
        ...userAchievement?.dataValues,
      },
    });
  } catch (error) {
    res.status(400).json({
      meta: {
        status: "failed",
        message: error.message,
        code: 400,
      },
      data: {},
    });
  }
};

// Update UserAchievement
exports.updateUserAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const userAchievement = await readUserAchievement(id);

    if (!userAchievement) {
      res.status(404).json({
        meta: {
          status: "failed",
          message: `User Achievement with id ${id} not found!`,
          code: 404,
        },
        data: {},
      });
      return;
    }

    let bodyData = req.body;

    await updateUserAchievement(id, bodyData);

    const newUpdatedUserAchievement = await readUserAchievement(id);
    res.status(200).json({
      meta: {
        status: "success",
        message: "Successfully updated user Achievement!",
        code: 200,
      },
      data: {
        ...newUpdatedUserAchievement?.dataValues,
      },
    });
  } catch (error) {
    res.status(400).json({
      meta: {
        status: "failed",
        message: error.message,
        code: 400,
      },
      data: {},
    });
  }
};

// Delete UserAchievement By ID
exports.removeUserAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const userAchievement = await readUserAchievement(id);

    if (!userAchievement) {
      res.status(404).json({
        meta: {
          status: "failed",
          message: `UserAchievement with id ${id} not found!`,
          code: 404,
        },
        data: {},
      });
      return;
    }

    const deletedUserAchievement = await deleteUserAchievement(userAchievement);

    res.status(200).json({
      meta: {
        status: "success",
        message: "Successfully deleted user Achievement!",
        code: 200,
      },
      data: deletedUserAchievement,
    });
  } catch (error) {
    res.status(400).json({
      meta: {
        status: "failed",
        message: error.message,
        code: 400,
      },
      data: {},
    });
  }
};
