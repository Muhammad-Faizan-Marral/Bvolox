import AuthLayout from "../components/auth/AuthLayout";
import RegisterForm from "../components/auth/RegisterForm";

const RegisterPage = () => (
  <AuthLayout title="Create account" subtitle="Please create an account.">
    <RegisterForm />
  </AuthLayout>
);

export default RegisterPage;