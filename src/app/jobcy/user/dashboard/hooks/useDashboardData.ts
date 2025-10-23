"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Education,
  Experience,
  Job,
  AppliedJob,
  Connection,
  Interview,
  UserProfile,
} from "../../../types/dashboard";
// Removed mock data imports - using live data only

type UserProfileUpdate = Partial<UserProfile>;

interface RawJob {
  id?: string;
  _id?: string;
  title: string;
  company: string;
  location?: string;
  salary?: number | string;
  type?: string;
  posted?: string;
  applicants?: number;
  description?: string;
  hasApplied?: boolean;
  experienceLevel?: string;
  careerLevel?: string;
  applicationDeadline?: string;
  qualifications?: string[];
}

interface RawUser {
  _id?: string;
  id?: string;
  name?: string;
  role?: string;
  title?: string;
  professionalRole?: string;
  currentLocation?: string;
  location?: string;
  company?: { location?: string };
  experience?: string;
  education?: string;
  skills?: string[];
  status?: string;
}

interface RawInterview {
  id?: string | number;
  _id?: string | number;
  jobId?: string | number;
  company?: string;
  date?: string;
  status?: string;
  position?: string;
  title?: string;
  time?: string;
  type?: string;
  interviewer?: string;
}

interface ConnectedUser {
  id: string;
  name: string;
  title: string;
  experience?: string;
  education?: string;
  skills?: string[];
  status?: string;
  connected: boolean;
}

