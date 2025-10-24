"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  User, 
  Building2, 
  Shield, 
  Users, 
  ArrowRight,
  Briefcase,
  LogIn
} from "lucide-react";

export default function JobcyLoginSelection() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const loginOptions = [
    {
      role: "user",
      title: "Job Seeker",
      description: "Looking for job opportunities",
      icon: User,
      path: "/jobcy/user/auth/login",
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700"
    },
    {
      role: "hr",
      title: "HR Professional",
      description: "Manage job postings and applications",
      icon: Users,
      path: "/jobcy/hr/auth/login",
      color: "from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700"
    },
    {
      role: "admin",
      title: "Administrator",
      description: "System administration and management",
      icon: Shield,
      path: "/jobcy/admin/auth/login",
      color: "from-purple-500 to-purple-600",
      hoverColor: "hover:from-purple-600 hover:to-purple-700"
    },
    {
      role: "company",
      title: "Company",
      description: "Company profile and job management",
      icon: Building2,
      path: "/jobcy/company/auth/login",
      color: "from-orange-500 to-orange-600",
      hoverColor: "hover:from-orange-600 hover:to-orange-700"
    }
  ];

  const handleRoleSelect = (role: string, path: string) => {
    setSelectedRole(role);
    setTimeout(() => {
      router.push(path);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-600 p-3 rounded-xl">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Jobcy
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Choose your role to continue
          </p>
          <p className="text-gray-500">
            Select the appropriate login option based on your role
          </p>
        </div>

        {/* Login Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loginOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedRole === option.role;
            
            return (
              <div
                key={option.role}
                onClick={() => handleRoleSelect(option.role, option.path)}
                className={`
                  relative bg-white rounded-2xl p-8 shadow-lg border-2 transition-all duration-300 cursor-pointer
                  ${isSelected 
                    ? 'border-blue-500 shadow-xl scale-105' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-xl'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`
                      p-3 rounded-xl bg-gradient-to-r ${option.color}
                      ${isSelected ? 'scale-110' : ''}
                    `}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {option.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {option.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className={`
                    p-2 rounded-full transition-all duration-300
                    ${isSelected 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-400 group-hover:text-gray-600'
                    }
                  `}>
                    <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${
                      isSelected ? 'translate-x-1' : ''
                    }`} />
                  </div>
                </div>

                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Don't have an account? 
            <span className="text-blue-600 hover:text-blue-700 cursor-pointer ml-1">
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
