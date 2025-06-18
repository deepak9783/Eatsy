import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, LockKeyholeIcon } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "sonner";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState<string>("");
    const { loading, resetPassword } = useUserStore();

    const { token } = useParams<{ token: string }>();
    // const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!token) {
        toast.error("Invalid or missing reset token.");
        return;  // stop if no token
      }
      await resetPassword(token, newPassword);
        // navigate("/login");
      
    };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <form  onSubmit={handleSubmit}
       className="flex flex-col gap-5 md:p-8 w-full max-w-md rounded-lg mx-4">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl mb-2">Reset Password</h1>
          <p className="text-sm text-gray-600">Enter your new password to reset old one</p>
        </div>
        <div className="relative w-full">
            <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your new password"
            className="pl-10"
            />
            <LockKeyholeIcon className="absolute inset-y-2 left-2 text-gray-600 pointer-events-none"/>
        </div>
        {
            loading ? (
                <Button disabled className="bg-orange hover:bg-hoverOrange"><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait</Button>
            ) : (
                <Button className="bg-orange hover:bg-hoverOrange">Reset Password</Button>
            )
        }
        <span className="text-center">
            Back to{" "}
            <Link to="/login" className="text-blue-500">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default ResetPassword;