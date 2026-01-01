import { z } from 'zod';

export const formBlogSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  description: z.string().min(10, 'Description is required'),
  authorName: z.string().min(2, 'Author name is required'),
  imageLink: z.string().url('Valid image URL required'),
  categories: z
    .array(z.string())
    .min(1, 'At least one category required')
    .max(3, 'Maximum 3 categories'),
  isFeaturedPost: z.boolean().optional(),
});

export type TFormBlogSchema = z.infer<typeof formBlogSchema>;
