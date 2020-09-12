import React from "react";
import withRouter from "react-router-dom/withRouter";
import { useQuery } from "react-apollo-hooks";
import PostCardPresenter from "./PostCardPresenter";
import { POST_CARD_QUERY } from "./PostCardQueries";

export default withRouter(({ location: { search } }) => {
  const postId = search.split("=")[1];
  const { data, loading } = useQuery(POST_CARD_QUERY, {
    variables: { id: postId },
  });
  console.log(data);
  return <PostCardPresenter loading={loading} data={data} />;
});
