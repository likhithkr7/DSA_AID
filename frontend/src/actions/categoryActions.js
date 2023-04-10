import axios from "axios";
import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  CATEGORY_ADD_REQUEST,
  CATEGORY_ADD_SUCCESS,
  CATEGORY_ADD_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  SUBCATEGORY_ADD_REQUEST,
  SUBCATEGORY_ADD_SUCCESS,
  SUBCATEGORY_ADD_FAIL,
  SUBCATEGORY_DELETE_REQUEST,
  SUBCATEGORY_DELETE_SUCCESS,
  SUBCATEGORY_DELETE_FAIL,
  EDIT_UPDATE_REQUEST,
  EDIT_UPDATE_SUCCESS,
  EDIT_UPDATE_FAIL,
  PROBLEM_ADD_REQUEST,
  PROBLEM_ADD_SUCCESS,
  PROBLEM_ADD_FAIL,
  PROBLEM_DELETE_REQUEST,
  PROBLEM_DELETE_SUCCESS,
  PROBLEM_DELETE_FAIL,
  EDIT_NOTE_REQUEST,
  EDIT_NOTE_SUCCESS,
  EDIT_NOTE_FAIL,
  CLEAR_CATEGORY_DETAILS_REQUEST,
  CLEAR_CATEGORY_DETAILS_SUCCESS,
  CLEAR_CATEGORY_DETAILS_FAIL,
} from "../constants/categoryConstants";

export const listCategories = (user) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });

    const { data } = await axios.get(`/api/categories/${user}`);

    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listCategoryDetails = (user, id, msg) => async (dispatch) => {
  console.log(msg);
  if (msg === "fetch") {
    try {
      dispatch({ type: CATEGORY_DETAILS_REQUEST });

      const { data } = await axios.get(`/api/categories/${user}/${id}`);

      dispatch({
        type: CATEGORY_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CATEGORY_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  } else if (msg === "clear") {
    try {
      dispatch({ type: CLEAR_CATEGORY_DETAILS_REQUEST });

      const { data } = {};

      dispatch({
        type: CLEAR_CATEGORY_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CLEAR_CATEGORY_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }
};

export const addNewCategory =
  (user, name, subcategories, image) => async (dispatch) => {
    try {
      dispatch({
        type: CATEGORY_ADD_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `/api/categories/${user}`,
        { name, subcategories, image },
        config
      );

      dispatch({
        type: CATEGORY_ADD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CATEGORY_ADD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const addNewSubcategory = (user, id, name) => async (dispatch) => {
  try {
    dispatch({
      type: SUBCATEGORY_ADD_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/categories/${user}/${id}`,
      { name },
      config
    );

    dispatch({
      type: SUBCATEGORY_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUBCATEGORY_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProblem =
  (user, id, subcategoryId, problemId, name, difficulty, link, status) =>
  async (dispatch) => {
    try {
      dispatch({
        type: EDIT_UPDATE_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/categories/${user}/${id}/${subcategoryId}/${problemId}`,
        { name, difficulty, status, link },
        config
      );

      dispatch({
        type: EDIT_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EDIT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteCategory = (user, _id) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_DELETE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.delete(
      `/api/categories/${user}/${_id}`,
      config
    );

    dispatch({
      type: CATEGORY_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteSubcategory =
  (user, id, subcategoryId) => async (dispatch) => {
    try {
      dispatch({
        type: SUBCATEGORY_DELETE_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.delete(
        `/api/categories/${user}/${id}/${subcategoryId}`,
        config
      );

      dispatch({
        type: SUBCATEGORY_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SUBCATEGORY_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const addProblem =
  (user, id, subcategoryId, name, difficulty, link) => async (dispatch) => {
    try {
      dispatch({
        type: PROBLEM_ADD_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/categories/${user}/${id}/${subcategoryId}`,
        { name, difficulty, link },
        config
      );

      dispatch({
        type: PROBLEM_ADD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PROBLEM_ADD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteProblem =
  (user, id, subcategoryId, problemId) => async (dispatch) => {
    try {
      dispatch({
        type: PROBLEM_DELETE_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.delete(
        `/api/categories/${user}/${id}/${subcategoryId}/${problemId}`,
        config
      );

      dispatch({
        type: PROBLEM_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PROBLEM_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateNotes =
  (
    user,
    id,
    subcategoryId,
    problemId,
    noteId,
    description,
    approach,
    timeComplexity,
    spaceComplexity
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: EDIT_NOTE_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/categories/${user}/${id}/${subcategoryId}/${problemId}/${noteId}`,
        { description, approach, timeComplexity, spaceComplexity },
        config
      );

      dispatch({
        type: EDIT_NOTE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EDIT_NOTE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