export function useDashboardData() {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile>({ name: "" });
  const [education, setEducation] = useState<Education[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  // Removed mock data functionality - using live data only

  // ✅ Common function to fetch dashboard data (called on mount and token change)
  const fetchDashboardData = useCallback(async (token: string) => {
    try {
      // Check user role - only fetch for regular users
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          if (user.role !== "user") {
            console.log("⚠️ Not a user role, skipping user dashboard data fetch");
            setIsLoading(false);
            return;
          }
        } catch (error) {
          console.error("Error parsing user from localStorage:", error);
        }
      }

      setIsLoading(true);

      // Fetch profile
      const profileRes = await fetch(
        `/api/jobcy/user/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!profileRes.ok) {
        console.error("Profile fetch failed with status:", profileRes.status);
        throw new Error("Profile fetch failed");
      }
      const profileData = await profileRes.json();

      const mappedProfile: UserProfile = {
        name: profileData.name || "",
        email: profileData.email,
        mobile: profileData.mobile,
        title: profileData.professionalRole || profileData.title,
        currentLocation: profileData.currentLocation,
        experience: profileData.experience,
        currentCTC: profileData.currentCTC
          ? String(profileData.currentCTC)
          : undefined,
        bio: profileData.bio,
        skills: profileData.skills,
        projects: profileData.projects,
        languages: profileData.languages,
        education: profileData.education || [],
        experienceList: profileData.experienceList || [],
        profileCompletion: profileData.profileCompletion,
        connections: profileData.connections,
        dob: profileData.dob || profileData.personalDetails?.[0]?.dob,
        gender: profileData.gender || profileData.personalDetails?.[0]?.gender,
        category: profileData.category || profileData.personalDetails?.[0]?.category,
        maritalStatus: profileData.maritalStatus || profileData.personalDetails?.[0]?.maritalStatus,
        resume: profileData.resume?.name,
      };

      setUserProfile(mappedProfile);
      setEducation(mappedProfile.education || []);
      setExperience(mappedProfile.experienceList || []);

      // Fetch experience separately
      const experienceRes = await fetch(
        `${"/api/jobcy"}/experience`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (experienceRes.ok) {
        const experienceData = await experienceRes.json();
        setExperience(experienceData);
      }

      // Fetch jobs
      const jobsRes = await fetch(
        `/api/jobcy/jobs/browse`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (jobsRes.ok) {
        const jobsData = await jobsRes.json();
        console.log('Jobs API response:', { isArray: Array.isArray(jobsData), type: typeof jobsData, length: Array.isArray(jobsData) ? jobsData.length : 'N/A' });
        
        // Handle different response formats
        let jobsArray = [];
        if (Array.isArray(jobsData)) {
          jobsArray = jobsData;
        } else if (jobsData && Array.isArray(jobsData.jobs)) {
          jobsArray = jobsData.jobs;
        } else if (jobsData && Array.isArray(jobsData.data)) {
          jobsArray = jobsData.data;
        } else {
          console.warn('Jobs API returned unexpected format:', jobsData);
          jobsArray = [];
        }
        setAllJobs(
          jobsArray.map((job: RawJob) => ({
            id: job.id || job._id || Math.random().toString(),
            title: job.title || "Untitled Job",
            company: job.company || "Unknown Company",
            location: job.location || "Location not specified",
            salary:
              typeof job.salary === "number"
                ? `$${job.salary.toLocaleString()}`
                : job.salary || "Salary not disclosed",
            type: job.type || "Full-time",
            posted: job.posted
              ? new Date(job.posted).toLocaleDateString()
              : "Recently posted",
            applicants: job.applicants || 0,
            description: job.description || "No description available",
            hasApplied: job.hasApplied || false,
            experienceLevel: job.careerLevel || job.experienceLevel, // Map from backend's careerLevel field
            applicationDeadline: job.applicationDeadline,
            qualifications: job.qualifications || [],
          }))
        );
      } else {
        console.error('Jobs fetch failed:', jobsRes.status, jobsRes.statusText);
        setAllJobs([]);
      }

      // Fetch connections
      const connectionsRes = await fetch(
        `/api/jobcy/user/list`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Connections fetch response:', connectionsRes.status, connectionsRes.statusText);
      if (connectionsRes.ok) {
        const usersData = await connectionsRes.json();
        console.log('Users API response:', { isArray: Array.isArray(usersData), type: typeof usersData, length: Array.isArray(usersData) ? usersData.length : 'N/A' });
        console.log('Sample users data:', usersData.slice(0, 3));
        
        // Handle different response formats
        let usersArray = [];
        if (Array.isArray(usersData)) {
          usersArray = usersData;
        } else if (usersData && Array.isArray(usersData.users)) {
          usersArray = usersData.users;
        } else if (usersData && Array.isArray(usersData.data)) {
          usersArray = usersData.data;
        } else {
          console.warn('Users API returned unexpected format:', usersData);
          usersArray = [];
        }
        setConnections(
          usersArray.map((u: RawUser) => ({
            id: u._id || u.id || Math.random().toString(),
            name: u.name || "Unknown User",
            title: u.professionalRole || u.role || u.title || "Job Seeker",
            experience: u.experience || "Not specified",
            education: u.education || "Not specified",
            skills: u.skills || [],
            status: (u.status === "seeking" || u.status === "open" || u.status === "employed") ? u.status : "employed",
            connected: false,
          }))
        );
      } else {
        console.error('Connections fetch failed:', connectionsRes.status, connectionsRes.statusText);
        setConnections([]);
      }

      // Fetch connected users for chat
      const connectedRes = await fetch(
        `/api/jobcy/connections/connections`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (connectedRes.ok) {
        const connectedData = await connectedRes.json();
        // Ensure connectedData is an array
        const connectedArray = Array.isArray(connectedData) ? connectedData : [];
        const connectedUsers: Connection[] = connectedArray.map((u: ConnectedUser) => ({
          id: u.id || Math.random().toString(),
          name: u.name || "Unknown User",
          title: u.title || "Job Seeker",
          experience: u.experience || "Not specified",
          education: u.education || "Not specified",
          skills: u.skills || [],
          status: (u.status === "seeking" || u.status === "open" || u.status === "employed") ? u.status : "employed" as "seeking" | "open" | "employed",
          connected: true,
        }));

        // Merge connected users with existing connections
        setConnections(prevConnections => {
          const existingIds = new Set(prevConnections.map(c => c.id));
          const newConnections = connectedUsers.filter((c: Connection) => !existingIds.has(c.id));
          return [...prevConnections, ...newConnections];
        });
      } else {
        console.error('Connected users fetch failed:', connectedRes.status, connectedRes.statusText);
      }

      // Fetch applied jobs
      const appliedJobsRes = await fetch(
        `/api/jobcy/user/applications`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (appliedJobsRes.ok) {
        const appliedJobsData = await appliedJobsRes.json();
        
        // Handle different response formats
        let appliedArray = [];
        if (Array.isArray(appliedJobsData)) {
          appliedArray = appliedJobsData;
        } else if (appliedJobsData && Array.isArray(appliedJobsData.applications)) {
          appliedArray = appliedJobsData.applications;
        } else if (appliedJobsData && Array.isArray(appliedJobsData.data)) {
          appliedArray = appliedJobsData.data;
        } else {
          console.warn('Applications API returned unexpected format:', appliedJobsData);
          appliedArray = [];
        }
        setAppliedJobs(appliedArray);
      } else {
        console.error('Applied jobs fetch failed:', appliedJobsRes.status, appliedJobsRes.statusText);
        setAppliedJobs([]);
      }

      // Fetch interviews
      const interviewsRes = await fetch(
        `/api/jobcy/user/interviews`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (interviewsRes.ok) {
        const interviewsData = await interviewsRes.json();
        
        // Handle different response formats
        let interviewsArray = [];
        if (Array.isArray(interviewsData)) {
          interviewsArray = interviewsData;
        } else if (interviewsData && Array.isArray(interviewsData.interviews)) {
          interviewsArray = interviewsData.interviews;
        } else if (interviewsData && Array.isArray(interviewsData.data)) {
          interviewsArray = interviewsData.data;
        } else {
          console.warn('Interviews API returned unexpected format:', interviewsData);
          interviewsArray = [];
        }
        setInterviews(
          interviewsArray.map((int: RawInterview) => ({
            id: String(int.id || int._id || Math.random()),
            jobId: int.jobId ? String(int.jobId) : undefined,
            company: int.company || "Unknown Company",
            date: int.date || new Date().toISOString().split("T")[0],
            status: int.status || "Scheduled",
            position: int.position || int.title || "Not specified",
            time: int.time || "Time not specified",
            type: int.type || "Interview",
            interviewer: int.interviewer || "Not assigned",
          }))
        );
      } else {
        console.error('Interviews fetch failed:', interviewsRes.status, interviewsRes.statusText);
        setInterviews([]);
      }
    } catch (error) {
      console.error("❌ Dashboard fetch error:", error);
      
      // Only apply mock data if we're actually a user (not HR/admin)
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          if (user.role === "user") {
            console.log("📊 User role detected - ensuring API endpoints work");
            // No mock data fallback - ensure API endpoints work properly
          }
        } catch (parseError) {
          console.error("Error parsing user:", parseError);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ✅ Run when dashboard mounts OR when token appears after login
  useEffect(() => {
    const token =
      localStorage.getItem("token") || localStorage.getItem("userToken");
    if (!token) {
      setIsLoading(false);
      return;
    }
    fetchDashboardData(token);
  }, [fetchDashboardData]);

  // ✅ Make sure event handlers never break
  const handleJobApplication = async (jobId: string | number) => {
    if (!allJobs.length) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found for job application");
        return;
      }

      // Call the backend API to apply for the job
      const response = await fetch(`${"/api/jobcy"}/jobs/apply/${jobId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ coverLetter: "" }), // Optional cover letter
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Job application successful:", result);

        // Update local state
        setAllJobs((prevJobs) =>
          prevJobs.map((job) =>
            job.id === jobId
              ? { ...job, hasApplied: true, applicants: (job.applicants || 0) + 1 }
              : job
          )
        );

        // Refresh applied jobs data
        const appliedJobsRes = await fetch(
          `/api/jobcy/user/me`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (appliedJobsRes.ok) {
          const appliedJobsData = await appliedJobsRes.json();
          setAppliedJobs(appliedJobsData);
        }
      } else {
        const errorData = await response.json();
        console.error("Job application failed:", errorData);
        alert(`Application failed: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error applying for job:", error);
      alert("Failed to apply for job. Please try again.");
    }
  };

  const updateProfile = async (formData: UserProfileUpdate) => {
    const token = localStorage.getItem("token");
    if (!token) return { success: false, message: "No token found" };
    try {
      const res = await fetch(
        `/api/jobcy/user/me`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (res.ok) {
        const mappedProfile: UserProfile = {
          name: data.name || "",
          email: data.email,
          mobile: data.mobile,
          title: data.professionalRole || data.title,
          currentLocation: data.currentLocation,
          experience: data.experience,
          currentCTC: data.currentCTC ? String(data.currentCTC) : undefined,
          bio: data.bio,
          skills: data.skills,
          projects: data.projects || [],
          languages: data.languages || [],
          education: data.education || [],
          experienceList: data.experienceList || [],
          profileCompletion: data.profileCompletion,
          connections: data.connections,
          dob: data.personalDetails?.[0]?.dob,
          gender: data.personalDetails?.[0]?.gender,
          category: data.personalDetails?.[0]?.category,
          maritalStatus: data.personalDetails?.[0]?.maritalStatus,
          nationality: data.personalDetails?.[0]?.nationality,
          resume: data.resume?.name,
        };
        setUserProfile(mappedProfile);
        return { success: true, data: mappedProfile };
      } else {
        return { success: false, message: data.message || "Update failed" };
      }
    } catch (err) {
      console.error("Profile update error:", err);
      return { success: false, message: "Network error" };
    }
  };

  return {
    isLoading,
    userProfile,
    education,
    experience,
    allJobs,
    appliedJobs,
    connections,
    interviews,
    updateProfile,
    handleJobApplication,
    refetch: () => {
      const token = localStorage.getItem("token") || localStorage.getItem("userToken");
      if (token) fetchDashboardData(token);
    },
  };
}
