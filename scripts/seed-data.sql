-- Seed data for StackIt platform

-- Insert demo users
INSERT INTO users (username, email, password_hash, reputation, bio, location) VALUES
('demo_user', 'demo@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1234, 'Full-stack developer passionate about modern web technologies.', 'San Francisco, CA'),
('admin_user', 'admin@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 5678, 'Platform administrator and senior developer.', 'New York, NY'),
('john_dev', 'john@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2345, 'React and Next.js enthusiast.', 'Austin, TX'),
('sarah_codes', 'sarah@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 3456, 'Backend developer specializing in Node.js and databases.', 'Seattle, WA'),
('db_expert', 'expert@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 4567, 'Database optimization specialist.', 'Chicago, IL');

-- Insert popular tags
INSERT INTO tags (name, description, color, usage_count) VALUES
('javascript', 'Questions about JavaScript programming language', '#F7DF1E', 150),
('react', 'Questions about React.js library', '#61DAFB', 120),
('nextjs', 'Questions about Next.js framework', '#000000', 80),
('typescript', 'Questions about TypeScript', '#3178C6', 90),
('nodejs', 'Questions about Node.js runtime', '#339933', 70),
('python', 'Questions about Python programming', '#3776AB', 100),
('postgresql', 'Questions about PostgreSQL database', '#336791', 60),
('mongodb', 'Questions about MongoDB database', '#47A248', 50),
('authentication', 'Questions about user authentication', '#FF6B6B', 40),
('api', 'Questions about API development', '#4ECDC4', 85),
('css', 'Questions about CSS styling', '#1572B6', 75),
('html', 'Questions about HTML markup', '#E34F26', 65);

-- Insert sample questions
INSERT INTO questions (title, content, author_id, votes, views, difficulty) VALUES
(
    'How to implement authentication in Next.js 14 with App Router?',
    '<p>I''m trying to implement authentication in my Next.js 14 application using the new App Router. I''ve been looking at various approaches but I''m confused about the best practices.</p><p>Here''s what I''ve tried so far:</p><pre><code>// middleware.ts
import { NextResponse } from ''next/server''
import type { NextRequest } from ''next/server''

export function middleware(request: NextRequest) {
  // Check for auth token
  const token = request.cookies.get(''auth-token'')
  
  if (!token) {
    return NextResponse.redirect(new URL(''/login'', request.url))
  }
}</code></pre><p>But I''m not sure if this is the right approach. What are the current best practices for JWT token storage and validation?</p>',
    3, 15, 234, 'intermediate'
),
(
    'Best practices for React state management in 2024',
    '<p>With so many state management solutions available (Redux, Zustand, Jotai, etc.), what are the current best practices for managing state in React applications?</p><p>I''m particularly interested in:</p><ul><li>When to use local vs global state</li><li>Performance considerations</li><li>TypeScript integration</li><li>Testing strategies</li></ul>',
    4, 28, 456, 'advanced'
),
(
    'How to optimize database queries in PostgreSQL?',
    '<p>My PostgreSQL queries are running slowly on large datasets. What are some effective strategies for optimizing query performance?</p><p>Current query that''s slow:</p><pre><code>SELECT u.*, COUNT(q.id) as question_count
FROM users u
LEFT JOIN questions q ON u.id = q.author_id
WHERE u.created_at > ''2023-01-01''
GROUP BY u.id
ORDER BY question_count DESC;</code></pre>',
    5, 42, 789, 'advanced'
),
(
    'Understanding TypeScript generics with practical examples',
    '<p>I''m struggling to understand TypeScript generics. Can someone provide practical examples of when and how to use them effectively?</p><p>I''ve read the documentation but I''m looking for real-world use cases that would help me understand the concept better.</p>',
    1, 8, 123, 'beginner'
);

-- Insert question tags relationships
INSERT INTO question_tags (question_id, tag_id) VALUES
(1, 3), (1, 9), (1, 4), -- nextjs, authentication, typescript
(2, 2), (2, 4), -- react, typescript  
(3, 7), (3, 6), -- postgresql, python
(4, 4), (4, 1); -- typescript, javascript

-- Insert sample answers
INSERT INTO answers (content, question_id, author_id, votes, is_accepted) VALUES
(
    '<p>Great question! For Next.js 14 with App Router, I recommend using a combination of server actions and middleware. Here''s a comprehensive approach:</p><h3>1. JWT Token Management</h3><pre><code>// lib/auth.ts
import jwt from ''jsonwebtoken''
import { cookies } from ''next/headers''

export async function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    return decoded
  } catch {
    return null
  }
}

export async function getUser() {
  const cookieStore = cookies()
  const token = cookieStore.get(''auth-token'')?.value
  
  if (!token) return null
  
  return await verifyToken(token)
}</code></pre><p>This approach gives you both server-side protection and good performance.</p>',
    1, 2, 23, true
),
(
    '<p>I''d also recommend looking into NextAuth.js (now Auth.js) for a more complete solution. It handles a lot of the complexity for you and integrates well with the App Router.</p>',
    1, 5, 12, false
),
(
    '<p>For React state management in 2024, here''s my recommended approach:</p><h3>Local State</h3><p>Use useState and useReducer for component-specific state that doesn''t need to be shared.</p><h3>Global State</h3><p>For global state, I recommend Zustand for its simplicity and excellent TypeScript support.</p>',
    2, 3, 18, true
);

-- Insert sample votes
INSERT INTO votes (user_id, votable_type, votable_id, vote_type) VALUES
(1, 'question', 1, 'up'),
(2, 'question', 1, 'up'),
(3, 'question', 2, 'up'),
(4, 'answer', 1, 'up'),
(5, 'answer', 1, 'up');

-- Insert sample bookmarks
INSERT INTO bookmarks (user_id, question_id) VALUES
(1, 1),
(1, 2),
(2, 3);

-- Insert user badges
INSERT INTO user_badges (user_id, badge_name, badge_type) VALUES
(1, 'First Question', 'achievement'),
(2, 'Expert', 'reputation'),
(2, 'Top Contributor', 'activity'),
(3, 'Contributor', 'activity'),
(4, 'Question Asker', 'activity'),
(5, 'Database Expert', 'expertise');

-- Update accepted answer reference
UPDATE questions SET accepted_answer_id = 1 WHERE id = 1;
UPDATE questions SET accepted_answer_id = 3 WHERE id = 2;
UPDATE questions SET is_answered = true WHERE accepted_answer_id IS NOT NULL;
