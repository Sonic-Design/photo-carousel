import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import StayListEntry from './StayListEntry';

const modalRoot = document.getElementById('img_carousel');

const BackDrop = styled.div`
  font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
  display: flex;
  justify-content: center;
  background-color: rgba(0,0,0,0.7);
  position: fixed;
  z-index: 5;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  align-items: center;
`;

const ModalContainer = styled.div`
background: rgb(255, 255, 255);
display: flex;
flex-wrap: nowrap;
flex-direction: column;
position: fixed;
top: 50vh;
left: 50vw;
transform: translate(-50%, -50%);
overflow-y: hidden;
z-index: 6;
width: 39.4%;
height: 63.6%;
max-width: 568px;
max-height: 456px;
box-shadow: rgba(0, 0, 0, 0.28) 0px 8px 28px ;
border-radius: 12px;
animation-duration: 400ms;
animation-iteration-count: 1;
animation-fill-mode: both;
animation-name: keyframe_d37zz3;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 60px;
  border-bottom-style: solid;
  border-bottom-width: thin;
  border-bottom-color: #ebebeb;
`;

const StayListContainer = styled.div`
  position: relative;
  display: inline-block;
  flex-direction: column;
  width: 100%;
  height: 330px;
  overflowY: hidden;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 12px;
  overflow-y: auto;
`;

const NewStayButton = styled.button`
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
  text-align: center;
  padding: 0px;
`;

const CreateStayContainer = styled.div`
  display: inline-block;
  width: 100%;
  height 26%;
  padding: 12px;
  border-radius: 4px;
  &:hover {
    background: rgb(247, 247, 247);
  }
`;
const HeaderText = styled.div`
  position: relative;
  font-size: 16px;
  font-weight: bold;
  line-height: 20px;
  width: 400px;
  height: 20px;
  padding: 20px;
  padding-left: 183px;
  box-sizing: border-box;
`;

const HideButton = styled.button`
  position: relative;
  background: ${(props) => (props.isHovered ? '#f7f7f7' : 'transparent')};
  display: inline-block;
  margin-top: 13px;
  margin-left: 15px;
  border-radius: 50%;
  height: 32px;
  width: 32px;
  outline: none;
  border: none;
  cursor: pointer;
  &:hover {
    background: rgb(247, 247, 247);
  }
`;

const Xsymbol = styled.svg`
  padding: 0px;
  margin: 0px;
  display: block;
  height: 16px;
  width: 16px;
  stroke: currentcolor;
  stroke-width: 3;
  overflow: visible;
`;

const PlusSymbol = styled.svg`
  display: block;
  height: 32px;
  width: 32px;
  fill: rgb(255, 255, 255);
`;

const PlusSymbolContainer = styled.div`
  display: flex;
  width: 64px;
  height 64px;
  align-items: center;
  justify-content: center;
  background: rgb(34, 34, 34);
  border-radius: 4px;
`;

const CreateNewListText = styled.div`
  position: absolute;
  top: 27px;
  left: 17%;
  display: inline-block;
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  color: rgb(34, 34, 34);
  margin-bottom: 4px;
  border-radius: 8px;
`;

class StayModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    const { HideModal, stayList, toggleLiked } = this.props;
    return ReactDOM.createPortal(
      <>
        <BackDrop onClick={HideModal}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <Header>
              <HideButton
                onClick={HideModal}
                aria-label="Hide Stay list"
              >
                <Xsymbol
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  path="m6 6 20 20"
                >
                  <path d="m8 6 20 20" />
                  <path d="m28 6-20 20" />
                </Xsymbol>
              </HideButton>
              <HeaderText>Save to a list</HeaderText>
            </Header>
            <StayListContainer>
              <CreateStayContainer>
                <NewStayButton aria-label="Create New Stay">
                  <PlusSymbolContainer>
                    <PlusSymbol>
                      <path d="M28,17H17V28H15V17H4V15H15V4h2V15H28Z" />
                    </PlusSymbol>
                  </PlusSymbolContainer>
                  <CreateNewListText>
                    Create a new list
                  </CreateNewListText>
                </NewStayButton>
              </CreateStayContainer>
              {stayList.map((stay) => (
                <StayListEntry
                  hideModal={HideModal}
                  toggleLiked={toggleLiked}
                  key={stay.stayId}
                  stay={stay}
                />
              ))}
            </StayListContainer>
          </ModalContainer>
        </BackDrop>
      </>,
      this.el,
    );
  }
}

export default StayModal;

StayModal.propTypes = {
  HideModal: PropTypes.func.isRequired,
  stayList: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleLiked: PropTypes.func.isRequired,
};
