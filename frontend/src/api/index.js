import axios from "axios"

const API = axios.create({baseURL: "http://localhost:8800/api/"})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
  });

// AUTH
export const signIn = (email,password) => API.post('/auth/login', {email,password});

// Upload File
export const uploadFile = (data) => API.post("/upload", data);

//newPost
export const createPost = (title,postType,postCategory,text,image,author) =>API.post("post/newPost" ,{ title,postType,postCategory,text,image,author})

//getAllPost
export const getAllPost = () => API.get("/post");

//get Category Posts
export const getCategoryPosts = (category) => API.get("/post/category/"+category);

//getPost
export const getPost = (post_id) => API.get("/post/find/"+post_id)

//Delete Post
export const deletePost = (post_id) => API.delete("/post/"+post_id);

//Update Post
export const updatePost = (post_id,title,text) => API.put("/post/"+post_id,{title,text});

//getUser
export const getUser = (username) => API.get(`/user/find?username=${username}`);

//getUserById 
export const getUserById = (ıd) => API.get(`/user/get/${ıd}`)

//Update User
export const updateUser = (user,updatedUser) => API.put("/user/"+user,{updatedUser});

//getAllPostsfromUser
export const getPostByUser = (username) => API.get("/post/profile/"+username);

//UpVote
export const upVote = (post_id,user_id) => API.put("/post/upvote/"+post_id,{user_id});

//DownVote
export const downVote = (post_id,user_id) => API.put("/post/downvote/"+post_id,{user_id});

//Save Post
export const savePost = (post,user_id) => API.put("/post/save/"+user_id,{post});

//SetPostsComment
export const createComment = (user_id,text,post_id) => API.post("/comment/create",{user_id,text,post_id});

//Delete Comment
export const deleteComment = (comment_id) => API.delete("/comment/"+comment_id);

//Update Comment
export const updateComment = (comment_id,commentText) => API.put("/comment/"+comment_id,{commentText});

//Get All Comments
export const getComment = (post_id) => API.get("/comment/getById/"+post_id);

//Comment UpVote
export const upVoteComment = (comment_id,user_id) => API.put("/comment/upvote/"+comment_id,{user_id});

//Comment DownVote
export const downVoteComment = (comment_id,user_id) => API.put("/comment/downvote/"+comment_id,{user_id});

//Comment Reply
export const replyComment = (comment_id,commentText,commentUser,commentPost ) => API.put("/comment/reply/"+comment_id,{commentText,commentUser,commentPost});

//getConversations of user
export const getConversations = (user_id) => API.get("/conversations/"+user_id);

//getMessages of conversation
export const getMessagesOfConversation = (conversationId) => API.get("/messages/"+conversationId);

//Send Message 
export const sendMessage = (conversationId,user_id,text) => API.post("/messages/send/",{conversationId,user_id,text})

//Get 5 Notifications
export const getNotifications = (username) => API.get("/notification/"+username);

//Get All Notifications
export const getAllNotifications = (username) => API.get("/notification/all/"+username);

//Delete a Notifications
export const deleteNotification = (id) => API.delete("/notification/"+id);