import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import Post from "../../Components/Post";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;

export default ({ loading, data }) => {
  return (
    <Wrapper>
      <Helmet>
        <title>Post | Prismagram</title>
      </Helmet>
      {loading && <Loader />}
      {!loading && data && data.seeFullPost && (
        <Post
          key={data.seeFullPost.id}
          id={data.seeFullPost.id}
          caption={data.seeFullPost.caption}
          location={data.seeFullPost.location}
          user={data.seeFullPost.user}
          files={data.seeFullPost.files}
          likeCount={data.seeFullPost.likeCount}
          isLiked={data.seeFullPost.isLiked}
          comments={data.seeFullPost.comments}
          createdAt={data.seeFullPost.createdAt}
        />
      )}
    </Wrapper>
  );
};
