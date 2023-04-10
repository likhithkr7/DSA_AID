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
  SUBCATEGORY_ADD_REQUEST,
  SUBCATEGORY_ADD_SUCCESS,
  SUBCATEGORY_ADD_FAIL,
  EDIT_UPDATE_REQUEST,
  EDIT_UPDATE_SUCCESS,
  EDIT_UPDATE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  SUBCATEGORY_DELETE_REQUEST,
  SUBCATEGORY_DELETE_SUCCESS,
  SUBCATEGORY_DELETE_FAIL,
  PROBLEM_ADD_REQUEST,
  PROBLEM_ADD_SUCCESS,
  PROBLEM_ADD_FAIL,
  PROBLEM_DELETE_REQUEST,
  PROBLEM_DELETE_SUCCESS,
  PROBLEM_DELETE_FAIL,
  EDIT_NOTE_REQUEST,
  EDIT_NOTE_SUCCESS,
  CLEAR_CATEGORY_DETAILS_REQUEST,
  CLEAR_CATEGORY_DETAILS_SUCCESS,
  CLEAR_CATEGORY_DETAILS_FAIL,
} from "../constants/categoryConstants";

export const categoryListReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true, categories: [] };
    case CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const categoryDetailsReducer = (
  state = { category: { subcategories: [] } },
  action
) => {
  switch (action.type) {
    case CATEGORY_DETAILS_REQUEST:
      return { loading: true, ...state };
    case CATEGORY_DETAILS_SUCCESS:
      return {
        loading: false,
        category: action.payload,
      };
    case CATEGORY_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    case CLEAR_CATEGORY_DETAILS_REQUEST:
      return { clear_loading: true, ...state };
    case CLEAR_CATEGORY_DETAILS_SUCCESS:
      return {
        clear_loading: false,
        category: action.payload,
      };
    case CLEAR_CATEGORY_DETAILS_FAIL:
      return { clear_loading: false, error: action.payload };
    default:
      return state;
  }
};

export const categoryAddReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_ADD_REQUEST:
      return { loading_category_add: true };
    case CATEGORY_ADD_SUCCESS:
      return {
        loading_category_add: false,
        success: true,
        categoryInfo: action.payload,
      };
    case CATEGORY_ADD_FAIL:
      return {
        loading_category_add: false,
        error_category_add: action.payload,
      };
    default:
      return state;
  }
};

export const subcategoryAddReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBCATEGORY_ADD_REQUEST:
      return { loading_subcategory_add: true };
    case SUBCATEGORY_ADD_SUCCESS:
      return {
        loading_subcategory_add: false,
        success: true,
        subcategoryInfo: action.payload,
      };
    case SUBCATEGORY_ADD_FAIL:
      return {
        loading_subcategory_add: false,
        error_subcategory_add: action.payload,
      };
    default:
      return state;
  }
};

export const editProblemReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_UPDATE_REQUEST:
      return { loading_edit_update: true };
    case EDIT_UPDATE_SUCCESS:
      return {
        loading_edit_update: false,
        success: true,
        editInfo: action.payload,
      };
    case EDIT_UPDATE_FAIL:
      return {
        loading_edit_update: false,
        error_edit_update: action.payload,
      };
    default:
      return state;
  }
};

export const categoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_DELETE_REQUEST:
      return { loading_category_delete: true };
    case CATEGORY_DELETE_SUCCESS:
      return {
        loading_category_delete: false,
        success: true,
        categoryInfo: action.payload,
      };
    case CATEGORY_DELETE_FAIL:
      return {
        loading_category_delete: false,
        error_category_delete: action.payload,
      };
    default:
      return state;
  }
};

export const subcategoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBCATEGORY_DELETE_REQUEST:
      return { loading_subcategory_delete: true };
    case SUBCATEGORY_DELETE_SUCCESS:
      return {
        loading_subcategory_delete: false,
        success: true,
        subcategoryInfo: action.payload,
      };
    case SUBCATEGORY_DELETE_FAIL:
      return {
        loading_subcategory_delete: false,
        error_subcategory_delete: action.payload,
      };
    default:
      return state;
  }
};

export const problemAddReducer = (state = {}, action) => {
  switch (action.type) {
    case PROBLEM_ADD_REQUEST:
      return { loading_problem_add: true };
    case PROBLEM_ADD_SUCCESS:
      return {
        loading_problem_add: false,
        success_problem_add: true,
        problemInfo: action.payload,
      };
    case PROBLEM_ADD_FAIL:
      return {
        loading_problem_add: false,
        error_problem_add: action.payload,
      };
    default:
      return state;
  }
};

export const problemDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PROBLEM_DELETE_REQUEST:
      return { loading_problem_delete: true };
    case PROBLEM_DELETE_SUCCESS:
      return {
        loading_problem_delete: false,
        success_problem_delete: true,
        problemInfo: action.payload,
      };
    case PROBLEM_DELETE_FAIL:
      return {
        loading_problem_delete: false,
        error_problem_delete: action.payload,
      };
    default:
      return state;
  }
};

export const editNoteReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_NOTE_REQUEST:
      return { loading_edit_note: true };
    case EDIT_NOTE_SUCCESS:
      return {
        loading_edit_note: false,
        success: true,
        editNoteInfo: action.payload,
      };
    case EDIT_UPDATE_FAIL:
      return {
        loading_edit_note: false,
        error_edit_note: action.payload,
      };
    default:
      return state;
  }
};
