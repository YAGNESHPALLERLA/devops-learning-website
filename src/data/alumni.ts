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

// Real alumni data with actual photos
export const alumniData: AlumniProfile[] = [
  {
    id: "1",
    name: "Bharagav",
    initials: "BH",
    position: "DevOps Engineer",
    company: "Amazon Web Services",
    package: "₹12 LPA",
    batch: "2024 Batch",
    testimonial: "OneHubGlobal's DevOps course gave me the practical skills I needed. The hands-on projects and real-world scenarios helped me land my dream job at AWS. The instructors are amazing!",
    course: "DevOps Fundamentals",
    placementDate: "2024-03-15",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/bharagav-devops",
    profileImage: "/alumni/bharagav.png"
  },
  {
    id: "2",
    name: "Indu",
    initials: "IN",
    position: "Cloud Solutions Architect",
    company: "Microsoft Azure",
    package: "₹15 LPA",
    batch: "2024 Batch",
    testimonial: "The comprehensive cloud training at OneHubGlobal was exactly what I needed. From basics to advanced concepts, everything was covered perfectly. Now I'm working with Microsoft Azure!",
    course: "Cloud Computing",
    placementDate: "2024-04-20",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/indu-cloud",
    profileImage: "/alumni/indu.png"
  },
  {
    id: "3",
    name: "Kasim",
    initials: "KA",
    position: "Kubernetes Specialist",
    company: "Google Cloud Platform",
    package: "₹18 LPA",
    batch: "2024 Batch",
    testimonial: "The Kubernetes training was exceptional! The practical labs and real-world projects prepared me for interviews. I'm now working as a Kubernetes Specialist at Google Cloud.",
    course: "Kubernetes & Container Orchestration",
    placementDate: "2024-05-10",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/kasim-k8s",
    profileImage: "/alumni/kasim.png"
  },
  {
    id: "4",
    name: "Kiran",
    initials: "KI",
    position: "DevSecOps Engineer",
    company: "IBM Cloud",
    package: "₹14 LPA",
    batch: "2024 Batch",
    testimonial: "OneHubGlobal's focus on security in DevOps was a game-changer. The DevSecOps modules helped me understand the importance of security in CI/CD pipelines. Now I'm at IBM!",
    course: "DevSecOps & Security",
    placementDate: "2024-06-05",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/kiran-devsecops",
    profileImage: "/alumni/kiran.png"
  },
  {
    id: "5",
    name: "Kiranmai",
    initials: "KM",
    position: "Site Reliability Engineer",
    company: "Netflix",
    package: "₹20 LPA",
    batch: "2024 Batch",
    testimonial: "The SRE training at OneHubGlobal was outstanding! The monitoring and observability modules were particularly helpful. I'm now ensuring Netflix's platform reliability!",
    course: "Site Reliability Engineering",
    placementDate: "2024-07-12",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/kiranmai-sre",
    profileImage: "/alumni/kiranmai.png"
  },
  {
    id: "6",
    name: "Srilekha",
    initials: "SR",
    position: "Platform Engineer",
    company: "Spotify",
    package: "₹16 LPA",
    batch: "2024 Batch",
    testimonial: "The platform engineering course was comprehensive and practical. The hands-on experience with modern tools helped me secure a position at Spotify. Highly recommended!",
    course: "Platform Engineering",
    placementDate: "2024-08-18",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/srilekha-platform",
    profileImage: "/alumni/srilekha.png"
  },
  {
    id: "7",
    name: "Yashwanth",
    initials: "YA",
    position: "DevOps Lead",
    company: "Google",
    package: "₹22 LPA",
    batch: "2024 Batch",
    testimonial: "OneHubGlobal's comprehensive DevOps program transformed my career. The practical approach and industry-relevant curriculum helped me become a DevOps Lead at Google. Truly life-changing!",
    course: "Advanced DevOps",
    placementDate: "2024-09-25",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/yashwanth-devops-lead",
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
