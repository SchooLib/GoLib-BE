const { signInWithEmailAndPassword } = require("firebase/auth");
const { storage, auth } = require("../../config/firebase");
const { ref, deleteObject } = require("firebase/storage");
const config = require("../../config/config");
const {
  createAchievement,
  readAllAchievements,
  readAchievement,
  updateAchievement,
  deleteAchievement,
} = require("../services/achievementServices");

// Create Achievement
exports.addAchievement = async (req, res) => {
  try {
    const newAchievement = await createAchievement({
      ...req.body,
      image: req.imageName,
    });

    res.status(200).json({
      meta: {
        code: 200,
        status: "success",
        message: "Successfully added achievement!",
      },
      data: {
        ...newAchievement?.dataValues,
        image: `https://firebasestorage.googleapis.com/v0/b/golib-59a06.appspot.com/o/images%2F${
          newAchievement.image.split("/")[1]
        }?alt=media`,
      },
    });
  } catch (error) {
    res.status(400).json({
      meta: {
        code: 400,
        status: "failed",
        message: error.message,
      },
      data: {},
    });
  }
};

// Show All Achievements
exports.showAllAchievements = async (req, res) => {
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

    const achievements = await readAllAchievements(size, page);
    console.log(achievements);

    // Map the achievements and create a modified response
    const modifiedAchievements = achievements.map((achievement) => {
      // Include only the necessary properties
      return {
        id: achievement.id,
        title: achievement.title,
        image: `https://firebasestorage.googleapis.com/v0/b/golib-59a06.appspot.com/o/images%2F${
          achievement.image.split("/")[1]
        }?alt=media`,
        description: achievement.description,
        achive_point: achievement.achive_point,
        maxRead: achievement.maxRead,
        readGenre: achievement.readGenre,
        type: achievement.type,
        isActive: achievement.isActive,
        createdAt: achievement.createdAt,
        updatedAt: achievement.updatedAt,
      };
    });

    res.status(200).json({
      meta: {
        code: 200,
        status: "success",
        message: "Successfully show all achievements!",
      },
      data: {
        totalContents: achievements.count,
        totalPages: Math.ceil(achievements.count / size),
        currentPage: page,
        contents: modifiedAchievements,
      },
    });
  } catch (error) {
    res.status(400).json({
      meta: {
        code: 400,
        status: "failed",
        message: error.message,
      },
      data: {},
    });
  }
};

// Show Achievement By ID
exports.showAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const achievement = await readAchievement(id);

    if (!achievement) {
      res.status(404).json({
        meta: {
          code: 404,
          status: "failed",
          message: `Achievement with id ${id} not found!`,
        },
      });
    }

    res.status(200).json({
      meta: {
        code: 200,
        status: "success",
        message: "Successfully show achievement!",
      },
      data: {
        ...achievement?.dataValues,
        image: `https://firebasestorage.googleapis.com/v0/b/golib-59a06.appspot.com/o/images%2F${
          achievement?.image.split("/")[1]
        }?alt=media`,
      },
    });
  } catch (error) {
    res.status(400).json({
      meta: {
        code: 400,
        status: "failed",
        message: error.message,
      },
      data: {},
    });
  }
};

// Update Achievement
exports.updateAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const achievement = await readAchievement(id);

    if (!achievement) {
      res.status(404).json({
        meta: {
          code: 404,
          status: "failed",
          message: `Achievement with id ${id} not found!`,
        },
        data: {},
      });
      return;
    }

    let bodyData = req.body;

    if (req.imageName) {
      await signInWithEmailAndPassword(
        auth,
        config.firebaseUser,
        config.firebaseAuth
      );
      bodyData = { ...req.body, image: req.imageName };
      const desertRef = ref(storage, achievement.image);
      await deleteObject(desertRef);
    }

    await updateAchievement(id, bodyData);

    const newUpdatedAchievement = await readAchievement(id);
    res.status(200).json({
      meta: {
        code: 200,
        status: "success",
        message: "Successfully updated achievement!",
      },
      data: {
        ...newUpdatedAchievement?.dataValues,
        image: `https://firebasestorage.googleapis.com/v0/b/golib-59a06.appspot.com/o/images%2F${
          newUpdatedAchievement?.image.split("/")[1]
        }?alt=media`,
      },
    });
  } catch (error) {
    res.status(400).json({
      meta: {
        code: 400,
        status: "failed",
        message: error.message,
      },
      data: {},
    });
  }
};

// Delete Achievement By ID
exports.removeAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const achievement = await readAchievement(id);

    if (!achievement) {
      res.status(404).json({
        meta: {
          code: 404,
          status: "failed",
          message: `Achievement with id ${id} not found!`,
        },
        data: {},
      });
      return;
    }

    if (achievement.image) {
      console.log("achiv-img : ");
      await signInWithEmailAndPassword(
        auth,
        config.firebaseUser,
        config.firebaseAuth
      );
      const desertRef = ref(storage, achievement.image)
      await deleteObject(desertRef);
    }

    const deletedAchievement = await deleteAchievement(achievement);
    
    res.status(200).json({
      meta: {
        code: 200,
        status: "success",
        message: "Successfully deleted achievement!",
      },
      data: deletedAchievement,
    });
  } catch (error) {
    res.status(400).json({
      meta: {
        code: 400,
        status: "failed",
        message: error.message,
      },
      data: {},
    });
  }
};
