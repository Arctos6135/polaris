<script lang="ts">
  import { login } from "$lib/auth";

  const onSubmit = (e: SubmitEvent) => {
    const data = Object.fromEntries<string>(
      new FormData(e.target as any) as Iterable<[PropertyKey, string]>
    );
    login({
      email: data.email,
      password: data.password,
    });
  };
</script>

<div class="card">
  <form class="space-y-4 p-4" on:submit|preventDefault={onSubmit}>
    <h1>Login</h1>
    <label for="emailInput">
      <span>Email</span>
      <input type="text" id="emailInput" name="email" required />
    </label>
    <label for="passwordInput">
      <span>Password</span>
      <input type="password" id="passwordInput" name="password" required />
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
