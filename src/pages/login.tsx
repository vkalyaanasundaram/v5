import { client } from 'client';
import { useState } from 'react';
import styles from 'scss/pages/login.module.scss';

export default function Login() {
  const { useLogin } = client.auth;
  const [usernameEmail, setUserNameEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, isLoading, data, error } = useLogin();

  const errorMessage = data?.error || error?.message;

  return (
    <div className={styles.login}>
    <form className={styles.myForm}
      onSubmit={(e) => {
        e.preventDefault();
        login(usernameEmail, password);
      }}
    >
      <div>
        <div>
          <label className={styles.label} htmlFor="usernameEmail">Username or Email</label>
        </div>
        <div>
          <input
            type="text"
            value={usernameEmail}
            className={styles.text}
            onChange={(e) => setUserNameEmail(e.target.value)}
            id="usernameEmail"
            size={20}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
          />
        </div>

        <div>
          <button type="submit">Login</button>
        </div>
      </div>

      {errorMessage ? <p>Error: {errorMessage}</p> : null}
    </form>
    </div>
  );
}