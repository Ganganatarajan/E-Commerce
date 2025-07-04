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
    profileImage: null,
    phoneNo: "",
    mailId: "",
    password: "",
    workType: [],
  });

  const [previewImage, setPreviewImage] = useState("");

  // useEffect(() => {
  //   const fetchDirectorData = async () => {
  //     if (isEditMode) {
  //       try {
  //         const director = await getDirectorsById(id);
  //         setFormData({
  //           name: director.name || "",
  //           profileImage: null, // We'll handle existing image separately
  //           phoneNo: director.phoneNo || "",
  //           mailId: director.mailId || "",
  //           password: director.password || "",
  //           workType: director.workType || [],
  //         });
  //         if (director.profileImage) {
  //           setPreviewImage(director.profileImage);
  //         }
  //       } catch (err) {
  //         message.error("Failed to fetch director data");
  //       }
  //     }
  //   };

  //   fetchDirectorData();
  // }, [isEditMode, id]);

 useEffect(() => {
  if (isEditMode && location.state) {
    const { name, profileImage, phoneNo, mailId, password, workType } = location.state;
    
    setFormData({
      name: name || "",
      profileImage: null, // We'll handle the existing image separately
      phoneNo: phoneNo || "",
      mailId: mailId || "",
      password: password || "",
      workType: workType || [],
    });

    // Set preview image if it exists
    if (profileImage) {
      setPreviewImage(profileImage);
    }
  }
}, [isEditMode, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profileImage: file
      });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
    // Create FormData object for binary file upload
    const formDataToSend = new FormData();
    
    // Append all fields in the required order
    formDataToSend.append('name', formData.name);
    formDataToSend.append('phoneNo', formData.phoneNo);
    formDataToSend.append('mailId', formData.mailId);
    formDataToSend.append('password', formData.password);
    
    // Append workType as array (multiple entries)
    formData.workType.forEach(type => {
      formDataToSend.append('workType', type);
    });
    
    // Append profile image as binary data if it exists
    if (formData.profileImage instanceof File) {
      formDataToSend.append('profileImage', formData.profileImage);
    } else if (isEditMode && !formData.profileImage && previewImage) {
      // Handle case when editing but not changing the existing image
      formDataToSend.append('profileImage', previewImage);
    }

    if (isEditMode) {
      await updateDirectors(id, formDataToSend);
      message.success("Director updated successfully!");
    } else {
      await createDirectors(formDataToSend);
      message.success("Director created successfully!");
    }
    navigate("/SkilledDirectors");
  } catch (err) {
    console.error("Submission Error:", err);
    message.error(
      isEditMode ? "Failed to update director." : "Failed to create director."
    );
  }
};

  const handleReset = () => {
    setFormData({
      name: "",
      profileImage: null,
      phoneNo: "",
      mailId: "",
      password: "",
      workType: [],
    });
    setPreviewImage("");
    // Reset file input if exists
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";
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
            onClick={() => navigate("/SkilledDirectors")}
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
          encType="multipart/form-data"
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
                Profile Image
              </label>
              <input
                type="file"
                name="profileImage"
                onChange={handleImageChange}
                accept="image/*"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              {previewImage && (
                <div className="mt-2">
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    className="h-20 w-20 object-cover rounded"
                  />
                </div>
              )}
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