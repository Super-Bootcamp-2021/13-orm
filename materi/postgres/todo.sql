\c sanbercode1;
set timezone = 'Asia/Jakarta';
create table if not exists todo (
  id serial primary key,
  job text,
  done boolean default false,
  added_at timestamp not null default now()
);
insert into todo (job)
values
  ('makan'),
  ('minum');
