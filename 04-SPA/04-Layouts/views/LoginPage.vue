<template>
  <auth-layout title="Вход">
    <form class="form">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input type="email" placeholder="demo@email" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input type="password" placeholder="password" class="form-control" />
      </div>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary button_block">Войти</button>
    </div>
    <div class="form__append">Нет аккаунта? <a href="register.html" class="link">Зарегистрируйтесь</a></div>
  </form>
  </auth-layout>
</template>

<script>
import AuthLayout from '../components/AuthLayout';
export default {
  name: 'LoginPage',
  components: { AuthLayout },
};
</script>

<style scoped>
.form {
  margin: 0;
}
.form-group {
  position: relative;
  margin-bottom: 24px;
}
.form-label {
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  margin-bottom: 10px;
  display: block;
}
.input-group {
  position: relative;
}
.input-group .form-control {
  width: 100%;
}
.form-control {
  padding: 12px 16px;
  height: 52px;
  border-radius: 8px;
  border: 2px solid var(--blue-light);
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  transition: 0.2s all;
  background-color: var(--white);
  outline: none;
  box-shadow: none;
}
.form-control::placeholder {
  font-weight: 400;
  color: var(--blue-2);
}
.form-control:focus {
  border-color: var(--blue);
}
.form__buttons {
  display: flex;
  flex-direction: column;
  padding: 0 40px;
  margin-top: 40px;
}
.form__buttons .button + .button {
  margin-bottom: 8px;
}
.button.button_block {
  display: block;
  width: 100%;
}
.button.button_primary {
  background-color: var(--blue);
  border-color: var(--blue);
  color: var(--white);
}
.button.button_primary:hover {
  background-color: var(--blue-light);
  border-color: var(--blue-light);
  color: var(--blue);
}
.button {
  display: inline-block;
  padding: 10px 24px;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: initial;
  text-align: center;
  border: 4px solid transparent;
  transition: .2s all;
  outline: none;
  box-shadow: none;
  background-color: transparent;
  cursor: pointer;
  text-decoration: none;
}
.form__append {
  margin-top: 40px;
  text-align: center;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
}
</style>