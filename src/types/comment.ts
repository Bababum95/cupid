export type CommentType = {
  _id: string;
  name: string;
  message: string;
  rating: number;
  verified: boolean;
  createdAt: string;
  photos?: string[];
};

export type GetCommentsResponse = {
  comments: CommentType[];
  total: number;
};

export type Rating = {
  [key: number]: number;
  total: number;
};

export type GetCommentsParams = {
  pageId?: string;
  offset?: string;
};
