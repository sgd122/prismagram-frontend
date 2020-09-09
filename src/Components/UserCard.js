import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FatText from "./FatText";
import Avatar from "./Avatar";
import Button from "./Button";
import { Link } from "react-router-dom";

const Card = styled.div`
  ${(props) => props.theme.whiteBox};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const EAvater = styled(Avatar)`
  margin-bottom: 15px;
`;

const ELink = styled(Link)`
  color: inherit;
  margin-bottom: 10px;
`;

const UserCard = ({ key, name, isFollowing, url, isSelf }) => (
  <Card>
    <EAvater url={url} size={"md"} />
    <ELink to={`/${name}`}>
      <FatText text={name} />
    </ELink>
    {!isSelf && <Button text={isFollowing ? "Unfollow" : "Follow"} />}
  </Card>
);

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  isSelf: PropTypes.bool.isRequired,
};

export default UserCard;
