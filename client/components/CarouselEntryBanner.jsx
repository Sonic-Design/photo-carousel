import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 20%;
  padding: 8px;
`;

const SuperHostContainer = styled.div`
  height: 57%;
  width: 33%;
  position: absolute;
  z-index: 2;
`;
const SuperHost = styled.div`
  font-size: 11px;
  font-weight: bold;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.95);
  color: rgb(34, 34, 34);
  line-height: 20px;
  justify-content: center;
  background-color: white;
  border-radius: 3px;
  display: inline-flex;
  width: 100%;
  height 100%;
  box-shadow: transparent 0px 0px 0px 1px, transparent 0px 0px 0px 4px, rgba(0, 0, 0, 0.18) 0px 2px 4px;
`;

const IsLikedContainer = styled.div`
  position: relative;
  display: inline-flex;
  z-index: 2;
  height: 34px;
  width: 32px;
  right: -221px;
  top: -7px;
`;

const IsLikedButton = styled.button`
  cursor: pointer;
  position: relative;
  touch-action: manipulation;
  border-radius: 0px;
  outline: none;
  background: transparent;
  height: 100%;
  width 100%;
  border: none;
  display: block;
  &:active {
    transform: scale(0.92);
  }
`;

const IsLikedSVG = styled.svg`
  display: block;
  fill: ${(props) => (props.isClicked ? 'rgb(255, 56, 92)' : 'rgba(0, 0, 0, 0.5)')};
  height: 24px;
  width: 24px;
  stroke:
  rgb(255, 255, 255);
  stroke-width: 2;
  overflow: visible;
`;

const CarouselEntryBanner = (props) => {
  const { isSuperHost, handleClick, liked } = props;
  return (
    <Wrapper>
      {isSuperHost ? (
        <SuperHostContainer>
          <SuperHost>SUPERHOST</SuperHost>
        </SuperHostContainer>
      ) : ''}
      <IsLikedContainer>
        <IsLikedButton
          onClick={handleClick}
          aria-label="Right Align"
        >
          <IsLikedSVG
            isClicked={liked}
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
            focusable="false"
          >
            <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z" />
          </IsLikedSVG>
        </IsLikedButton>
      </IsLikedContainer>
    </Wrapper>
  );
};

export default CarouselEntryBanner;

CarouselEntryBanner.propTypes = {
  isSuperHost: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  liked: PropTypes.bool.isRequired,
};
