import {
  configure, mount, render,
} from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import App from '../client/components/App';
import Banner from '../client/components/Banner';
import Carousel from '../client/components/Carousel';

configure({ adapter: new Adapter() });

describe('<App />', () => {
  const DATA_ID = 5;
  const component = mount(<App id={DATA_ID} />);

  it('should exist', () => {
    expect(component).toBeDefined();
  });

  it('should render Banner', () => {
    expect(component.contains(<Banner />)).toBe(false);
  });

  it('should render Carousel', () => {
    expect(component.contains(<Carousel />)).toBe(false);
  });
});

describe('<Banner />', () => {
  it('should render the Banner element', () => {
    const component = render(<Banner />);

    expect(component).toBeDefined();
  });
});

describe('<Carousel />', () => {
  it('should render the carousel element', () => {
    const data = [{
      imgId: 1,
      imgUrl: 'https://fec-photos-storage.s3-us-west-1.amazonaws.com/3/12.jpg',
      imgName: 'Rubye.Nolan73',
      imgDescription: 'Legacy',
      HouseType: 'illum',
      description: 'Shores',
      isSuperHost: false,
      isLiked: false,
      AverageRating: 2.34,
      NumberOfBeds: 3,
      PricePerNight: 316,
    },
    ];

    const component = render(<Carousel gallery={data} />);

    expect(component).toBeDefined();
  });
});
