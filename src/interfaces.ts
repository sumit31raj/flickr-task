export interface Photo {
  description: Description;
  id: string;
  owner: Owner;
  height_s: number;
  width_s: number;
  url_s: string;
  title: string;
  ownername: string;
  tags: string;
}

interface Owner {
  path_alias: string;
  username: string;
}

interface Description {
  _content: string;
}
