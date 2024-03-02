import Background from "../../components/login/Background";
import LoginCard from "../../components/login/LoginCard";

export default function Login() {
  return (
    <Background>
      {/* content */}
      <div className="flex items-center justify-center h-full">
        <div className="flex-1 flex items-center justify-center z-20 p-4 text-white">
          <div className="text-center max-w-lg">
            <h1 className="text-6xl font-bold mb-8">Welcome Back!</h1>
            <p className="text-lg">
              Ready to hit the ice? <strong>Tournament Tracker</strong> is your
              go-to app for all things hockey tournaments. Whether you're
              playing, coaching, or cheering, organize your schedules, keep up
              with scores, and connect with your hockey community. Let's make
              this season the best one yet!
            </p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center z-30 ">
          <LoginCard onLoginSuccess={() => {}} />
        </div>
      </div>
    </Background>
  );
}
