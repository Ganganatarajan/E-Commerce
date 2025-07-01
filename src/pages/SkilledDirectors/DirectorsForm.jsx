import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { 
  createDirectors, 
  updateDirectors,
  getDirectorsById 
} from "../../Services/SkilledDirectors";
import { message } from "antd";

const SkillDirectoryForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: "",
    profileImage: "",
    phoneNo: "",
    mailId: "",
    password: "",
    workType: [],
  });

  useEffect(() => {
    const fetchDirectorData = async () => {
      if (isEditMode) {
        try {
          const director = await getDirectorsById(id);
          setFormData({
            name: director.name || "",
            profileImage: director.profileImage || "",
            phoneNo: director.phoneNo || "",
            mailId: director.mailId || "",
            password: director.password || "",
            workType: director.workType || [],
          });
        } catch (err) {
          message.error("Failed to fetch director data");
        }
      }
    };

    fetchDirectorData();
  }, [isEditMode, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleWorkTypeChange = (e) => {
    const { value, checked } = e.target;
    let updatedWorkTypes = [...formData.workType];
    
    if (checked) {
      updatedWorkTypes.push(value);
    } else {
      updatedWorkTypes = updatedWorkTypes.filter(type => type !== value);
    }
    
    setFormData({
      ...formData,
      workType: updatedWorkTypes
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateDirectors(id, formData);
        message.success("Director updated successfully!");
      } else {
        await createDirectors(formData);
        message.success("Director created successfully!");
      }
      navigate("/skill-directory");
    } catch (err) {
      console.error(isEditMode ? "Update Error:" : "Create Error:", err);
      message.error(isEditMode ? "Failed to update director." : "Failed to create director.");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      profileImage: "",
      phoneNo: "",
      mailId: "",
      password: "",
      workType: [],
    });
  };

  const workTypeOptions = [
    'Full-time', 
    'Part-time', 
    'Contract', 
    'Freelance', 
    'Internship'
  ];

  return (
    <div className="container mx-auto p-2">
      <div className="mx-auto">
        <div className="flex items-center mb-8 mt-2">
          <button
            onClick={() => navigate("/skill-directory")}
            className="mr-4 text-gray-600 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            {isEditMode ? "Edit Director" : "Add New Director"}
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Image URL
              </label>
              <input
                type="text"
                name="profileImage"
                value={formData.profileImage}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="mailId"
                value={formData.mailId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Work Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {workTypeOptions.map((option) => (
                  <div key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      id={option}
                      value={option}
                      checked={formData.workType.includes(option)}
                      onChange={handleWorkTypeChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor={option} className="ml-2 block text-sm text-gray-700">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-6 py-2 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isEditMode ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkillDirectoryForm;