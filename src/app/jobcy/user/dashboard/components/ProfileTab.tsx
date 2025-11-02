"use client";
import { Experience } from "@/app/jobcy/types/type1";
import { Education, Project, Language, UserProfile } from "@/app/jobcy/types/dashboard";

import {
  Edit,
  GraduationCap,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  TrendingUp,
  Folder,
  User,
  Globe,
  DollarSign,
  Clock,
} from "lucide-react";
import ResumeUpload from "./ResumeUpload";

export type Skill = string;


// --- Props interface ---
interface ProfileTabProps {
  userProfile: UserProfile;
  education: Education[];
  experience: Experience[];
  isDark: boolean;
  onEditProfile: (section?: string) => void;
  updateProfile?: (data: Partial<UserProfile>) => Promise<{ success: boolean; message?: string; data?: UserProfile }>;
}
export default function ProfileTab({
  userProfile,
  education=[],
  experience=[],
  isDark: _isDark, // Removed dark mode
  onEditProfile,
  updateProfile,
}:ProfileTabProps) {
  // Extract first letter from name for avatar
  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Profile Header Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 hover:shadow-md transition-shadow">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 bg-gradient-to-br from-[#0A66C2] to-[#004182] rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-5xl">
                {getInitial(userProfile.name)}
              </span>
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                  {userProfile.name}
                </h1>
                {userProfile.title && (
                  <p className="text-lg text-gray-600 mt-1">{userProfile.title}</p>
                )}
              </div>
              <button
                onClick={() => onEditProfile("personal")}
                className="bg-[#0A66C2] hover:bg-[#004182] text-white px-5 py-2.5 rounded-lg transition-colors flex items-center space-x-2 font-semibold shadow-sm hover:shadow-md"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
            </div>

            {/* Contact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex items-center space-x-3 bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">
                <Mail className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-700 font-medium">
                  {userProfile.email}
                </span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">
                <Phone className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-700 font-medium">
                  {userProfile.mobile || "Not provided"}
                </span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-700 font-medium">
                  {userProfile.currentLocation || "Not specified"}
                </span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">
                <Clock className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-700 font-medium">
                  {userProfile.experience || "0 years"} Experience
                </span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">
                <DollarSign className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-700 font-medium">
                  ₹{userProfile.currentCTC || "Not disclosed"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1 font-medium">
                Profile Views
              </p>
              <p className="text-2xl font-bold text-gray-900">
                1,245
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-[#0A66C2] to-[#004182] rounded-lg flex items-center justify-center shadow-sm">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1 font-medium">
                Applications
              </p>
              <p className="text-2xl font-bold text-gray-900">
                28
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1 font-medium">
                Profile Score
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {userProfile.profileCompletion || 0}%
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-[#0A66C2] to-[#004182] rounded-lg flex items-center justify-center shadow-sm">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">
            About Me
          </h3>
          <button
            onClick={() => onEditProfile("personal")}
            className="text-[#0A66C2] hover:text-[#004182] text-sm font-semibold transition-colors"
          >
            Edit
          </button>
        </div>
        <p className="text-gray-700 leading-relaxed">
          {userProfile.bio ||
            "Add a brief description about yourself, your career goals, and what makes you unique."}
        </p>
      </div>

      {/* Resume Section */}
      <div className="mb-6">
        <ResumeUpload
          isDark={false}
          currentResume={userProfile.resume}
          onUploadSuccess={async (filePath) => {
            // Update the profile with the new resume path
            if (updateProfile) {
              await updateProfile({ resume: filePath });
            }
          }}
        />
      </div>

      {/* Skills Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">
            Skills & Expertise
          </h3>
          <button
            onClick={() => onEditProfile("skills")}
            className="text-[#0A66C2] hover:text-[#004182] text-sm font-semibold transition-colors"
          >
            + Add Skill
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {userProfile.skills?.map((skill: string, index: number) => (
            <span
              key={index}
              className="px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg text-sm font-medium hover:border-[#0A66C2] hover:bg-blue-50 transition-colors cursor-pointer"
            >
              {skill}
            </span>
          ))}
          {(!userProfile.skills || userProfile.skills.length === 0) && (
            <p className="text-sm text-gray-500">Add your skills to showcase your expertise</p>
          )}
        </div>
      </div>

      {/* Projects Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-[#0A66C2] to-[#004182] rounded-lg flex items-center justify-center mr-3 shadow-sm">
              <Folder className="w-5 h-5 text-white" />
            </div>
            Projects
          </h3>
          <button
            onClick={() => onEditProfile("projects")}
            className="text-[#0A66C2] hover:text-[#004182] text-sm font-semibold transition-colors"
          >
            + Add Project
          </button>
        </div>
        {userProfile.projects && userProfile.projects.length > 0 ? (
          <div className="space-y-6">
            {userProfile.projects.map((project: Project, index: number) => (
              <div
                key={index}
                className={`${index !== 0 ? "border-t pt-6" : ""} border-gray-200`}
              >
                <h4 className="font-semibold text-lg text-gray-900 mb-2">
                  {project.title}
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  {project.description}
                </p>
                {project.link && (
                  <a
                    href={project.link}
                    className="text-[#0A66C2] hover:text-[#004182] text-sm font-medium"
                  >
                    View Project →
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            Showcase your work by adding projects you have completed.
          </p>
        )}
      </div>

      {/* Education Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-[#0A66C2] to-[#004182] rounded-lg flex items-center justify-center mr-3 shadow-sm">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            Education
          </h3>
          <button
            onClick={() => onEditProfile("education")}
            className="text-[#0A66C2] hover:text-[#004182] text-sm font-semibold transition-colors"
          >
            + Add Education
          </button>
        </div>
        <div className="space-y-6">
          {education.length > 0 ? education.map((edu: Education, index: number) => (
            <div
              key={edu.id || `edu-${index}`}
              className="border-t pt-6 border-gray-200"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0A66C2] to-[#004182] rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold shadow-sm">
                  {edu.institution?.charAt(0) || "E"}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg text-gray-900">
                    {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}
                  </h4>
                  <p className="text-[#0A66C2] font-medium mt-1">
                    {edu.institution}
                  </p>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    <span>
                      {edu.startDate} - {edu.endDate || "Present"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )) : (
            <p className="text-sm text-gray-500">Add your education details</p>
          )}
        </div>
      </div>

      {/* Experience Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3 shadow-sm">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            Work Experience
          </h3>
          <button
            onClick={() => onEditProfile("experience")}
            className="text-[#0A66C2] hover:text-[#004182] text-sm font-semibold transition-colors"
          >
            + Add Experience
          </button>
        </div>
        <div className="space-y-6">
          {experience.length > 0 ? experience.map((exp: Experience, index: number) => (
            <div
              key={exp.id || `exp-${index}`}
              className="border-t pt-6 border-gray-200"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold shadow-sm">
                  {exp.company?.charAt(0) || "E"}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg text-gray-900">
                    {exp.position}
                  </h4>
                  <p className="text-green-600 font-medium mt-1">
                    {exp.company}
                  </p>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    <span>
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}{" "}
                      {exp.location ? `• ${exp.location}` : ""}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-sm mt-3 leading-relaxed text-gray-600">
                      {exp.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )) : (
            <p className="text-sm text-gray-500">Add your work experience</p>
          )}
        </div>
      </div>

      {/* Personal Details Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-[#0A66C2] to-[#004182] rounded-lg flex items-center justify-center mr-3 shadow-sm">
              <User className="w-5 h-5 text-white" />
            </div>
            Personal Details
          </h3>
          <button
            onClick={() => onEditProfile("details")}
            className="text-[#0A66C2] hover:text-[#004182] text-sm font-semibold transition-colors"
          >
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide font-semibold">
              Date of Birth
            </p>
            <p className="text-sm font-medium text-gray-900">
              {userProfile.dob || "Not provided"}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide font-semibold">
              Gender
            </p>
            <p className="text-sm font-medium text-gray-900">
              {userProfile.gender || "Not specified"}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide font-semibold">
              Category
            </p>
            <p className="text-sm font-medium text-gray-900">
              {userProfile.category || "Not specified"}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide font-semibold">
              Marital Status
            </p>
            <p className="text-sm font-medium text-gray-900">
              {userProfile.maritalStatus || "Not specified"}
            </p>
          </div>
        </div>
      </div>

      {/* Languages Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-[#0A66C2] to-[#004182] rounded-lg flex items-center justify-center mr-3 shadow-sm">
              <Globe className="w-5 h-5 text-white" />
            </div>
            Languages
          </h3>
          <button
            onClick={() => onEditProfile("languages")}
            className="text-[#0A66C2] hover:text-[#004182] text-sm font-semibold transition-colors"
          >
            + Add Language
          </button>
        </div>
        {userProfile.languages && userProfile.languages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userProfile.languages.map((lang: Language, index: number) => (
              <div
                key={`lang-${index}`}
                className="p-4 bg-gray-50 rounded-lg border border-gray-100"
              >
                <p className="font-medium text-gray-900 mb-1">
                  {lang.name}
                </p>
                <p className="text-sm text-gray-600">
                  {lang.proficiency || "Proficient"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            Add languages you can speak or write.
          </p>
        )}
      </div>
    </div>
  );
}
