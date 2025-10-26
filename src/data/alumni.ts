// Alumni/Success Stories Data Structure
export interface AlumniProfile {
  id: string;
  name: string;
  initials: string;
  position: string;
  company: string;
  package: string;
  batch: string;
  testimonial: string;
  profileImage?: string; // Optional: path to actual photo
  linkedinUrl?: string;
  email?: string;
  course: string;
  placementDate: string;
  isActive: boolean;
}

// Real alumni data with actual photos and placement information
export const alumniData: AlumniProfile[] = [
  {
    id: "1",
    name: "Bharagav",
    initials: "BH",
    position: "Associate Cloud Engineer",
    company: "Zettamine, NTT DATA",
    package: "₹4 LPA",
    batch: "2025 Batch",
    testimonial: "OneHubGlobal's comprehensive cloud training program helped me secure my dream job as an Associate Cloud Engineer at Zettamine, NTT DATA. The practical approach and industry-relevant curriculum made all the difference!",
    course: "Cloud Computing & DevOps",
    placementDate: "2025-01-15",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/bharagav-cloud-engineer",
    profileImage: "/alumni/bharagav.png"
  },
  {
    id: "2",
    name: "Indu",
    initials: "IN",
    position: "Associate Cloud Engineer",
    company: "Zettamine, NTT DATA",
    package: "₹4 LPA",
    batch: "2025 Batch",
    testimonial: "The cloud computing course at OneHubGlobal was exceptional! The hands-on labs and real-world projects prepared me perfectly for my role as Associate Cloud Engineer at Zettamine, NTT DATA.",
    course: "Cloud Computing & DevOps",
    placementDate: "2025-01-20",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/indu-cloud-engineer",
    profileImage: "/alumni/indu.png"
  },
  {
    id: "3",
    name: "Kasim",
    initials: "KA",
    position: "Associate Cloud Engineer",
    company: "Zettamine, NTT DATA",
    package: "₹4 LPA",
    batch: "2025 Batch",
    testimonial: "OneHubGlobal's training program transformed my career! The comprehensive cloud and DevOps curriculum helped me land my position as Associate Cloud Engineer at Zettamine, NTT DATA.",
    course: "Cloud Computing & DevOps",
    placementDate: "2025-01-25",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/kasim-cloud-engineer",
    profileImage: "/alumni/kasim.png"
  },
  {
    id: "4",
    name: "Kiran D",
    initials: "KD",
    position: "Associate Cloud Engineer",
    company: "Zettamine, NTT DATA",
    package: "₹4 LPA",
    batch: "2025 Batch",
    testimonial: "The practical approach and industry-focused training at OneHubGlobal was exactly what I needed. Now I'm working as an Associate Cloud Engineer at Zettamine, NTT DATA!",
    course: "Cloud Computing & DevOps",
    placementDate: "2025-02-01",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/kiran-d-cloud-engineer",
    profileImage: "/alumni/kiran.png"
  },
  {
    id: "5",
    name: "Kiranmai K",
    initials: "KK",
    position: "Associate Cloud Engineer",
    company: "Baadalsoft",
    package: "₹4 LPA",
    batch: "2025 Batch",
    testimonial: "OneHubGlobal's cloud computing program was outstanding! The comprehensive training and practical projects helped me secure my position as Associate Cloud Engineer at Baadalsoft.",
    course: "Cloud Computing & DevOps",
    placementDate: "2025-02-05",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/kiranmai-k-cloud-engineer",
    profileImage: "/alumni/kiranmai.png"
  },
  {
    id: "6",
    name: "Srilekha",
    initials: "SR",
    position: "Associate Cloud Engineer",
    company: "Zettamine, NTT DATA",
    package: "₹4 LPA",
    batch: "2025 Batch",
    testimonial: "The cloud computing course at OneHubGlobal was comprehensive and practical. The hands-on experience with modern cloud technologies helped me secure my role as Associate Cloud Engineer at Zettamine, NTT DATA.",
    course: "Cloud Computing & DevOps",
    placementDate: "2025-02-10",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/srilekha-cloud-engineer",
    profileImage: "/alumni/srilekha.png"
  },
  {
    id: "7",
    name: "Yashwanth",
    initials: "YA",
    position: "Associate Cloud Engineer",
    company: "Zettamine, NTT DATA",
    package: "₹4 LPA",
    batch: "2025 Batch",
    testimonial: "OneHubGlobal's comprehensive cloud computing program transformed my career. The practical approach and industry-relevant curriculum helped me become an Associate Cloud Engineer at Zettamine, NTT DATA. Truly life-changing!",
    course: "Cloud Computing & DevOps",
    placementDate: "2025-02-15",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/yashwanth-cloud-engineer",
    profileImage: "/alumni/yashwanth.png"
  }
];

// Helper functions
export const getActiveAlumni = () => alumniData.filter(alumni => alumni.isActive);

export const getAlumniByCourse = (course: string) => 
  alumniData.filter(alumni => alumni.course.toLowerCase().includes(course.toLowerCase()));

export const getAlumniByCompany = (company: string) => 
  alumniData.filter(alumni => alumni.company.toLowerCase().includes(company.toLowerCase()));

export const getAlumniById = (id: string) => 
  alumniData.find(alumni => alumni.id === id);
