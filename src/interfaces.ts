export interface Photo {
  id: string;
  owner: string;
}

export interface Tag {
  id: string;
  author: string;
  authorname: string;
}

interface Description {
  _content: string;
}

interface Title {
  _content: string;
}

interface PhotoURL {
  type: string;
  _content: string;
}

export interface PhotoDetail extends Photo {
  description: Description;
  tags: Tag[];
  urls: PhotoURL[];
  title: Title;
}