import { NextRequest, NextResponse } from 'next/server';

// Comprehensive college database
const collegesData = {
  telangana: {
    universities: [
      "Osmania University",
      "Jawaharlal Nehru Technological University Hyderabad",
      "Kakatiya University",
      "Telangana University",
      "Mahatma Gandhi University",
      "Palamuru University",
      "Satavahana University",
      "Professor Jayashankar Telangana State Agricultural University",
      "Dr. B.R. Ambedkar Open University",
      "English and Foreign Languages University",
      "International Institute of Information Technology Hyderabad",
      "Indian School of Business",
      "National Institute of Pharmaceutical Education and Research",
      "Rajiv Gandhi University of Knowledge Technologies"
    ],
    engineering_colleges: [
      "Indian Institute of Technology Hyderabad",
      "National Institute of Technology Warangal",
      "International Institute of Information Technology Hyderabad",
      "Birla Institute of Technology and Science Pilani Hyderabad",
      "Vellore Institute of Technology Hyderabad",
      "Manipal Institute of Technology Hyderabad",
      "SRM Institute of Science and Technology Hyderabad",
      "Amity University Hyderabad",
      "GITAM University Hyderabad",
      "KL University Hyderabad",
      "Chaitanya Bharathi Institute of Technology",
      "Vasavi College of Engineering",
      "Gokaraju Rangaraju Institute of Engineering and Technology",
      "Malla Reddy Engineering College",
      "CMR Institute of Technology",
      "Anurag University",
      "Vardhaman College of Engineering",
      "Guru Nanak Institutions Technical Campus",
      "Institute of Aeronautical Engineering",
      "Methodist College of Engineering and Technology",
      "St. Mary's Group of Institutions",
      "Stanley College of Engineering and Technology for Women",
      "Vignan's Institute of Information Technology",
      "Keshav Memorial Institute of Technology",
      "Muffakham Jah College of Engineering and Technology",
      "Deccan College of Engineering and Technology",
      "Sreenidhi Institute of Science and Technology",
      "MLR Institute of Technology",
      "Guru Nanak Engineering College",
      "TKR College of Engineering and Technology",
      "Aurora's Engineering College",
      "Bhoj Reddy Engineering College for Women",
      "CVR College of Engineering",
      "Geethanjali College of Engineering and Technology",
      "Holy Mary Institute of Technology and Science",
      "JNTU College of Engineering Hyderabad",
      "Kakatiya Institute of Technology and Science",
      "Malla Reddy College of Engineering and Technology",
      "Nalla Malla Reddy Engineering College",
      "Padmasri Dr. B.V. Raju Institute of Technology",
      "Raghu Engineering College",
      "Sreenidhi Institute of Science and Technology",
      "Vasireddy Venkatadri Institute of Technology",
      "Vignan's Lara Institute of Technology and Science",
      "Woxsen University",
      "Hyderabad Institute of Technology and Management",
      "Matrusri Engineering College",
      "Nawab Shah Alam Khan College of Engineering and Technology",
      "Sphoorthy Engineering College",
      "Teegala Krishna Reddy Engineering College",
      "Vidya Jyothi Institute of Technology",
      "Aurora's Scientific Technological and Research Academy",
      "Bharat Institute of Engineering and Technology",
      "Brilliant Grammar School Educational Society"
    ],
    medical_colleges: [
      "Osmania Medical College",
      "Gandhi Medical College",
      "Kakatiya Medical College",
      "Deccan College of Medical Sciences",
      "Mamata Medical College",
      "Malla Reddy Medical College for Women",
      "Apollo Institute of Medical Sciences and Research",
      "Kamineni Institute of Medical Sciences",
      "MNR Medical College and Hospital",
      "Prathima Institute of Medical Sciences",
      "Shadan Institute of Medical Sciences",
      "SVS Medical College"
    ],
    pharmacy_colleges: [
      "University College of Pharmaceutical Sciences",
      "St. Peter's Institute of Pharmaceutical Sciences",
      "Vijay Marie College of Pharmacy",
      "Talla Padmavathi College of Pharmacy",
      "Malla Reddy College of Pharmacy",
      "Gokaraju Rangaraju College of Pharmacy",
      "Vignan Institute of Pharmaceutical Sciences",
      "Sree Dattha Institute of Pharmacy",
      "Aurora's Pharmacy College",
      "Bharat Institute of Technology Pharmacy",
      "CVR College of Pharmacy",
      "Deccan School of Pharmacy",
      "Guru Nanak Institutions College of Pharmacy",
      "Holy Mary Institute of Technology and Science Pharmacy",
      "Institute of Pharmaceutical Technology",
      "JNTU College of Pharmacy",
      "Kakatiya Institute of Pharmaceutical Sciences",
      "Nalla Malla Reddy College of Pharmacy",
      "Padmasri Dr. B.V. Raju Institute of Pharmacy",
      "Raghu College of Pharmacy",
      "Sreenidhi Institute of Pharmaceutical Sciences",
      "Vasavi College of Pharmacy",
      "Vignan's Institute of Pharmaceutical Sciences",
      "Woxsen University School of Pharmacy"
    ],
    management_colleges: [
      "Institute of Public Enterprise",
      "ICFAI Business School",
      "Symbiosis Institute of Business Management",
      "Woxsen School of Business",
      "Amity Business School",
      "GITAM School of Business",
      "KL Business School",
      "Manipal Academy of Higher Education",
      "SRM School of Management",
      "Vellore Institute of Technology Business School",
      "Birla Institute of Management Technology",
      "Chaitanya Bharathi Institute of Management",
      "Gokaraju Rangaraju Institute of Management",
      "Institute of Management Technology",
      "JNTU School of Management Studies",
      "Keshav Memorial Institute of Management",
      "Malla Reddy Institute of Management",
      "Nalla Malla Reddy Institute of Management",
      "Padmasri Dr. B.V. Raju Institute of Management",
      "Raghu Institute of Management",
      "Sreenidhi Institute of Management",
      "Vasavi Institute of Management",
      "Vignan's Institute of Management"
    ],
    arts_and_science_colleges: [
      "St. Ann's College for Women",
      "St. Francis College for Women",
      "St. Mary's College",
      "Vivekananda Degree College",
      "Keshav Memorial Degree College",
      "Gokaraju Rangaraju Degree College",
      "Malla Reddy Degree College",
      "Nalla Malla Reddy Degree College",
      "Padmasri Dr. B.V. Raju Degree College",
      "Raghu Degree College",
      "Sreenidhi Degree College",
      "Vasavi Degree College",
      "Vignan's Degree College",
      "Woxsen University Arts and Sciences",
      "Aurora's Degree College",
      "Bharat Institute of Technology Arts and Sciences",
      "CVR Degree College",
      "Deccan College of Arts and Sciences",
      "Guru Nanak Institutions Degree College",
      "Holy Mary Institute of Technology and Science Arts",
      "Institute of Arts and Sciences",
      "JNTU College of Arts and Sciences",
      "Kakatiya Institute of Arts and Sciences",
      "Malla Reddy College of Arts and Sciences",
      "Nalla Malla Reddy College of Arts and Sciences",
      "Padmasri Dr. B.V. Raju College of Arts and Sciences",
      "Raghu College of Arts and Sciences",
      "Sreenidhi College of Arts and Sciences",
      "Vasavi College of Arts and Sciences",
      "Vignan's College of Arts and Sciences",
      "Woxsen University College of Arts and Sciences"
    ]
  },
  andhra_pradesh: {
    universities: [
      "Andhra University",
      "Sri Venkateswara University",
      "Acharya Nagarjuna University",
      "Sri Krishnadevaraya University",
      "Rayalaseema University",
      "Yogi Vemana University",
      "Dr. B.R. Ambedkar University",
      "Krishna University",
      "Dravidian University",
      "Jawaharlal Nehru Technological University Anantapur",
      "Jawaharlal Nehru Technological University Kakinada",
      "Indian Institute of Management Visakhapatnam",
      "Indian Institute of Technology Tirupati",
      "National Institute of Technology Andhra Pradesh"
    ],
    engineering_colleges: [
      "Indian Institute of Technology Tirupati",
      "National Institute of Technology Andhra Pradesh",
      "Indian Institute of Management Visakhapatnam",
      "Vignan's Foundation for Science Technology and Research",
      "GITAM University Visakhapatnam",
      "KL University Vijayawada",
      "SRM Institute of Science and Technology Andhra Pradesh",
      "Amity University Andhra Pradesh",
      "Vellore Institute of Technology Andhra Pradesh",
      "Manipal Institute of Technology Andhra Pradesh",
      "Birla Institute of Technology and Science Andhra Pradesh"
    ]
  },
  karnataka: {
    universities: [
      "Bangalore University",
      "Mysore University",
      "Karnataka University",
      "Mangalore University",
      "Gulbarga University",
      "Tumkur University",
      "Visvesvaraya Technological University",
      "Rajiv Gandhi University of Health Sciences",
      "Karnataka State Open University",
      "Indian Institute of Science Bangalore",
      "Indian Institute of Management Bangalore",
      "Indian Institute of Technology Dharwad",
      "National Institute of Technology Karnataka",
      "Indian Institute of Science Education and Research Bangalore"
    ],
    engineering_colleges: [
      "Indian Institute of Science Bangalore",
      "Indian Institute of Management Bangalore",
      "Indian Institute of Technology Dharwad",
      "National Institute of Technology Karnataka",
      "Indian Institute of Science Education and Research Bangalore",
      "Vellore Institute of Technology Bangalore",
      "Manipal Institute of Technology",
      "SRM Institute of Science and Technology Bangalore",
      "Amity University Karnataka",
      "GITAM University Bangalore",
      "KL University Bangalore",
      "Birla Institute of Technology and Science Bangalore"
    ]
  },
  tamil_nadu: {
    universities: [
      "University of Madras",
      "Anna University",
      "Bharathiar University",
      "Bharathidasan University",
      "Madurai Kamaraj University",
      "Alagappa University",
      "Periyar University",
      "Tamil Nadu Agricultural University",
      "Tamil Nadu Dr. Ambedkar Law University",
      "Tamil Nadu Open University",
      "Indian Institute of Technology Madras",
      "Indian Institute of Management Trichy",
      "National Institute of Technology Tiruchirappalli",
      "Indian Institute of Science Education and Research Thiruvananthapuram"
    ],
    engineering_colleges: [
      "Indian Institute of Technology Madras",
      "Indian Institute of Management Trichy",
      "National Institute of Technology Tiruchirappalli",
      "Indian Institute of Science Education and Research Thiruvananthapuram",
      "Vellore Institute of Technology Chennai",
      "Manipal Institute of Technology Chennai",
      "SRM Institute of Science and Technology Chennai",
      "Amity University Tamil Nadu",
      "GITAM University Chennai",
      "KL University Chennai",
      "Birla Institute of Technology and Science Chennai"
    ]
  },
  maharashtra: {
    universities: [
      "University of Mumbai",
      "Savitribai Phule Pune University",
      "Shivaji University",
      "Dr. Babasaheb Ambedkar Marathwada University",
      "Rashtrasant Tukadoji Maharaj Nagpur University",
      "North Maharashtra University",
      "Swami Ramanand Teerth Marathwada University",
      "Mahatma Gandhi Antarrashtriya Hindi Vishwavidyalaya",
      "Indian Institute of Technology Bombay",
      "Indian Institute of Management Ahmedabad",
      "Indian Institute of Technology Dharwad",
      "National Institute of Technology Maharashtra",
      "Indian Institute of Science Education and Research Pune"
    ],
    engineering_colleges: [
      "Indian Institute of Technology Bombay",
      "Indian Institute of Management Ahmedabad",
      "Indian Institute of Technology Dharwad",
      "National Institute of Technology Maharashtra",
      "Indian Institute of Science Education and Research Pune",
      "Vellore Institute of Technology Mumbai",
      "Manipal Institute of Technology Mumbai",
      "SRM Institute of Science and Technology Mumbai",
      "Amity University Maharashtra",
      "GITAM University Mumbai",
      "KL University Mumbai",
      "Birla Institute of Technology and Science Mumbai"
    ]
  },
  international: {
    universities: [
      "Harvard University",
      "Stanford University",
      "Massachusetts Institute of Technology",
      "University of California, Berkeley",
      "Carnegie Mellon University",
      "University of Oxford",
      "University of Cambridge",
      "Imperial College London",
      "ETH Zurich",
      "National University of Singapore",
      "University of Toronto",
      "University of British Columbia",
      "McGill University",
      "University of Melbourne",
      "University of Sydney",
      "University of New South Wales",
      "University of Tokyo",
      "Kyoto University",
      "Seoul National University",
      "KAIST - Korea Advanced Institute of Science and Technology"
    ]
  }
};

