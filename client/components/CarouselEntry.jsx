import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import StayModal from './StayModal';
import CarouselEntryBanner from './CarouselEntryBanner';

const StarContainer = styled.span`
  width: 20px;
  height: 20px;
  color: #ff385c;
`;

const ReviewCount = styled.span`
  color: #717175;
`;

const Entry = styled.div`
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif;
  font-size: 16px;
  display: inline-block;
  position: relative;
  alignment: left;
  box-sizing: border-box;
  width: 23.2%;
  height: auto;
  cursor: pointer;
  padding-top: 20px;
  margin: 10px;
  transform: translateX(-${(props) => (props.page - 1) * 1128}px);
  transition: transform 0.3s ease-in;
`;

const ImgContainer = styled.div`
  position: relative;
  display: flex;
  height: 180px;
  width: 270px;
  overflow: hidden;
`;

const Img = styled.img`
  position: relative;
  display: inline-flex;
  border-radius: 8px;
  height: 100%;
  width: 100%;
`;

const StarSVG = styled.svg`
  height: 14px;
  width: 14px;
  fill: currentcolor;
`;
const HouseInfo = styled.div`
  position: relative;
  line-height: 20px;
  padding-top: 10px;
  max-width: 95%;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

class CarouselEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      liked: false,
      showModal: false,
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.toggleLiked = this.toggleLiked.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleNotLiked = this.toggleNotLiked.bind(this);
  }

  handleClick() {
    const { liked } = this.state;
    if (!liked) {
      this.handleShow();
    } else {
      this.toggleNotLiked();
    }
  }

  handleShow() {
    this.setState({ showModal: true });
  }

  handleHide() {
    this.setState({ showModal: false });
  }

  toggleLiked() {
    this.setState({ liked: true });
  }

  toggleNotLiked() {
    this.setState({ liked: false });
  }

  render() {
    const {
      entry,
      page,
      stayList,
    } = this.props;

    const {
      PricePerNight,
      isSuperHost,
      imgUrl,
      AverageRating,
      HouseType,
      NumberOfBeds,
      description,
      NumOfReviews,
    } = entry;

    const { liked, showModal } = this.state;
    return (
      <Entry page={page}>
        <ImgContainer>
          <CarouselEntryBanner
            isSuperHost={isSuperHost}
            handleClick={this.handleClick}
            liked={liked}
          />
          <Img
            src={imgUrl}
            width="256px"
            height="171px"
            alt="House Image"
          />
        </ImgContainer>
        <HouseInfo>
          <div>
            <StarContainer>
              <StarSVG
                viewBox="0 0 1000 1000"
                role="presentation"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M972 380c9 28 2 50-20 67L725 619l87 280c11 39-18 75-54 75-12 0-23-4-33-12L499 790 273 962a58 58 0 0 1-78-12 50 50 0 0 1-8-51l86-278L46 447c-21-17-28-39-19-67 8-24 29-40 52-40h280l87-279c7-23 28-39 52-39 25 0 47 17 54 41l87 277h280c24 0 45 16 53 40z" />
              </StarSVG>
            </StarContainer>
            {` ${AverageRating}`}
            <ReviewCount>
              {` (${NumOfReviews})`}
            </ReviewCount>
          </div>
          <div>
            {`${HouseType} · ${NumberOfBeds} beds`}
          </div>
          <span>{description}</span>
          <div>
            <b>{`$${PricePerNight}`}</b>
            {' '}
            {'/ night '}
          </div>
        </HouseInfo>
        {showModal ? (
          <StayModal
            toggleLiked={this.toggleLiked}
            HideModal={this.handleHide}
            stayList={stayList}
          />
        ) : null}
      </Entry>
    );
  }
}

export default CarouselEntry;

CarouselEntry.propTypes = {
  page: PropTypes.number.isRequired,
  stayList: PropTypes.arrayOf(PropTypes.object).isRequired,
  entry: PropTypes.shape({
    PricePerNight: PropTypes.number.isRequired,
    isSuperHost: PropTypes.bool.isRequired,
    imgUrl: PropTypes.string.isRequired,
    AverageRating: PropTypes.string.isRequired,
    HouseType: PropTypes.string.isRequired,
    NumberOfBeds: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    NumOfReviews: PropTypes.number.isRequired,
  }).isRequired,
};
