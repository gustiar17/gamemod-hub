import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useT } from "../i18n";
import { useDispatch } from "../state/store";

export function Login() {
  const t = useT();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const user = name.trim();
    if (!user) return setError(t("auth.usernameRequired"));
    dispatch({ type: "login", user });
    navigate("/");
  };
  return (
    <form className="login" onSubmit={submit}>
      <h1>{t("auth.welcome")}</h1>
      <p className="muted">{t("auth.subtitle")}</p>
      <label>
        {t("auth.username")}
        <input value={name} onChange={(e) => setName(e.target.value)} autoFocus />
      </label>
      {error && <p role="alert" className="error">{error}</p>}
      <button type="submit" className="primary">{t("auth.logIn")}</button>
    </form>
  );
}
