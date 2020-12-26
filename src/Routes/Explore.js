import React from "react";
import { Helmet } from "rl-react-helmet";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import Explore from "../Components/Explore";

const EXPLORE_QUERY = gql`
  {
    seeFeed {
      id
      location
      caption
      user {
        id
        avatar
        name
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          name
        }
      }
      createdAt
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 50vh;
`;


export default () => {
    const { data, loading } = useQuery(EXPLORE_QUERY);
    return (
        <Wrapper>
            <Helmet>
                <title>Explore | Prismagram</title>
            </Helmet>
            {loading && <Loader />}
            {!loading &&
                data &&
                data.seeFeed &&
                <Explore
                    posts={data.seeFeed}
                />}
        </Wrapper>
    )
};
