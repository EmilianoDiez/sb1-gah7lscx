-- 0002_rls_policies.sql

/*
  # Row-Level Security Policies
*/

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE companions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE entries ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Users can read their own companions
CREATE POLICY "Users can read own companions" ON companions
  FOR SELECT USING (user_id = auth.uid());

-- Users can update their own companions
CREATE POLICY "Users can update own companions" ON companions
  FOR UPDATE USING (user_id = auth.uid());