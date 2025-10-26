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

// Sample data - you can replace this with real data
export const alumniData: AlumniProfile[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    initials: "RK",
    position: "DevOps Engineer",
    company: "Amazon Web Services",
    package: "₹12 LPA",
    batch: "2024 Batch",
    testimonial: "OneHubGlobal's DevOps course gave me the practical skills I needed. The hands-on projects and real-world scenarios helped me land my dream job at AWS. The instructors are amazing!",
    course: "DevOps Fundamentals",
    placementDate: "2024-03-15",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/rajesh-kumar-devops"
  },
  {
    id: "2",
    name: "Priya Sharma",
    initials: "PS",
    position: "Cloud Solutions Architect",
    company: "Microsoft Azure",
    package: "₹15 LPA",
    batch: "2024 Batch",
    testimonial: "The comprehensive cloud training at OneHubGlobal was exactly what I needed. From basics to advanced concepts, everything was covered perfectly. Now I'm working with Microsoft Azure!",
    course: "Cloud Computing",
    placementDate: "2024-04-20",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/priya-sharma-cloud"
  },
  {
    id: "3",
    name: "Amit Mishra",
    initials: "AM",
    position: "Kubernetes Specialist",
    company: "Google Cloud Platform",
    package: "₹18 LPA",
    batch: "2024 Batch",
    testimonial: "The Kubernetes training was exceptional! The practical labs and real-world projects prepared me for interviews. I'm now working as a Kubernetes Specialist at Google Cloud.",
    course: "Kubernetes & Container Orchestration",
    placementDate: "2024-05-10",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/amit-mishra-k8s"
  },
  {
    id: "4",
    name: "Sneha Kapoor",
    initials: "SK",
    position: "DevSecOps Engineer",
    company: "IBM Cloud",
    package: "₹14 LPA",
    batch: "2024 Batch",
    testimonial: "OneHubGlobal's focus on security in DevOps was a game-changer. The DevSecOps modules helped me understand the importance of security in CI/CD pipelines. Now I'm at IBM!",
    course: "DevSecOps & Security",
    placementDate: "2024-06-05",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/sneha-kapoor-devsecops"
  },
  {
    id: "5",
    name: "Vikram Patel",
    initials: "VP",
    position: "Site Reliability Engineer",
    company: "Netflix",
    package: "₹20 LPA",
    batch: "2024 Batch",
    testimonial: "The SRE training at OneHubGlobal was outstanding! The monitoring and observability modules were particularly helpful. I'm now ensuring Netflix's platform reliability!",
    course: "Site Reliability Engineering",
    placementDate: "2024-07-12",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/vikram-patel-sre"
  },
  {
    id: "6",
    name: "Neha Gupta",
    initials: "NG",
    position: "Platform Engineer",
    company: "Spotify",
    package: "₹16 LPA",
    batch: "2024 Batch",
    testimonial: "The platform engineering course was comprehensive and practical. The hands-on experience with modern tools helped me secure a position at Spotify. Highly recommended!",
    course: "Platform Engineering",
    placementDate: "2024-08-18",
    isActive: true,
    linkedinUrl: "https://linkedin.com/in/neha-gupta-platform"
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
