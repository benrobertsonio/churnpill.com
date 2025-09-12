import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    author: z.string(),
    tags: z.array(z.string()),
    readTime: z.string().optional(),
    featured: z.boolean().optional(),
  }),
});

const authors = defineCollection({
  schema: z.object({
    name: z.string(),
    bio: z.string(),
    longBio: z.string().optional(),
    avatar: z.string().optional(),
    title: z.string().optional(),
    company: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    website: z.string().optional(),
    location: z.string().optional(),
    expertise: z.array(z.string()).optional(),
    joinDate: z.coerce.date().optional(),
    featured: z.boolean().optional(),
  }),
});

export const collections = { blog, authors };
