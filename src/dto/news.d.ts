export interface INewsDTO {
  title: string;
  content: string;
  author_id: string;
}

export interface IUpdateNewsDTO extends Omit<INewsDTO, "author_id"> {
  id: string;
}
