import AnimatedBackground from "@/components/login/AnimatedBackground";
import LoginCard from "@/components/login/LoginCard";

export const metadata = {
  title: "Login — Demo",
  description: "Instagram-style animated login UI demo",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <AnimatedBackground />
      <LoginCard />
    </main>
  );
}
