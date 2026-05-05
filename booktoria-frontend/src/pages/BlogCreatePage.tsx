import { useMemo, useState } from 'react';
import { createBlog } from '../lib/api';
import type { CreateBlogInput } from '../lib/api';

const allowedCategories = [
  'general',
  'food',
  'travel',
  'technology',
  'lifestyle',
] as const;

type AllowedCategory = (typeof allowedCategories)[number];

function normalizeTags(tagsText: string): string[] {
  return tagsText
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

export default function BlogCreatePage() {
  const [form, setForm] = useState<CreateBlogInput>({
    title: '',
    slug: '',
    content: '',
    image: '',
    category: 'general',
    tags: [],
    isPublished: true,
    userId: '',
  });

  const [tagsText, setTagsText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(() => {
    return Boolean(
      form.title.trim() &&
        form.slug.trim() &&
        form.content.trim() &&
        form.category.trim(),
    );
  }, [form]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!canSubmit) {
      setError('Please fill title, slug, content, and category.');
      return;
    }

    setIsSubmitting(true);
    try {
      const input: CreateBlogInput = {
        ...form,
        image: form.image?.trim() ? form.image.trim() : undefined,
        slug: form.slug.trim().toLowerCase(),
        category: form.category as AllowedCategory,
        tags: normalizeTags(tagsText),
        userId: form.userId?.trim() ? form.userId.trim() : undefined,
      };

      const created = await createBlog(input);
      setSuccessMsg('Blog created successfully. Redirecting…');

      // Backend slug is normalized, but we navigate by returned id.
      window.location.hash = `#/blog/${encodeURIComponent(created._id)}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create blog');
    } finally {
      setIsSubmitting(false);
    }
  }

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

      <h2 style={{ marginTop: 0, marginBottom: 8 }}>Create Blog</h2>

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

      {successMsg && (
        <div
          style={{
            border: '1px solid rgba(16,185,129,0.3)',
            borderRadius: 8,
            padding: 12,
            margin: '12px 0',
            color: 'var(--text-h)',
            background: 'rgba(16,185,129,0.08)',
          }}
          role="status"
        >
          {successMsg}
        </div>
      )}

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        <label style={{ display: 'grid', gap: 6 }}>
          Title
          <input
            value={form.title}
            onChange={(ev) => setForm((p) => ({ ...p, title: ev.target.value }))}
            required
            style={inputStyle}
            placeholder="e.g. My first article"
          />
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          Slug
          <input
            value={form.slug}
            onChange={(ev) => setForm((p) => ({ ...p, slug: ev.target.value }))}
            required
            style={inputStyle}
            placeholder="e.g. my-first-article"
          />
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          Category
          <select
            value={form.category}
            onChange={(ev) =>
              setForm((p) => ({ ...p, category: ev.target.value }))
            }
            required
            style={inputStyle}
          >
            {allowedCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          Tags (comma separated)
          <input
            value={tagsText}
            onChange={(ev) => setTagsText(ev.target.value)}
            style={inputStyle}
            placeholder="e.g. react, javascript"
          />
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          Image URL (optional)
          <input
            value={form.image ?? ''}
            onChange={(ev) =>
              setForm((p) => ({ ...p, image: ev.target.value }))
            }
            style={inputStyle}
            placeholder="https://..."
          />
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          UserId (optional)
          <input
            value={form.userId ?? ''}
            onChange={(ev) =>
              setForm((p) => ({ ...p, userId: ev.target.value }))
            }
            style={inputStyle}
            placeholder="Mongo ObjectId"
          />
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <input
            type="checkbox"
            checked={Boolean(form.isPublished)}
            onChange={(ev) =>
              setForm((p) => ({ ...p, isPublished: ev.target.checked }))
            }
          />
          Publish immediately
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          Content
          <textarea
            value={form.content}
            onChange={(ev) =>
              setForm((p) => ({ ...p, content: ev.target.value }))
            }
            required
            style={{ ...inputStyle, minHeight: 160, resize: 'vertical' }}
            placeholder="Write your article content..."
          />
        </label>

        <button
          type="submit"
          disabled={!canSubmit || isSubmitting}
          style={{
            ...primaryButtonStyle,
            opacity: !canSubmit || isSubmitting ? 0.6 : 1,
            cursor: !canSubmit || isSubmitting ? 'not-allowed' : 'pointer',
          }}
        >
          {isSubmitting ? 'Creating…' : 'Create Blog'}
        </button>
      </form>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  border: '1px solid var(--border)',
  borderRadius: 8,
  padding: '10px 12px',
  background: 'rgba(255,255,255,0.6)',
  color: 'var(--text-h)',
  outline: 'none',
};

const primaryButtonStyle: React.CSSProperties = {
  padding: '10px 14px',
  borderRadius: 10,
  border: `1px solid transparent`,
  background: 'var(--accent-bg)',
  color: 'var(--text-h)',
  fontWeight: 600,
};
