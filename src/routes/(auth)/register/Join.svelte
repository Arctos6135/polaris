<script lang="ts">
  import { join } from "$lib/auth";

  const onSubmit = (e: SubmitEvent) => {
    const data = Object.fromEntries<string>(
      new FormData(e.target as any) as Iterable<[PropertyKey, string]>
    );
    join({
      email: data.email,
      password: data.password,
      name: data.name,
      team_id: data.team,
    });
  };
</script>

<div class="card">
  <form class="space-y-4 p-4" on:submit|preventDefault={onSubmit}>
    <h1>Join team</h1>
    <label for="nameInput">
      <span>Your Name</span>
      <input type="text" id="nameInput" name="name" required />
    </label>
    <label for="teamInput">
      <span>Team ID</span>
      <input type="text" id="teamInput" name="team" required />
    </label>
    <label for="emailInput">
      <span>Email</span>
      <input type="text" id="emailInput" name="email" required />
    </label>
    <label for="passwordInput">
      <span>Password</span>
      <input type="password" id="passwordInput" name="password" required />
    </label>
    <label for="repeatPasswordInput">
      <span>Repeat Password</span>
      <input
        type="password"
        id="repeatPasswordInput"
        name="repeatPassword"
        required
      />
    </label>
    <div class="text-center">
      <button
        class="btn btn-filled-primary btn-base"
        type="submit"
        disabled={false}
        >Submit
      </button>
    </div>
  </form>
</div>
