import type { Blog, BlogId } from '../types/blog';

type ApiSuccess<T> = {
  statusCode: number;
  success: true;
  message: string;
  data: T;
};

type ApiError = {
  statusCode: number;
  success: false;
  message: string;
  error?: string;
};

type ApiResponse<T> = ApiSuccess<T> | ApiError;

async function parseApiResponse<T>(res: Response): Promise<T> {
  const json: ApiResponse<T> = await res.json().catch(() => {
    throw new Error('Invalid JSON from server');
  });

  if ('success' in json && json.success) {
    return json.data;
  }

  const message =
    json && typeof json === 'object' && 'message' in json
      ? json.message
      : 'Request failed';
  throw new Error(message);
}

export async function fetchBlogs(): Promise<Blog[]> {
  const res = await fetch('/blogs/fetch');
  return parseApiResponse<Blog[]>(res);
}

export async function fetchBlogById(id: BlogId): Promise<Blog> {
  const res = await fetch(`/blogs/details/${encodeURIComponent(id)}`);
  return parseApiResponse<Blog>(res);
}

export type CreateBlogInput = {
  title: string;
  slug: string;
  content: string;
  image?: string;
  category: string;
  tags?: string[];
  isPublished?: boolean;
  userId?: string;
};

export async function createBlog(input: CreateBlogInput): Promise<Blog> {
  const res = await fetch('/blogs/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  // backend returns data: { id, title, slug, content, ... } (not always plain Blog shape)
  const data = await parseApiResponse<unknown>(res);

  // Normalize into our Blog interface
  if (
    data &&
    typeof data === 'object' &&
    'id' in data &&
    typeof (data as { id: string }).id === 'string'
  ) {
    const d = data as {
      id: string;
      title: string;
      slug: string;
      content: string;
      image?: string;
      category: string;
      tags?: string[];
      isPublished?: boolean;
      userId?: string;
      createdAt?: string;
      updatedAt?: string;
    };

    const blog: Blog = {
      _id: d.id,
      title: d.title,
      slug: d.slug,
      content: d.content,
      image: d.image,
      category: d.category,
      tags: d.tags,
      isPublished: d.isPublished,
      userId: d.userId,
      createdAt: d.createdAt,
      updatedAt: d.updatedAt,
    };

    return blog;
  }

  throw new Error('Unexpected createBlog response shape');
}

export type RegisterUserInput = {
  username: string;
  email: string;
  password: string;
  role?: string;
};

export type RegisterUserOutput = {
  id: string;
  profilePicture?: string;
  username: string;
  email: string;
  role?: string;
};

export async function registerUser(
  input: RegisterUserInput,
): Promise<RegisterUserOutput> {
  const res = await fetch('/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  return parseApiResponse<RegisterUserOutput>(res);
}
