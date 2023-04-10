import mongoose from "mongoose";

const notesSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: false,
    },
    approach: {
      type: String,
      required: false,
    },
    timecomplexity: {
      type: String,
      required: false,
    },
    spacecomplexity: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const problemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
    link: {
      type: String,
    },
    difficulty: {
      type: String,
      required: true,
    },
    notes: [notesSchema],
  },
  {
    timestamps: true,
  }
);

const subcategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    problems: [problemSchema],
  },
  {
    timestamps: true,
  }
);

const categorySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    subcategories: [subcategorySchema],
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
