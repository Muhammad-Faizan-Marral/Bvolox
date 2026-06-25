import AuthLayout from "../components/auth/AuthLayout";
import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => (
  <AuthLayout title="Welecome" subtitle="Please login !">
    <LoginForm />
  </AuthLayout>
);

export default LoginPage;