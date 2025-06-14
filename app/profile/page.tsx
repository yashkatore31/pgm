import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Logout from "../components/Logout";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center text-red-600">
        Please log in to view your profile.
      </div>
    );
  }

  const { name = "User", phoneNumber = "Not Available" } = session.user as {
    name?: string;
    phoneNumber?: string;
  };

  return (
    <div className="min-h-[100dvh] bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-card border rounded-lg shadow-sm my-auto border-gray-300 py-6 px-3">
        
        {/* Avatar with Initials */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-500 via-pink-600 to-red-600 text-white flex items-center justify-center text-3xl font-bold shadow-md">
            {name[0]}
          </div>
        </div>

        {/* Profile Info */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-semibold text-gray-900">{name}</h2>
          <p className="text-sm text-gray-600">Phone: {phoneNumber}</p>
        </div>

        {/* Logout Button */}
        <div className="pt-4">
          <Logout />
        </div>
      </div>
    </div>
  );
}
