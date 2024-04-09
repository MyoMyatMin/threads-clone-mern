import React from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";

export default function UserPage() {
  return (
    <>
      <UserHeader />
      <UserPost
        likes={1200}
        replies={481}
        postImg="/post1.png"
        postTitle="Let's talk about threads"
      />
      <UserPost
        likes={451}
        replies={12}
        postImg="/post2.png"
        postTitle="Nice tutorial."
      />
      <UserPost
        likes={989}
        replies={321}
        postImg="/post3.png"
        postTitle="I love this guy."
      />
      <UserPost likes={212} replies={56} postTitle="This is my first post." />
    </>
  );
}
