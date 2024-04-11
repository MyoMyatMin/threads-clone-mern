import User from "../models/userModel.js";
import Post from "../models/postModels.js";

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    res.status(200).json({ message: "Post found.", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

const createPost = async (req, res) => {
  try {
    const { postedBy, text, img } = req.body;

    if (!postedBy || !text) {
      return res
        .status(400)
        .json({ error: "Postedby and text field are required" });
    }

    const user = await User.findById(postedBy);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: "Unauthorized to create post." });
    }
    const maxLength = 500;
    if (text.length > maxLength) {
      return res
        .status(400)
        .json({ error: `Text must be less than ${maxLength} characters.` });
    }

    const newPost = new Post({
      postedBy,
      text,
      img,
    });
    await newPost.save();

    res.status(201).json({ message: "Post created successfully", newPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    if (post.postedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: "Unauthorized to delete post." });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

const likeUnlikePost = async (req, res) => {
  try {
    const { id: postID } = req.params;
    const userID = req.user._id;

    const post = await Post.findById(postID);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    const userLikedPost = post.likes.includes(userID);
    console.log(userID);
    if (userLikedPost) {
      await Post.updateOne({ _id: postID }, { $pull: { likes: userID } });
      res.status(200).json({ message: "Post unliked successfully." });
    } else {
      post.likes.push(userID);
      await post.save();
      res.status(200).json({ message: "Post liked successfuly." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

const replyToPost = async (req, res) => {
  try {
    const { text } = req.body;
    const { id: postID } = req.params;
    const userId = req.user._id;
    const userProfilePic = req.user.profilePic;
    const username = req.user.username;
    if (!text) {
      res.status(400).json({ error: "Text field is required." });
    }

    const post = await Post.findById(postID);
    if (!post) {
      res.status(404).json({ error: "Post not found." });
    }

    const reply = { userId, text, userProfilePic, username };
    post.replies.push(reply);
    await post.save();

    res.status(200).json({ message: "Reply added successfully.", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFeedPosts = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const following = user.following;

    const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({
      createdAt: -1,
    });

    res.status(200).json({ feedPosts });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export {
  createPost,
  getPost,
  deletePost,
  likeUnlikePost,
  replyToPost,
  getFeedPosts,
};
