import { shallow } from 'enzyme';
import CardContainer from '../components/CardContainer/index';

describe('FeedContainer Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CardContainer searchText="" />);
  });

  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <InfiniteScrollComponent />', () => {
    expect(wrapper.find('InfiniteScroll')).toHaveLength(1);
  });
});
