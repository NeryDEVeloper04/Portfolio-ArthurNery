create table messages(id uuid primary key default gen_random_uuid(),name text not null,email text not null,message text not null,answered boolean not null default false,created_at timestamptz not null default now());
create table featured_repos(repo_name text primary key);
alter table messages enable row level security;
alter table featured_repos enable row level security;
create policy "visitante envia" on messages for insert to anon with check (true);
create policy "dono le" on messages for select to authenticated using (true);
create policy "dono atualiza" on messages for update to authenticated using (true);
create policy "todos leem destaques" on featured_repos for select using (true);
create policy "dono altera destaques" on featured_repos for all to authenticated using (true) with check (true);
