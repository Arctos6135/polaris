create policy
  "Can read scouts" on scouts for select using (
  true
  );

create policy
  "Admins can update team scouts" on scouts for update using (
    exists (
      select
        1
      from
        scouts scout
      where
        scout.id = auth.uid ()
        and scout.admin
        and scout.team = team
    )
  );

create policy
  "Can insert scout" on scouts for insert with check (
  true
);

create policy
  "Can teams" on teams for select using (
    true
  );

create policy
  "Can create team" on teams for insert with check (
    true
  );

create policy
  "Team members can read team forms" on forms for
select
  using (
    exists (
      select
        1
      from
        scouts scout
      where
        id = auth.uid ()
        and scout.team = team
        and scout.accepted
    )
  );

create policy
  "Admins can do everything with forms" on forms for all  using (
    exists (
      select
        1
      from
        scouts scout
      where
        scout.id = auth.uid ()
        and scout.admin
        and scout.team = team
    )
  );


create policy
  "Team members can read team responses" on responses for
select
  using (
    exists (
      select
        1
      from
        scouts scout1
      where
        id = auth.uid ()
        and scout1.team = team
        and scout1.accepted
    )
  );
create policy
  "Can insert response" on responses for insert with check (
  true
);
create policy
  "Can do everything with own respones plus admins" on responses for all using (
    exists (
      select
        1
      from
        scouts scout1
      where
        id = auth.uid ()
        and scout1.admin
        and scout1.team = team
    )
    or 
    auth.uid () = scout
  );