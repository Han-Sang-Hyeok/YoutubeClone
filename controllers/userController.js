import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", {
    pageTitle: "join"
  });
};

export const postJoin = async (req, res, next) => {
  const {
    body: {
      name,
      email,
      password,
      password2
    }
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", {
      pageTitle: "Join"
    });
  } else {
    try{
      const user = await User({
        name,
        email
      })
      await User.register(user,password,)
      next();
    }catch (error){
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) =>
  res.render("login", {
    pageTitle: "login"
  });
  
export const postLogin = passport.authenticate('local',{
  failureRedirect : routes.login,
  successRedirect : routes.home
})


// Git-hub loggin part
export const githubLogin = passport.authenticate("github");

//export const githhubLoginCallback = async (_, __, profile,cb) // 이 구문도 가능
export const githubLoginCallback = async (accessToken,refreshToken, profile, cb) =>{
  const {_json : {id, avatar_url, name, email}} = profile; 
  try{
    const user = await User.findOne({email});
    //const user = await User.findOnd({email : email});
    console.log(user);
    if(user){
      user.githubId = id;
      user.avatarUrl = avatar_url;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId : id,
      avatar_url
    });
    return cb(null, newUser);
  
  }catch(error){
    return cb(error);
  }

}

export const postGithubLogIn= (req,res) => {
  res.redirect(routes.home);
}

// facebook loggin part
export const facebookLogin = passport.authenticate("facebook");

export const facebookLoginCallback = async (_,__, profile, cb) =>{
  const {_json : {id, name, email}} = profile;
  console.log(profile);
  try{
    const user = await User.findOne({email});
    if(user){
      user.facebookId = id,
      user.save();
      return cb(null,user);
    }
    const newUser = await User.create({
      email,
      name,
      facebookId : id
    });
    return cb(null,newUser);
  }catch(error){
    return cb(error);
  }
}

export const postFacebookLogin = (req,res) =>{
  res.redirect(routes.home);
}


export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const getMe = (req,res) =>{
  res.render("userDetail",{pageTitle : "User Detail", user : req.user})
}

export const userDetail = async (req, res) =>{
  const {params : {id}} = req;
  // url에 있는 id값 사용하니까 (토큰)
  try{
    const user = await User.findById(id).populate("videos");
    console.log(user);
    res.render("userDetail",{pageTitle : "User Detail",user});
  }catch(error){
    res.redirect(routes.home);
  }
}
export const users = (req, res) => res.render("users");
export const getEditProfile = (req, res) => res.render("editProfile");
export const postEditProfile = async (req,res) => {
  const{
    body :{name, email},
    file 
  } = req;
  try{
    await User.findByIdAndUpdate(req.user.id,{
      name,
      email,
      avatarUrl: file? file.location : req.user.avatarUrl
    });
    res.redirect(routes.me);
  }catch(error){
    //res.render("editProfile", {pageTitle:"Edit Profile"});
    res.redirect(routes.editProfile);
  }
}
export const getChangePassword = (req, res) => res.render("changePassword",{pageTitle : "Change Password"});

export const postChangePassword = async (req,res) => {
  const {
    body : {
      oldPassword,
      newPassword,
      newPassword1
    } 
  }= req;

    try{
        if(newPassword !== newPassword1){
          res.status(400);
          res.redirect(`/users/${routes.changePassword}`);
          return;
        }
        await req.user.changePassword(oldPassword,newPassword);
        res.redirect(routes.me);
    }catch(error){
      res.status(400);
      res.redirect(`/users/${routes.changePassword}`);
    }
};
