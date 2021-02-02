import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StayEntryContainer = styled.div`
  cursor: pointer;
  display: inline-flex;
  flex-wrap: wrap;
  width: 100%;
  height 26%;
  padding: 12px;
  text-align: center;
  border-radius: 4px;
  &:hover {
    background: rgb(247, 247, 247);
  }
`;

const StayEntryButton = styled.button`
  cursor: pointer;
  position: relative;
  touch-action: manipulation;
  border-radius: 0px;
  outline: none;
  background: transparent;
  height: 64px;
  width 64px;
  border: none;
  display: block;
  text-align: center;
  padding: 0;
`;

const StayImageContainer = styled.div`
  position: relative;
  display: flex;
  width: 64px;
  height 64px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background: transparent;
`;

const Img = styled.img`
  position: relative;
  object-fit: cover;
  width: inherit;
  height: inherit;
  border-radius: 4px;
`;

const StayEntryInfoContainer = styled.div`
  position: relative;
  display: inline-block;
  height: auto;
  width: 80%;
  text-align: left;
  margin-left: 16px;

`;
const StayEntryType = styled.div`
  position: relative;
  display: block;
  margin-bottom: 4px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 600px;
  color: rgb(113, 113, 113);
  box-sizing: border-box;
  height: 16px;
  width: 60%;
  text-align: left;
`;

const StayEntryName = styled.div`
  position: relative;
  display: block;
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
  color: rgb(34, 34, 34);
  margin-bottom: 4px;
  height: 20px;
  width: 50%;
  box-sizing: border-box;
`;

const StayEntryAmount = styled.div`
  position: relative;
  display: block;
  box-sizing: border-box;
  height 18px;
  width: 50%;
`;

class StayListEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 1,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { toggleLiked, hideModal } = this.props;
    const { count } = this.state;
    this.setState({
      count: count + 1,
    });
    toggleLiked();
    hideModal();
  }

  render() {
    const { stay } = this.props;
    const { stayPic, stayName } = stay;
    const { count } = this.state;
    return (
      <StayEntryContainer onClick={this.handleClick}>
        <StayEntryButton
          aria-label="center"
        >
          <StayImageContainer>
            <Img
              src={stayPic}
              alt="Stay list image"
              height="35px"
              width="35px"
            />
          </StayImageContainer>
        </StayEntryButton>
        <StayEntryInfoContainer>
          <StayEntryType>
            Any time
          </StayEntryType>
          <StayEntryName>
            {stayName}
          </StayEntryName>
          <StayEntryAmount>
            {count === 1 ? `${count} stay` : `${count} stays`}
          </StayEntryAmount>
        </StayEntryInfoContainer>
      </StayEntryContainer>
    );
  }
}

export default StayListEntry;

StayListEntry.propTypes = {
  toggleLiked: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  stay: PropTypes.shape({
    stayName: PropTypes.string.isRequired,
    stayPic: PropTypes.string.isRequired,
  }).isRequired,

};
