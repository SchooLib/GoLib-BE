const { succes, notFound } = require("../helper/response");
const { getUserByNisn } = require("../repositories/user");
const {
  createUser,
  getOneLogin,
  getToken,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUsers,
  getOneLoginAdmin,
} = require("../services/user");

const { ref, deleteObject } = require("firebase/storage");
const config = require("../../config/config");
const { signInWithEmailAndPassword } = require("firebase/auth");
const { storage, auth } = require("../../config/firebase");
const { pagintaion } = require("../helper/pagination");

exports.createUser = async (req, res) => {
  try {
    let existUser;
    if (req.body.username) {
      existUser = await getUserByNisn(req.body.username);
    } else {
      existUser = await getUserByNisn(req.body.nisn);
    }

    if (existUser) {
      res.status(400).json({
        meta: {
          status: "failed",
          message: `User allready exist!`,
          code: 200,
        },
        data: {},
      });
      return;
    }

    const newUser = await createUser({
      ...req.body,
      img: `https://firebasestorage.googleapis.com/v0/b/golib-59a06.appspot.com/o/images%2F${
        req.imageName.split("/")[1]
      }?alt=media`,
    });
    res.status(200).json(succes("user", newUser));
  } catch (error) {
    res.status(400).json(notFound(error));
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.status(200).json(succes("user", newUser));
  } catch (error) {
    res.status(400).json(notFound(error));
  }
};

exports.loginUserAdmin = async (req, res) => {
  try {
    let data = req.body;
    const getOneUser = await getOneLoginAdmin(data);
    data = {
      ...data,
      id: getOneUser.dataValues?.id,
      role: getOneUser.dataValues.role,
    };
    const token = await getToken(data, getOneUser.dataValues?.password);
    res.status(200).json({
      meta: {
        status: "success",
        message: `The user has been successfully login`,
        code: 200,
      },
      data: {
        id: getOneUser.dataValues?.id,
        fullName: getOneUser.dataValues?.fullName,
        role: getOneUser.dataValues.role,
        username: data.username,
      },
      token,
    });
  } catch (error) {
    res.status(400).json(notFound(error));
  }
};

exports.loginUser = async (req, res) => {
  try {
    let data = req.body;
    const getOneUser = await getOneLogin(data);
    data = {
      ...data,
      id: getOneUser.dataValues?.id,
      role: getOneUser.dataValues.role,
    };
    const token = await getToken(data, getOneUser.dataValues?.password);
    res.status(200).json({
      meta: {
        status: "success",
        message: `The user has been successfully login`,
        code: 200,
      },
      data: {
        id: getOneUser.dataValues?.id,
        fullName: getOneUser.dataValues?.fullName,
        role: getOneUser.dataValues.role,
        nisn: data.nisn,
      },
      token,
    });
  } catch (error) {
    res.status(400).json(notFound(error));
  }
};
exports.getUserById = async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const user = await getUserById(idUser);
    res.status(200).json({
      meta: {
        status: "success",
        message: `User retrived successfully!`,
        code: 200,
      },
      data: {
        ...user?.dataValues,
      },
    });
  } catch (err) {
    res.status(400).json(notFound(err));
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const offsetAsNumber = Number.parseInt(req.query.page);
    const limitAsNumber = Number.parseInt(req.query.limit);

    const { page, size } = pagintaion(offsetAsNumber, limitAsNumber);

    const users = await getAllUsers(size, page);

    console.log({ users });

    const modifiedUsers = users.rows.map((user) => {
      let data = user.dataValues;
      return {
        id: data.id,
        fullName: data.fullName,
        nisn: data.nisn,
        point: data.point,
        isPasswordChange: data.isPasswordChange,
        img: data.img,
        achievements: data.achievements,
        reviews: data.reviews,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
    });
    res.status(200).json({
      meta: {
        status: "success",
        message: "Users retrieved successfully",
        code: 200,
      },
      data: {
        totalContents: users.count,
        totalPages: Math.ceil(users.count / size),
        currentPage: page + 1,
        contents: [...modifiedUsers],
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

exports.editUser = async (req, res) => {
  try {
    const idUser = req.params.idUser;
    let userBody = req.body;

    let existUser = await getUserById(idUser);

    if (!existUser) {
      res.status(404).json({
        meta: {
          status: "failed",
          message: `User with id ${idUser} not found!`,
          code: 404,
        },
        data: {},
      });
    }

    if (req.imageName) {
      await signInWithEmailAndPassword(
        auth,
        config.firebaseUser,
        config.firebaseAuth
      );
      userBody = {
        ...req.body,
        img: `https://firebasestorage.googleapis.com/v0/b/golib-59a06.appspot.com/o/images%2F${
          req.imageName.split("/")[1]
        }?alt=media`,
      };
      const desertRef = ref(storage, req.imageName);
      await deleteObject(desertRef);
    }

    const _ = await updateUser(idUser, userBody);
    const user = await getUserById(idUser);
    res.status(200).json({
      meta: {
        status: "success",
        message: "User updated successfully",
        code: 200,
      },
      data: {
        ...user?.dataValues,
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

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.idUser;
    const user = await getUserById(id);
    if (!user) {
      res.status(404).json({
        meta: {
          status: "success",
          message: `User with id ${id} not found!`,
          code: 404,
        },
        data: {},
      });
      return;
    }

    const deletedUser = await deleteUsers(user);
    res.status(200).json({
      meta: {
        status: "success",
        message: "Book deleted successfully",
        code: 200,
      },
      data: user,
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
