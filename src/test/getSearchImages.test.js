import { useGetSearchImagesHook } from "../services/flickr/getSearchImages";
import "whatwg-fetch";
import { renderHook } from "@testing-library/react-hooks";
import fetchMock from "fetch-mock";
import { act } from "react-test-renderer";

const photo = [{
  description: { _content: "<a href=\"https://Duncan.co/trees-and-long-shadows\"…er nofollow\">Duncan.co/trees-and-long-shadows</a>" },
  farm: 66,
  height_s: 160,
  id: "51275979046",
  isfamily: 0,
  isfriend: 0,
  ispublic: 1,
  owner: "44124400268@N01",
  ownername: "Duncan Rawlinson - Duncan.co",
  secret: "0d059b3bf4",
  server: "65535",
  tags: "1amkowbj3y2qk2guu7eaklxu1ojzmpwqf5 aerial binghamton dji duncanrawlinson duncanrawlinsonphoto duncanrawlinsonphotography duncanco mavicpro2 newyork photobyduncanrawlinson quadcopter shotwithadjimavicpro2 treesandlongshadowsblackandwhiteaerial treesandlongshadows tripwithsargebinghamtonnewyorkunitedstates us usa unitedstates unitedstatesofamerica abstract bandw blackandwhite drone final forest httpsduncanco httpsduncancotreesandlongshadows minimal nature relaxed trees woods",
  title: "Trees and Long Shadows",
  url_s: "https://live.staticflickr.com/65535/51275979046_0d059b3bf4_m.jpg",
  width_s: 240
},
{
  description: { _content: "" },
  farm: 66,
  height_s: 160,
  id: "51276142178",
  isfamily: 0,
  isfriend: 0,
  ispublic: 1,
  owner: "98230890@N04",
  ownername: "bryce yamashita",
  secret: "8d9197681d",
  server: "65535",
  tags: "d850 florida merritislandnwr nature nikon wildlife yamashita",
  title: "DSC_6823-Edit",
  url_s: "https://live.staticflickr.com/65535/51276142178_8d9197681d_m.jpg",
  width_s: 240
},
{
  description: { _content: "Flowers" },
  farm: 66,
  height_s: 160,
  id: "51276111683",
  isfamily: 0,
  isfriend: 0,
  ispublic: 1,
  owner: "164023044@N04",
  ownername: "martincreates",
  secret: "e75263222a",
  server: "65535",
  tags: "flora flower flowers flowermagic fuji nature natural naturelover garden green graceful group white summer june beauty beautiful botanical bloom border composition concept calm colour creative art artistic photography arrangement mygarden copyright martinmcguire glasgow scotland serene style",
  title: "The Border",
  url_s: "https://live.staticflickr.com/65535/51276111683_e75263222a_m.jpg",
  width_s: 240
},
{
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
}];

describe("useDataApi", () => {
  beforeAll(() => {
    global.fetch = fetch;
  });
  afterAll(() => {
    fetchMock.restore();
  });

  it("should return data with a successful request", async () => {
    const { result } = renderHook(() => useGetSearchImagesHook());
    fetchMock.mock("https://www.flickr.com/services/rest/?api_key=60bf1dd414efdcfc34c742cdc01206dc&format=json&nojsoncallback=true&method=flickr.photos.search&page=1&per_page=10&safe_search=1&tags=animals,nature,weather,attractions,places,design,sealife,football,sports&extras=description,url_s,tags,owner_name", {
      photos: {
        photo
      }
    });
    await act(async () => {
      result.current.fetch(1);
    });

    expect(result.current.photos).toStrictEqual(photo);
  });

  it("should return error as true if api error", async () => {
    const { result } = renderHook(() => useGetSearchImagesHook());

    fetchMock.mock("https://www.flickr.com/services/rest/?api_key=60bf1dd414efdcfc34c742cdc01206dc&format=json&nojsoncallback=true&method=flickr.photos.search&page=1&per_page=10&safe_search=1&tags=animals,nature,weather,attractions,places,design,sealife,football,sports&extras=description,url_s,tags,owner_name", 500, { overwriteRoutes: true });

    await act(async () => {
      result.current.fetch(1);
    });

    expect(result.current.photos).toStrictEqual([]);
    expect(result.current.error).toBe(true);
  });
});
