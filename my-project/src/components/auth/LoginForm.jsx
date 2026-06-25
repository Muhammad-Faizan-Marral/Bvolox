import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { loginUser } from "../../api/auth.api";
import { validateEmail, validatePassword } from "../../utils/validators";
import InputField from "../common/InputField";
import Button from "../common/Button";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setServerError("");
  };

  const validate = () => {
    const errs = {
      email: validateEmail(form.email),
      password: validatePassword(form.password),
    };
    setErrors(errs);
    return !Object.values(errs).some(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { data } = await loginUser(form);
      login(data.token, data.user);
      navigate("/dashboard");
    } catch (err) {
      setServerError(err.response?.data?.message || "Something went wrong Please try Again !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {serverError && (
        <div className="rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {serverError}
        </div>
      )}
      <InputField
        label="Email"
        name="email"
        type="email"
        placeholder="aap@example.com"
        value={form.email}
        onChange={handleChange}
        error={errors.email}
        autoComplete="email"
      />
      <div className="relative">
        <InputField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="current-password"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 text-xs"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      <Button type="submit" loading={loading}>
        Login 
      </Button>
      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        Create Account !{" "}
        <Link to="/register" className="text-indigo-600 hover:underline font-medium">
          Register 
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;