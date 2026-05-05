import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { fetchBlogs } from './lib/api';
import type { Blog } from './types/blog';
import BlogListPage from './pages/BlogListPage';
import BlogDetailsPage from './pages/BlogDetailsPage';
import BlogCreatePage from './pages/BlogCreatePage';
import RegisterPage from './pages/RegisterPage';

type Route =
  | { name: 'home' }
  | { name: 'blogs' }
  | { name: 'blogDetails'; id: string }
  | { name: 'createBlog' }
  | { name: 'register' };

function parseHashRoute(hash: string): Route {
  const raw = (hash || '').replace(/^#/, '');
  const path = raw.replace(/^\//, '');

  if (!path) return { name: 'home' };

  const [head, ...rest] = path.split('/').filter(Boolean);

  if (head === 'blogs') return { name: 'blogs' };
  if (head === 'blog' && rest[0]) return { name: 'blogDetails', id: rest[0] };
  if (head === 'create') return { name: 'createBlog' };
  if (head === 'register') return { name: 'register' };

  return { name: 'home' };
}

function Header({
  route,
  onNavigate,
}: {
  route: Route;
  onNavigate: (to: string) => void;
}) {
  const items = useMemo(
    () => [
      { label: 'Home', to: '#' },
      { label: 'Blogs', to: '#/blogs' },
      { label: 'Create', to: '#/create' },
      { label: 'Register', to: '#/register' },
    ],
    [],
  );

  const activeKey =
    route.name === 'home'
      ? 'home'
      : route.name === 'blogs'
        ? 'blogs'
        : route.name === 'createBlog'
          ? 'create'
          : route.name === 'register'
            ? 'register'
            : 'home';

  return (
    <header
      style={{
        padding: '16px 0 10px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <nav
        aria-label="Primary"
        style={{
          display: 'flex',
          gap: 10,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {items.map((it) => {
          const key = it.to === '#' ? 'home' : it.to.replace('#/', '');
          const isActive = key === activeKey;
          return (
            <button
              key={it.to}
              type="button"
              className="navBtn"
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onNavigate(it.to)}
              style={{
                borderColor: isActive ? 'var(--accent-border)' : 'transparent',
              }}
            >
              {it.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}

export default function App() {
  const [route, setRoute] = useState<Route>(() =>
    parseHashRoute(window.location.hash),
  );
  const [warmBlogs, setWarmBlogs] = useState<Blog[] | null>(null);
  const [warmError, setWarmError] = useState<string | null>(null);

  useEffect(() => {
    const onHashChange = () => setRoute(parseHashRoute(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    // Light prefetch so Home can show a list quickly.
    fetchBlogs()
      .then((blogs: Blog[]) => setWarmBlogs(blogs))
      .catch((e: unknown) => {
        setWarmError(
          e instanceof Error ? e.message : 'Failed to prefetch blogs',
        );
      });
  }, []);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Header
          route={route}
          onNavigate={(to) => {
            window.location.hash = to;
          }}
        />

        <main style={{ paddingBottom: 30 }}>
          {route.name === 'home' && (
            <BlogListPage
              initialData={warmBlogs ?? undefined}
              initialError={warmError ?? undefined}
            />
          )}
          {route.name === 'blogs' && (
            <BlogListPage initialData={undefined} initialError={undefined} />
          )}
          {route.name === 'blogDetails' && (
            <BlogDetailsPage id={route.id} />
          )}
          {route.name === 'createBlog' && <BlogCreatePage />}
          {route.name === 'register' && <RegisterPage />}
        </main>
      </div>
    </>
  );
}
