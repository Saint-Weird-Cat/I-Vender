-- init schema for I-Vendor
CREATE TABLE IF NOT EXISTS institutions (id SERIAL PRIMARY KEY, name TEXT NOT NULL, address TEXT, created_at TIMESTAMP DEFAULT now());

CREATE TABLE IF NOT EXISTS departments (id SERIAL PRIMARY KEY, name TEXT NOT NULL, institution_id INT REFERENCES institutions(id), created_at TIMESTAMP DEFAULT now());

CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name TEXT, email TEXT UNIQUE, password TEXT, role TEXT, department_id INT REFERENCES departments(id), created_at TIMESTAMP DEFAULT now());

CREATE TABLE IF NOT EXISTS idea_sources (id SERIAL PRIMARY KEY, name TEXT, type TEXT, details JSONB, created_at TIMESTAMP DEFAULT now());

CREATE TABLE IF NOT EXISTS ideas (id SERIAL PRIMARY KEY, title TEXT, description TEXT, department TEXT, source_id INT REFERENCES idea_sources(id), cost_estimate NUMERIC, tools JSONB, components JSONB, skills TEXT[], timeline TEXT, difficulty TEXT, model_links TEXT[], research_links TEXT[], mentor_ids INT[], material_availability JSONB, tags TEXT[], created_at TIMESTAMP DEFAULT now());

CREATE TABLE IF NOT EXISTS project_instances (id SERIAL PRIMARY KEY, idea_id INT REFERENCES ideas(id), owner_id INT REFERENCES users(id), status TEXT, started_at TIMESTAMP, created_at TIMESTAMP DEFAULT now());

CREATE TABLE IF NOT EXISTS milestones (id SERIAL PRIMARY KEY, project_id INT REFERENCES project_instances(id), title TEXT, description TEXT, due_date TIMESTAMP, completed BOOLEAN DEFAULT false, points INT DEFAULT 0, created_at TIMESTAMP DEFAULT now());

CREATE TABLE IF NOT EXISTS mentors (id SERIAL PRIMARY KEY, user_id INT REFERENCES users(id), bio TEXT, skills TEXT[], hourly_rate NUMERIC, created_at TIMESTAMP DEFAULT now());

CREATE TABLE IF NOT EXISTS mentor_sessions (id SERIAL PRIMARY KEY, mentor_id INT REFERENCES mentors(id), student_id INT REFERENCES users(id), start_time TIMESTAMP, end_time TIMESTAMP, status TEXT, notes TEXT, price NUMERIC, created_at TIMESTAMP DEFAULT now());

CREATE TABLE IF NOT EXISTS material_vendors (id SERIAL PRIMARY KEY, name TEXT, contact JSONB, address TEXT, created_at TIMESTAMP DEFAULT now());

CREATE TABLE IF NOT EXISTS materials (id SERIAL PRIMARY KEY, vendor_id INT REFERENCES material_vendors(id), name TEXT, description TEXT, price NUMERIC, stock INT DEFAULT 0, tags TEXT[], created_at TIMESTAMP DEFAULT now());

CREATE TABLE IF NOT EXISTS material_orders (id SERIAL PRIMARY KEY, vendor_id INT REFERENCES material_vendors(id), buyer_id INT REFERENCES users(id), items JSONB, total NUMERIC, status TEXT, created_at TIMESTAMP DEFAULT now());

CREATE TABLE IF NOT EXISTS commissions (id SERIAL PRIMARY KEY, vendor_id INT REFERENCES material_vendors(id), rate NUMERIC, admin_set_by INT REFERENCES users(id), created_at TIMESTAMP DEFAULT now());

CREATE TABLE IF NOT EXISTS attendance_logs (id SERIAL PRIMARY KEY, user_id INT REFERENCES users(id), mode TEXT, timestamp TIMESTAMP DEFAULT now(), location TEXT, metadata JSONB);

CREATE TABLE IF NOT EXISTS cleanliness_reports (id SERIAL PRIMARY KEY, reporter_id INT REFERENCES users(id), location TEXT, type TEXT, notes TEXT, photos JSONB, status TEXT DEFAULT 'open', created_at TIMESTAMP DEFAULT now(), resolved_at TIMESTAMP);

CREATE TABLE IF NOT EXISTS rbvm_transactions (id SERIAL PRIMARY KEY, user_id INT REFERENCES users(id), count INT, carbon_saved NUMERIC, created_at TIMESTAMP DEFAULT now());

CREATE TABLE IF NOT EXISTS rewards_wallet (id SERIAL PRIMARY KEY, user_id INT REFERENCES users(id), balance NUMERIC DEFAULT 0, created_at TIMESTAMP DEFAULT now());

CREATE TABLE IF NOT EXISTS rewards_transactions (id SERIAL PRIMARY KEY, wallet_id INT REFERENCES rewards_wallet(id), user_id INT REFERENCES users(id), amount NUMERIC, reason TEXT, created_at TIMESTAMP DEFAULT now());

CREATE TABLE IF NOT EXISTS documents (id SERIAL PRIMARY KEY, user_id INT REFERENCES users(id), bucket TEXT, path TEXT, meta JSONB, created_at TIMESTAMP DEFAULT now());
