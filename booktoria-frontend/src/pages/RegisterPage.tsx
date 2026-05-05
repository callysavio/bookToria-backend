import { useMemo, useState } from 'react';
import { registerUser } from '../lib/api';

type Role = 'user' | 'admin';

export default function RegisterPage() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<Role>('user');

  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(() => {
    return Boolean(username.trim() && email.trim() && password.trim());
  }, [username, email, password]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!canSubmit) {
      setError('Please fill username, email, and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      await registerUser({
        username: username.trim(),
        email: email.trim(),
        password,
        role,
      });

      setSuccessMsg('Registration successful. Redirecting to blogs…');
      window.location.hash = '#/blogs';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      style={{
        padding: '0 16px',
        maxWidth: 900,
        margin: '0 auto',
        textAlign: 'left',
      }}
    >
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

      <h2 style={{ marginTop: 0, marginBottom: 8 }}>Register</h2>

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
          Username
          <input
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
            required
            style={inputStyle}
            placeholder="e.g. Gabriel"
          />
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          Email
          <input
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            required
            style={inputStyle}
            placeholder="e.g. you@example.com"
          />
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          Password
          <input
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            required
            type="password"
            style={inputStyle}
            placeholder="••••••••"
          />
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          Role (optional)
          <select
            value={role}
            onChange={(ev) => setRole(ev.target.value as Role)}
            style={inputStyle}
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
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
          {isSubmitting ? 'Registering…' : 'Register'}
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
