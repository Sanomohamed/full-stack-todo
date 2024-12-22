import { useState, useEffect } from "react";
import { api } from "../utils/api";
import toast from "react-hot-toast";

// Define the UserProfile component
export function UserProfile() {
  // Fetch user data using the useQuery hook
  const { data: user, isLoading, isError } = api.user.getUser.useQuery();
  // Define the mutation for updating user data
  const updateUser = api.user.updateUser.useMutation();

  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
  });

  // State to manage edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Update formData when user data is fetched
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        image: user.image || "",
      });
    }
  }, [user]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser.mutate(formData, {
      onSuccess: () => {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      },
      onError: () => toast.error("Failed to update profile."),
    });
  };

  // Display loading message while user data is being fetched
  if (isLoading) return <div>Loading user data...</div>;
  // Display error message if there was an error fetching user data
  if (isError) return <div>Error loading user data.</div>;

  return (
    <div className="p-6 bg-white rounded shadow max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">User Profile</h1>

      {!isEditing ? (
        <div>
          <div className="mb-4">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <img
              src={user.image && user.image.startsWith("http") ? user.image : "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-24 h-24 rounded-full mt-4"
            />
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full p-2 border rounded"
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full p-2 border rounded"
            />
          </label>
          <label className="block mb-2">
            Profile Image URL:
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="block w-full p-2 border rounded"
            />
          </label>
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
