// src/components/auth/RegisterForm.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { registerUser } from "../../api/auth.api";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "../../utils/validators";
import InputField from "../common/InputField";
import Button from "../common/Button";
import ImageUploader from "../common/ImageUploader";

const RegisterForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setServerError("");
  };
  const handleAvatarSuccess = (url) => {
    setForm((prevForm) => ({ ...prevForm, avatar: url }));
  };

  const validate = () => {
    const errs = {
      name: validateName(form.name),
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
      console.log(form);
      const { data } = await registerUser(form);
      console.log(data);
      login(data.token, data.user);
      navigate("/dashboard");
    } catch (err) {
      console.error(err.message);
      setServerError(
        err.response?.data?.message || "Registration failed. Please try again",
      );
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
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-center">
          Profile Picture (Optional)
        </label>
        <ImageUploader
          onUploadSuccess={handleAvatarSuccess}
          defaultPreview={form.avatar}
        />
      </div>

      <InputField
        label="Naam"
        name="name"
        type="text"
        placeholder="Enter your name"
        value={form.name}
        onChange={handleChange}
        error={errors.name}
      />
      <InputField
        label="Email"
        name="email"
        type="email"
        placeholder="aap@example.com"
        value={form.email}
        onChange={handleChange}
        error={errors.email}
      />
      <InputField
        label="Password"
        name="password"
        type="password"
        placeholder="••••••••"
        value={form.password}
        onChange={handleChange}
        error={errors.password}
      />

      <Button type="submit" loading={loading}>
        Create Account
      </Button>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an Account
        <Link
          to="/login"
          className="text-indigo-600 hover:underline font-medium"
        >
          <span></span> Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
