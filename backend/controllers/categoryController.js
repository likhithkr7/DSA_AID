import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";
import User from "../models/userModel.js";

// @desc  Fetch all categories
// @route GET /api/categories/:user
// @access Private
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({
    user: req.params.user,
  });
  res.json(categories);
});

// @desc  Fetch single category
// @route GET /api/categories/:user/:id
// @access Private
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.find({
    user: req.params.user,
    _id: req.params.id,
  });

  if (category) {
    res.json(category[0]);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

// @desc  Add a category
// @route POST /api/categories/:user
// @access Private
const addCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const subcategories = req.body.subcategories;
  const image = req.body.image;
  const result = await Category.create({
    user: req.params.user,
    name: name,
    image: image,
    subcategories: subcategories,
  });
  if (result) {
    res.status(201).json({
      user: req.params.user,
      name: name,
    });
  } else {
    res.status(401);
    throw new Error("Category insertion unsuccessfull");
  }
});

// @desc  Add a subcategory
// @route POST /api/categories/:user/:id
// @access Private
const addSubcategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const result = await Category.updateOne(
    { _id: req.params.id, user: req.params.user },
    {
      $push: {
        subcategories: { name },
      },
    }
  );
  if (result) {
    res.status(201).json({
      name: name,
    });
  } else {
    res.status(401);
    throw new Error("Subcategory insertion unsuccessfull");
  }
});

// @desc   Edit Problem
// @route   PUT /api/categories/:user/:id/:subcategoryId/:problemId
// @access   Private
const editProblem = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const difficulty = req.body.difficulty;
  const link = req.body.link;
  const status = req.body.status;
  const result = await Category.updateOne(
    {
      _id: req.params.id,
      user: req.params.user,
    },
    {
      $set: {
        "subcategories.$[x].problems.$[y].name": name,
        "subcategories.$[x].problems.$[y].difficulty": difficulty,
        "subcategories.$[x].problems.$[y].link": link,
        "subcategories.$[x].problems.$[y].status": status,
      },
    },
    {
      multi: true,
      arrayFilters: [
        {
          "x._id": req.params.subcategoryId,
        },
        {
          "y._id": req.params.problemId,
        },
      ],
    }
  );

  if (result) {
    res.status(201).json({
      name: name,
      difficulty: difficulty,
      link: link,
      status: status,
    });
  } else {
    res.status(401);
    throw new Error("Problem update unsuccessfull");
  }
});

// @desc  Delete a category
// @route DELETE /api/categories/:user/:id
// @access Private
const deleteCategory = asyncHandler(async (req, res) => {
  const result = await Category.deleteOne({
    _id: req.params.id,
    user: req.params.user,
  });
  if (result) {
    res.status(201).json({
      _id: req.params.id,
      user: req.params.user,
      status: "Successfully Deleted",
    });
  } else {
    res.status(401);
    throw new Error("Category deletion unsuccessfull");
  }
});

// @desc  Delete a subcategory
// @route Delete /api/categories/:user/:id/:subcategoryId
// @access Private
const deleteSubcategory = asyncHandler(async (req, res) => {
  const result = await Category.updateOne(
    {
      _id: req.params.id,
      user: req.params.user,
    },
    {
      $pull: {
        subcategories: {
          _id: req.params.subcategoryId,
        },
      },
    }
  );
  if (result) {
    res.status(201).json({
      _id: req.params.id,
      user: req.params.user,
      subcategoryId: req.params.subcategoryId,
      status: "Successfully Deleted",
    });
  } else {
    res.status(401);
    throw new Error("Subcategory deletion unsuccessfull");
  }
});

// @desc   Add Problem
// @route   POST /api/categories/:user/:id/:subcategoryId
// @access   Private
const addProblem = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const difficulty = req.body.difficulty;
  const link = req.body.link;
  const status = false;

  const result = await Category.updateOne(
    {
      _id: req.params.id,
      user: req.params.user,
    },
    {
      $push: {
        "subcategories.$[x].problems": {
          name: name,
          difficulty: difficulty,
          status: status,
          link: link,
          notes: {
            description: "",
            approach: "",
            timecomplexity: "",
            spacecomplexity: "",
          },
        },
      },
    },
    {
      multi: true,
      arrayFilters: [
        {
          "x._id": req.params.subcategoryId,
        },
      ],
    }
  );

  if (result) {
    res.status(201).json({
      name: name,
      difficulty: difficulty,
      status: status,
      link: link,
    });
  } else {
    res.status(401);
    throw new Error("Problem insertion unsuccessfull");
  }
});

// @desc  Delete a problem
// @route Delete /api/categories/:user/:id/:subcategoryId/:problemId
// @access Private
const deleteProblem = asyncHandler(async (req, res) => {
  const result = await Category.updateOne(
    {
      _id: req.params.id,
      user: req.params.user,
    },
    {
      $pull: {
        "subcategories.$[x].problems": {
          _id: req.params.problemId,
        },
      },
    },
    {
      multi: true,
      arrayFilters: [
        {
          "x._id": req.params.subcategoryId,
        },
      ],
    }
  );
  if (result) {
    res.status(201).json({
      _id: req.params.id,
      user: req.params.user,
      subcategoryId: req.params.subcategoryId,
      problemId: req.params.problemId,
      status: "Successfully Deleted",
    });
  } else {
    res.status(401);
    throw new Error("Problem deletion unsuccessfull");
  }
});

// db.warehouses.find({
//   inventory: { product: "widgetC", in_stock: { $gte: 90 } } } );
// @desc  Fetch single problem
// @route GET /api/categories/:user/:id/:subcategoryId/:problemId
// @access Private
const getSubcategory = asyncHandler(async (req, res) => {
  const subcategory = await Category.find({
    user: req.params.user,
    _id: req.params.id,
    "subcategories._id": req.params.subcategoryId,
  });

  if (subcategory) {
    res.json(subcategory);
  } else {
    res.status(404);
    throw new Error("subcategory not found");
  }
});

// @desc   Edit Note
// @route   PUT /api/categories/:user/:id/:subcategoryId/:problemId/:noteId
// @access   Private
const editNote = asyncHandler(async (req, res) => {
  const description = req.body.description;
  const approach = req.body.approach;
  const timecomplexity = req.body.timeComplexity;
  const spacecomplexity = req.body.spaceComplexity;
  const result = await Category.updateOne(
    {
      _id: req.params.id,
      user: req.params.user,
    },
    {
      $set: {
        "subcategories.$[x].problems.$[y].notes.$[z].description": description,
        "subcategories.$[x].problems.$[y].notes.$[z].approach": approach,
        "subcategories.$[x].problems.$[y].notes.$[z].timecomplexity":
          timecomplexity,
        "subcategories.$[x].problems.$[y].notes.$[z].spacecomplexity":
          spacecomplexity,
      },
    },
    {
      multi: true,
      arrayFilters: [
        {
          "x._id": req.params.subcategoryId,
        },
        {
          "y._id": req.params.problemId,
        },
        {
          "z._id": req.params.noteId,
        },
      ],
    }
  );

  if (result) {
    res.status(201).json({
      description: description,
      approach: approach,
      TC: timecomplexity,
      SC: spacecomplexity,
    });
  } else {
    res.status(401);
    throw new Error("Note update unsuccessfull");
  }
});

export {
  getCategories,
  getCategoryById,
  addCategory,
  addSubcategory,
  editProblem,
  deleteCategory,
  deleteSubcategory,
  addProblem,
  deleteProblem,
  getSubcategory,
  editNote,
};
