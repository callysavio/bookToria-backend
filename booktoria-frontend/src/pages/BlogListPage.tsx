/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from 'react';
import { fetchBlogs } from '../lib/api';
import type { Blog } from '../types/blog';

type Props = {
  initialData?: Blog[];
  initialError?: string;
};

export default function BlogListPage({ initialData, initialError }: Props) {
  const [blogs, setBlogs] = useState<Blog[] | null>(initialData ?? null);
  const [error, setError] = useState<string | null>(initialError ?? null);
  const [isLoading, setIsLoading] = useState<boolean>(!initialData);

  // If we receive initialData (prefetched), sync our internal state.
  useEffect(() => {
    if (!initialData) return;

    setBlogs(initialData);
    setError(initialError ?? null);
    setIsLoading(false);
  }, [initialData, initialError]);

  useEffect(() => {
    // If initialData exists, we don't need to fetch.
    if (initialData) return;

    let isMounted = true;
    setIsLoading(true);
    setError(null);

    fetchBlogs()
      .then((data) => {
        if (!isMounted) return;
        setBlogs(data);
      })
      .catch((e) => {
        if (!isMounted) return;
        setError(e instanceof Error ? e.message : 'Failed to load blogs');
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [initialData]);

  const sorted = useMemo(() => blogs ?? [], [blogs]);

  return (
    <section
      style={{
        padding: '0 16px',
        maxWidth: 900,
        margin: '0 auto',
        textAlign: 'left',
      }}
    >
      <h2 style={{ marginTop: 0 }}>Blogs</h2>

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

      {!isLoading && !error && sorted.length === 0 && <p>No blogs yet.</p>}

      {!isLoading && !error && sorted.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 14,
            marginTop: 14,
          }}
        >
          {sorted.map((b) => (
            <article
              key={b._id}
              style={{
                border: '1px solid var(--border)',
                borderRadius: 10,
                padding: 14,
                boxShadow: 'var(--shadow)',
                background: 'rgba(255,255,255,0.6)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 12, color: 'var(--text)' }}>
                  {b.category ? String(b.category) : 'Uncategorized'}
                </div>
                {b.isPublished === false && (
                  <div style={{ fontSize: 12, color: 'var(--accent)' }}>
                    Draft
                  </div>
                )}
              </div>

              <h3 style={{ margin: '10px 0 8px', fontSize: 20 }}>
                <button
                  type="button"
                  onClick={() => {
                    window.location.hash = `#/blog/${encodeURIComponent(
                      b._id,
                    )}`;
                  }}
                  style={{
                    all: 'unset',
                    cursor: 'pointer',
                    color: 'var(--text-h)',
                    fontWeight: 500,
                    lineHeight: 1.2,
                  }}
                >
                  {b.title}
                </button>
              </h3>

              <p style={{ marginTop: 6, color: 'var(--text)', fontSize: 14 }}>
                {b.content
                  ? `${b.content.slice(0, 140)}${b.content.length > 140 ? '…' : ''}`
                  : ''}
              </p>

              <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                <button
                  type="button"
                  onClick={() => {
                    window.location.hash = `#/blog/${encodeURIComponent(
                      b._id,
                    )}`;
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
                  Read
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
