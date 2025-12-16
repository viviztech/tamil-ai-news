-- Allow Anon Insert/Update/Delete during Dev
create policy "Enable access to all users"
on articles for all
using (true)
with check (true);

create policy "Enable access to categories"
on categories for all
using (true)
with check (true);
