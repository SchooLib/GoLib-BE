const {
  createClassification,
  readClassifications,
  readClassification,
  editClassifications,
  removeClassifications,
} = require("../services/classificationServices");

exports.addClassifications = async (req, res) => {
  try {
    const newClassification = await createClassification(req.body);

    res.status(200).json({
      meta: {
        status: "success",
        message:
          "The classification has been successfully added to the database.",
        code: 200,
      },
      data: newClassification,
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

exports.retriveClassifications = async (req, res) => {
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


    const classifications = await readClassifications(size, page);

    res.status(200).json({
      meta: {
        status: "success",
        message: "classifications retrieved successfully",
        code: 200,
      },
      data: {
        totalContents: classifications.count,
        totalPages: Math.ceil(classifications.count / size),
        currentPage: page,
        contents: classifications.rows,
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

exports.retriveClassification = async (req, res) => {
  try {
    const { id } = req.params;
    const classification = await readClassification(id);
    if (!classification) {
      res.status(404).json({
        meta: {
          status: "success",
          message: `Book with id ${id} not found!`,
          code: 404,
        },
        data: {},
      });
      return;
    }
    res.status(200).json({
      meta: {
        status: "success",
        message: "classification retrieved successfully",
        code: 200,
      },
      data: classification,
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

exports.updateClassifications = async (req, res) => {
  try {
    const { id } = req.params;
    const classification = await readClassification(id);
    if (!classification) {
      res.status(404).json({
        meta: {
          status: "success",
          message: `Book with id ${id} not found!`,
          code: 404,
        },
        data: {},
      });
      return;
    }
    const updatedData = await editClassifications(id, req.body);

    res.status(200).json({
      meta: {
        status: "success",
        message: "classification updated successfully",
        code: 200,
      },
      data: updatedData,
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

exports.deleteClassifications = async (req, res) => {
  try {
    const { id } = req.params;
    const classification = await readClassification(id);
    if (!classification) {
      res.status(404).json({
        meta: {
          status: "success",
          message: `Book with id ${id} not found!`,
          code: 404,
        },
        data: {},
      });
      return;
    }
    const deletedData = await removeClassifications(id);
    res.status(200).json({
      meta: {
        status: "success",
        message: "classification deleted successfully",
        code: 200,
      },
      data: deletedData,
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