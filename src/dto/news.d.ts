export interface INewsDTO {
  title: string;
  content: string;
  author_id: string;
  image_url?: string;
}

export interface IUpdateNewsDTO extends Omit<INewsDTO, "author_id"> {
  id: string;
}
