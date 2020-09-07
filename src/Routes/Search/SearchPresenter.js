import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FatText from "../../Components/FatText";

const Wrapper = styled.div`
  height: 50vh;
  text-align: center;
`;

const SearchPresenter = ({ searchTerm, loading, data }) => (
  <Wrapper>
    {searchTerm === undefined && (
      <FatText text="검색할 단어가 존재하지 않습니다." />
    )}
  </Wrapper>
);

SearchPresenter.propTypes = {
  searchTerm: PropTypes.string,
  loading: PropTypes.bool,
  data: PropTypes.string,
};

export default SearchPresenter;
