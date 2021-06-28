import { mount } from 'enzyme';
import PhotoCard from '../components/PhotoCard';

const props = {
    description: { _content: "" },
    farm: 66,
    height_s: 180,
    id: "51276665469",
    isfamily: 0,
    isfriend: 0,
    ispublic: 1,
    owner: "192747352@N02",
    ownername: "ibindaschmid",
    secret: "bcf6381fea",
    server: "65535",
    tags: "wasser water meer see rinnsal sea teich lake eau agua вода 水 aqua natur nature natures fountain springbrunnen baum bäume wald tree forest wood ast äste schwammerl",
    title: "1 (35)...austria djungle",
    url_s: "https://live.staticflickr.com/65535/51276665469_bcf6381fea_m.jpg",
    width_s: 240
  };

describe('Feed Component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<PhotoCard photo={props} />);
    });

    it('feed has an image', () => {
        expect(wrapper.find(`[src="${props.url_s}"]`)).toHaveLength(1);
    });

    it("feed provides a link to the image", () => {
        expect(wrapper.find(`[href="https://www.flickr.com/photos/${props.owner}/${props.id}/"]`)).toHaveLength(1);
    });

    it("feed shows author name", () => {
        expect(wrapper.text().indexOf(props.ownername)).not.toBe(-1);
    });

    it("feed provides a link to the authors page", () => {
        expect(wrapper.find(`[href="https://www.flickr.com/photos/${props.owner}"]`)).toHaveLength(1);
    });

    it("feed shows a title", () => {
        expect(wrapper.text().indexOf(props.title)).not.toBe(-1);
    });

    it("feed shows a description", () => {
        expect(wrapper.text().indexOf(props.description._content)).not.toBe(-1);
    });
});
