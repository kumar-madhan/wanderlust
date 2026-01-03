export type Post = {
  _id: string;
  authorName: string;
  title: string;
  imageLink: string;
  description: string;
  categories: string[];
  featuredPost: boolean;
  timeOfPost: string;
};

export default Post;