// Helper function to flatten colleges data
function flattenCollegesData() {
  const flattened: Array<{value: string, label: string, state: string, category: string}> = [];
  
  Object.entries(collegesData).forEach(([state, colleges]) => {
    Object.entries(colleges).forEach(([category, collegeList]) => {
      collegeList.forEach(college => {
        flattened.push({
          value: college,
          label: `${college} (${state.replace('_', ' ').toUpperCase()})`,
          state: state.replace('_', ' ').toUpperCase(),
          category: category.replace('_', ' ').toUpperCase()
        });
      });
    });
  });
  
  return flattened.sort((a, b) => a.label.localeCompare(b.label));
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const state = searchParams.get('state') || '';
    const category = searchParams.get('category') || '';
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    console.log('Colleges API request:', { search, state, category, limit, offset });

    let colleges = flattenCollegesData();

    // Apply filters
    if (search) {
      colleges = colleges.filter(college => 
        college.value.toLowerCase().includes(search.toLowerCase()) ||
        college.label.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (state) {
      colleges = colleges.filter(college => 
        college.state.toLowerCase().includes(state.toLowerCase())
      );
    }

    if (category) {
      colleges = colleges.filter(college => 
        college.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    // Apply pagination
    const total = colleges.length;
    const paginatedColleges = colleges.slice(offset, offset + limit);

    console.log(`Found ${total} colleges, returning ${paginatedColleges.length}`);

    return NextResponse.json({
      colleges: paginatedColleges,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      },
      filters: {
        search,
        state,
        category
      }
    });

  } catch (error) {
    console.error('Colleges API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch colleges data' },
      { status: 500 }
    );
  }
}

// POST endpoint for adding new colleges (admin functionality)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, state, category } = body;

    if (!name || !state || !category) {
      return NextResponse.json(
        { error: 'Name, state, and category are required' },
        { status: 400 }
      );
    }

    // In a real application, you would save this to a database
    // For now, we'll just return success
    console.log('Adding new college:', { name, state, category });

    return NextResponse.json({
      success: true,
      message: 'College added successfully',
      college: {
        value: name,
        label: `${name} (${state.toUpperCase()})`,
        state: state.toUpperCase(),
        category: category.toUpperCase()
      }
    });

  } catch (error) {
    console.error('Add college error:', error);
    return NextResponse.json(
      { error: 'Failed to add college' },
      { status: 500 }
    );
  }
}
