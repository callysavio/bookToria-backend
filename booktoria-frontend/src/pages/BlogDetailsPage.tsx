/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';
import { fetchBlogById } from '../lib/api';
import type { Blog } from '../types/blog';

type Props = {
  id: string;
};

export default function BlogDetailsPage({ id }: Props) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    fetchBlogById(id)
      .then((data) => {
        if (!isMounted) return;
        setBlog(data);
      })
      .catch((e) => {
        if (!isMounted) return;
        setError(e instanceof Error ? e.message : 'Failed to load blog details');
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <section style={{ padding: '0 16px', maxWidth: 900, margin: '0 auto', textAlign: 'left' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <button
          type="button"
          onClick={() => {
            window.location.hash = '#/blogs';
          }}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: `1px solid var(--border)`,
            background: 'var(--accent-bg)',
            color: 'var(--text-h)',
            cursor: 'pointer',
          }}
        >
          ← Back
        </button>
      </div>

      {isLoading && <p>Loading...</p>}

      {error && (
        <div
          style={{
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: 12,
            margin: '12px 0',
            color: 'var(--text-h)',
          }}
          role="alert"
        >
          {error}
        </div>
      )}

      {blog && !isLoading && !error && (
        <article
          style={{
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: 16,
            boxShadow: 'var(--shadow)',
            background: 'rgba(255,255,255,0.6)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ fontSize: 13, color: 'var(--text)' }}>
              {blog.category ? String(blog.category) : 'Uncategorized'}
            </div>
            {blog.isPublished === false && (
              <div style={{ fontSize: 13, color: 'var(--accent)' }}>Draft</div>
            )}
          </div>

          <h2 style={{ marginTop: 10, marginBottom: 6, fontSize: 28 }}>{blog.title}</h2>
          <div style={{ color: 'var(--text)', fontSize: 14, marginBottom: 12 }}>
            {blog.createdAt ? `Published/Created: ${new Date(blog.createdAt).toLocaleString()}` : null}
          </div>

          {blog.image && (
            <img
              src={blog.image}
              alt={blog.title}
              style={{
                width: '100%',
                maxHeight: 360,
                objectFit: 'cover',
                borderRadius: 10,
                border: '1px solid var(--border)',
                marginBottom: 14,
              }}
            />
          )}

          <div
            style={{
              whiteSpace: 'pre-wrap',
              lineHeight: 1.7,
              fontSize: 16,
              color: 'var(--text-h)',
            }}
          >
            {blog.content}
          </div>
        </article>
      )}
    </section>
  );
}
