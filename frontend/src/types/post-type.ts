export interface Post {
  id: string;
  title: string;
  authorName: string;
  description: string;
  imageLink: string;
  categories: string[];
  featuredPost: boolean;
  timeOfPost: string;
}
