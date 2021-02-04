\c sanbercode1;

-- CREATE TABLE [IF NOT EXISTS] table_name (
--    column1 datatype(length) column_contraint,
--    column2 datatype(length) column_contraint,
--    column3 datatype(length) column_contraint,
--    table_constraints
-- );

-- CONSTRAINT fk_name]
--    FOREIGN KEY(fk_columns) 
--    REFERENCES parent_table(parent_key_columns)
--    [ON DELETE delete_action]
--    [ON UPDATE update_action]

drop table if exists workers cascade;
drop table if exists tasks cascade;

create table workers (
  id int generated always as identity,
  name varchar(255) not null,
  primary key(id)
);

create table tasks (
  id int generated always as identity,
  job text,
  done boolean default false,
  added_at timestamp not null default now(),
  primary key(id),
  assignee_id int,
  constraint fk_asignee
    foreign key(assignee_id)
      references workers(id)
      on delete set null -- cascade
);

insert into workers (name)
values 
  ('budi'),
  ('susi');

insert into tasks (assignee_id, job)
values 
  (1, 'makan'),  
  (2, 'minum'), 
  (1, 'belajar');
