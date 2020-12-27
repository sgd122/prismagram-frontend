import React from "react";
import PropTypes from "prop-types";
import ExplorePresenter from "./ExplorePresenter";

const ExploreContainer = ({
  posts
}) => {

  return (
    <ExplorePresenter
      posts={posts}
    />
  );
};

ExploreContainer.propTypes = {
  posts: PropTypes.object.isRequired,
};

export default ExploreContainer;
