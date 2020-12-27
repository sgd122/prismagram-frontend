import React from "react";
import styled from "styled-components";
import SquarePost from "../SquarePost";

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
  grid-gap: 5px;
`;

export default ({
  posts,
}) => (
  <Posts>
    {posts && posts.map(post => (
      <SquarePost
        key={post.id}
        id={post.id}
        likeCount={post.likeCount}
        commentCount={post.commentCount}
        file={post.files[0]}
        type="explore"
      />
    ))}
  </Posts>
);
