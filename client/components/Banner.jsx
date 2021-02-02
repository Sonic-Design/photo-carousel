import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CarBannerWrapper = styled.div`
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif;
  position: relative;
  top: 15px;
  width: 1128px;
  height: 56px;
  margin-left: 1%;
`;

const CarHeaderText = styled.div`
  font-weight: 600;
  font-size: 22px;
  color: #222222;
  line-height: 26px;
  display: flex;
  padding-top: 17px;
  position: relative;
  float: left;
  width: 220px;
  height: auto:
  right: 20px;
`;

const CarPageIndicator = styled.div`
  font-size: 14px;
  position: relative;
  padding-top: 20px;
  padding-bottom: 20px;
  width: 32px;
  height: auto;
  float: right;
  up: -20px;
  left: -20px;
  `;

const CarPageScrollButton = styled.button`
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.08) !important;
  border-color: rgba( 255, 255, 255, 0.9);
  border-radius: 50%;
  box-shadow: transparent 0px 0px 0px 1px, transparent 0px 0px 0px 4px, rgba(0, 0, 0, 0.18) 0px 2px 4px;
  cursor: pointer;
  padding: 10px;
  margin 10px;
  display: inline-flex;
  float: right;
  line-height: normal;
  height: 32px;
  width: 32px;
  outline: none;
  &:hover {
    border-color: rgba(0, 0, 0, 0.08);
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    box-shadow: transparent 0px 0px 0px 1px, transparent 0px 0px 0px 4px, rgba(0, 0, 0, 0.12) 0px 6px 16px;
    transform: scale(1.04);
  };
  &:active {
    border-color: rgba(0, 0, 0, 0.08);
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0) !important;
    transform: scale(1);
    box-shadow: none;
  };
`;

const CarLeftButtonSVG = styled.svg`
  height: 10px;
  width: 10px;
  display: block;
  fill: currentcolor;
`;

const CarRightButtonSVG = styled.svg`
  height: 10px;
  width: 10px;
  display: block;
  fill: currentcolor;
`;
class Banner extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(translate) {
    const { direction } = this.props;
    direction(translate);
  }

  render() {
    const { page, maxPage } = this.props;
    return (
      <CarBannerWrapper>
        <CarHeaderText>More places to stay</CarHeaderText>
        <CarPageScrollButton
          onClick={() => this.handleClick('right')}
          aria-label="Previous"
        >
          <CarRightButtonSVG viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false">
            <path
              d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z"
              fillRule="evenodd"
            />
          </CarRightButtonSVG>
        </CarPageScrollButton>
        <CarPageScrollButton
          onClick={() => this.handleClick('left')}
          aria-label="Next"
        >
          <CarLeftButtonSVG viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false">
            <path
              d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z"
              fillRule="evenodd"
            />
          </CarLeftButtonSVG>
        </CarPageScrollButton>
        <CarPageIndicator>{`${page} / ${maxPage}`}</CarPageIndicator>
      </CarBannerWrapper>
    );
  }
}

export default Banner;

Banner.propTypes = {
  direction: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  maxPage: PropTypes.number.isRequired,
};
