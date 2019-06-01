// Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// Users
const USERS = "/users";
const USER_DETAIL = "/:id"; // 윗줄이랑 이거 합치면 /user/1이런식으로 사용 가능하다고 하네
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const ME = "/me"

// Videos

const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

// Github

const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

// Facebook
const FB = "/auth/facebook";
const FB_CALLBACK = "/auth/facebook/callback";

// API
// 서버와 통신하기 위한 URL

const API = "/api";
const REGISTER_VIEW = "/:id/view";
const ADD_COMMNET =  "/:id/comment";


const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: id => {
    if (id) {
      return `/users/${id}`;
    } else {
      return USER_DETAIL;
    }
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIDEOS,
  upload: UPLOAD,
  videoDetail: id => {
    if (id) {
      return `/videos/${id}`;
    } else {
      return VIDEO_DETAIL;
    }
  },
  editVideo: (id) => {
    if(id){
      return `/videos/${id}/edit`;
    }else{
      return EDIT_VIDEO;
    }
  },
  deleteVideo: (id) => {
    if(id){
      return `/videos/${id}/delete`;
    } else{
      return DELETE_VIDEO;
    }
  },
  gitHub: GITHUB,
  githubCallback : GITHUB_CALLBACK,
  me : ME,
  facebook: FB,
  facebookCallback : FB_CALLBACK,
  api : API,
  registerView : REGISTER_VIEW,
  addComment : ADD_COMMNET
};

export default routes;
