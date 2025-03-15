import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { notFound } from "next/navigation";
import { DownloadPDFButton } from "@/components/PdfTemplates";
import DrillVideo from '@/components/DrillVideo';
import { Program, CurriculumWeek } from '@/types/program';

interface WeeklySchedule {
  weekNumber: number;
  focus: string;
  description: string;
  objectives: string[];
  activities: string[];
  drills: Drill[];
}

interface PositionSession {
  position: string;
  description?: string;
  drills: Drill[];
  focus?: string[];
}

interface Drill {
  name: string;
  description: string;
  duration: string;
  metrics?: string[];
  equipment?: string[];
  difficulty?: string;
  progressions?: string[];
  focus?: string[];
  video?: {
    url: string;
    license?: {
      expirationDate: string;
      territoryRestrictions?: string[];
    };
  };
}

interface ProgressTracking {
  weekly: string[];
  monthly: string[];
  endOfProgram: string[];
}

interface ProgramWithPreview extends Program {
  image: string;
  fullDescription?: string;
  sessionsPerWeek?: number;
  previewContent: {
    sampleWeek: {
      weekNumber: number;
      focus: string;
      description: string;
      objectives: string[];
    };
    highlights: string[];
  };
  weeklySchedule?: WeeklySchedule[];
  progressTracking?: ProgressTracking;
}

const programs: ProgramWithPreview[] = [
  {
    id: "1",
    title: "Youth Development Program (Ages 8-12)",
    description: `Our Youth Development Program follows the proven methodology used by Europe's top academies:
    • Technical Foundation: Ball mastery, first touch, and basic skill moves
    • Cognitive Development: Decision-making in small-sided games
    • Physical Literacy: Age-appropriate strength and coordination exercises
    • Game Understanding: Positional play and basic tactical concepts`,
    price: 199,
    duration: "12 weeks",
    ageGroup: "8-12",
    skillLevel: "Beginner",
    maxParticipants: 16,
    image: "https://images.unsplash.com/photo-1577706644415-ea35e8c6fac3?auto=format&fit=crop&w=800&q=80",
    schedule: {
      startDate: "2024-03-01",
      endDate: "2024-05-24",
      sessions: [
        {
          day: "Monday",
          time: "4:00 PM",
          duration: "90 minutes"
        },
        {
          day: "Wednesday",
          time: "4:00 PM",
          duration: "90 minutes"
        }
      ]
    },
    curriculum: [
      {
        weekNumber: 1,
        focus: "Advanced Ball Control",
        description: "Master advanced ball control techniques",
        objectives: ["Ball mastery", "First touch", "Dribbling"],
        drills: [
          {
            name: "Ball Mastery Circuit",
            description: "Progressive ball control exercises",
            duration: "20 minutes",
            metrics: ["Ball touches per minute", "Successful moves completed"],
            equipment: ["Cones", "Soccer ball"],
            difficulty: "Beginner"
          }
        ]
      },
      {
        weekNumber: 2,
        focus: "Speed & Agility with Ball",
        description: "Develop speed and agility while maintaining ball control",
        objectives: ["Quick turns", "Acceleration with ball", "Change of direction"],
        drills: [
          {
            name: "Speed Dribbling",
            description: "High-intensity dribbling exercises",
            duration: "25 minutes",
            metrics: ["Sprint times", "Ball control accuracy"],
            equipment: ["Cones", "Soccer balls", "Timing gates"],
            difficulty: "Intermediate"
          }
        ]
      }
    ],
    equipment: [
      "Size 4 Soccer Ball",
      "Training Vest",
      "Cones",
      "Progress Tracking Notebook"
    ],
    coaches: [
      {
        name: "Coach John Smith",
        role: "Head Coach",
        qualifications: [
          "UEFA B License",
          "Youth Development Certification",
          "First Aid Certified"
        ]
      }
    ],
    positionSpecificSessions: [
      {
        position: "Forward",
        description: "Specialized training for attacking players",
        drills: [
          "Finishing exercises",
          "Movement patterns",
          "First touch under pressure"
        ]
      },
      {
        position: "Midfielder",
        description: "Focused training for midfield players",
        drills: [
          "Passing combinations",
          "Receiving in tight spaces",
          "Transition play"
        ]
      }
    ],
    previewContent: {
      sampleWeek: {
        weekNumber: 1,
        focus: "Technical Mastery",
        description: "Advanced ball control techniques and complex dribbling patterns",
        objectives: [
          "Advanced ball control techniques",
          "Complex dribbling patterns",
          "Speed and agility with ball",
          "Position-specific drills"
        ]
      },
      highlights: [
        "Professional-level technical training",
        "Position-specific development tracks",
        "Video analysis sessions",
        "Performance metrics tracking"
      ]
    }
  },
  {
    id: "2",
    title: "Advanced Skills Camp (Ages 13-16)",
    description: "Inspired by La Masia's training philosophy, emphasizing technical excellence and tactical understanding through position-specific training.",
    fullDescription: `Building on Barcelona's La Masia methodology, this program focuses on:
    • Advanced Technical Skills: Complex ball control and skill moves
    • Tactical Understanding: Reading the game and making quick decisions
    • Position-Specific Training: Specialized drills for different positions
    • Physical Development: Speed, agility, and soccer-specific strength training`,
    price: 299,
    duration: "8 weeks",
    sessionsPerWeek: 3,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
    curriculum: [
      {
        weekNumber: 1,
        focus: "Advanced Ball Control",
        description: "Master advanced ball control techniques",
        objectives: ["Ball mastery", "First touch", "Dribbling"],
        drills: [
          {
            name: "Ball Mastery Circuit",
            description: "Progressive ball control exercises",
            duration: "20 minutes",
            metrics: ["Ball touches per minute", "Successful moves completed"],
            equipment: ["Cones", "Soccer ball"],
            difficulty: "Beginner"
          }
        ]
      },
      {
        weekNumber: 2,
        focus: "Speed & Agility with Ball",
        description: "Develop speed and agility while maintaining ball control",
        objectives: ["Quick turns", "Acceleration with ball", "Change of direction"],
        drills: [
          {
            name: "Speed Dribbling",
            description: "High-intensity dribbling exercises",
            duration: "25 minutes",
            metrics: ["Sprint times", "Ball control accuracy"],
            equipment: ["Cones", "Soccer balls", "Timing gates"],
            difficulty: "Intermediate"
          }
        ]
      }
    ],
    weeklySchedule: [
      {
        weekNumber: 1,
        focus: "Technical Mastery",
        description: "Advanced ball control techniques and complex dribbling patterns",
        objectives: [
          "Advanced ball control techniques",
          "Complex dribbling patterns",
          "Speed and agility with ball",
          "Position-specific drills"
        ],
        activities: [
          "Technical drills",
          "Ball mastery exercises",
          "Speed and agility training",
          "Position-specific work"
        ],
        drills: [
          {
            name: "La Masia Rondo",
            description: "Advanced possession game with positional rotations",
            duration: "25 minutes",
            metrics: ["6v2", "5v2 one-touch", "4v2 with target player"],
            equipment: ["Cones", "Soccer balls"],
            difficulty: "Advanced"
          },
          {
            name: "Technical Circuit",
            description: "Complex skill sequence combining multiple techniques",
            duration: "30 minutes",
            metrics: ["Individual practice", "With passive defender", "With active defender"],
            equipment: ["Cones", "Soccer balls", "Training vests"],
            difficulty: "Intermediate"
          }
        ]
      },
      {
        weekNumber: 3,
        focus: "Tactical Development",
        description: "Game reading exercises and tactical decision-making",
        objectives: [
          "Game reading exercises",
          "Tactical decision-making",
          "Team shape and movement",
          "Advanced game scenarios"
        ],
        activities: [
          "Tactical analysis",
          "Game scenarios",
          "Team shape work",
          "Decision-making exercises"
        ],
        drills: [
          {
            name: "Positional Play",
            description: "Position-specific tactical training in game situations",
            duration: "30 minutes",
            metrics: ["Structured play", "Semi-structured", "Free play with conditions"],
            equipment: ["Cones", "Soccer balls", "Training vests"],
            difficulty: "Advanced"
          },
          {
            name: "Tactical Analysis",
            description: "Video analysis and on-field replication of professional situations",
            duration: "25 minutes",
            metrics: ["Analysis", "Walk-through", "Game speed execution"],
            equipment: ["Video equipment", "Training vests", "Cones"],
            difficulty: "Advanced"
          }
        ]
      },
      {
        weekNumber: 6,
        focus: "Game Integration",
        description: "Applying technical and tactical skills in game situations",
        objectives: [
          "High-intensity application",
          "Game-specific scenarios",
          "Competitive implementation",
          "Match analysis"
        ],
        activities: [
          "High-intensity technical drills",
          "Complex tactical situations",
          "Competitive small-sided games",
          "Match analysis"
        ],
        drills: [
          {
            name: "Pressure Training",
            description: "High-intensity technical skills under pressure",
            duration: "25 minutes",
            metrics: ["Technical precision", "Speed of execution", "Decision making"],
            equipment: ["Cones", "Soccer balls", "Training vests"],
            difficulty: "Advanced"
          },
          {
            name: "Game Scenarios",
            description: "Match-specific situations with tactical objectives",
            duration: "35 minutes",
            metrics: ["Structured play", "High pressure", "Match conditions"],
            equipment: ["Cones", "Soccer balls", "Goals"],
            difficulty: "Advanced"
          }
        ]
      },
      {
        weekNumber: 8,
        focus: "Performance Evaluation",
        description: "Final assessment of player development",
        objectives: [
          "Technical proficiency",
          "Tactical understanding",
          "Competitive performance",
          "Individual analysis"
        ],
        activities: [
          "Technical assessments",
          "Tactical understanding tests",
          "Competitive matches",
          "Individual player analysis"
        ],
        drills: [
          {
            name: "Performance Testing",
            description: "Comprehensive technical and tactical assessment",
            duration: "40 minutes",
            metrics: ["Technical proficiency", "Decision making", "Physical performance"],
            equipment: ["Testing equipment", "Soccer balls", "Cones"],
            difficulty: "Advanced"
          },
          {
            name: "Competitive Evaluation",
            description: "Match play with specific focus areas",
            duration: "45 minutes",
            metrics: ["Match performance", "Leadership", "Game management"],
            equipment: ["Match equipment", "Training vests", "Goals"],
            difficulty: "Advanced"
          }
        ]
      }
    ],
    previewContent: {
      sampleWeek: {
        weekNumber: 1,
        focus: "Professional Assessment",
        description: "Comprehensive evaluation of player abilities",
        objectives: [
          "Technical skill assessment",
          "Physical fitness evaluation",
          "Tactical understanding",
          "Mental preparation"
        ]
      },
      highlights: [
        "Professional-standard training methodology",
        "Performance analytics and video analysis",
        "College/Professional pathway preparation",
        "Mental performance coaching"
      ]
    },
    positionSpecificSessions: [
      {
        position: "Goalkeeper",
        drills: [
          {
            name: "Shot Stopping Mastery",
            description: "Advanced shot-stopping techniques from various angles and distances",
            duration: "30 minutes",
            metrics: ["Save percentage", "Positioning score", "Recovery speed"],
            equipment: ["Goals", "Soccer balls", "Training cones"],
            difficulty: "Advanced"
          },
          {
            name: "Distribution Training",
            description: "Modern goalkeeper distribution and build-up play",
            duration: "25 minutes",
            metrics: ["Short passing", "Long distribution", "Goal kicks", "Counter-attack initiation"],
            equipment: ["Goals", "Soccer balls", "Training cones"],
            difficulty: "Advanced"
          }
        ],
        focus: [
          "Shot-stopping techniques",
          "Modern distribution skills",
          "Aerial command",
          "Leadership and communication"
        ]
      },
      {
        position: "Forward",
        drills: [
          {
            name: "Elite Finishing",
            description: "Advanced shooting techniques from various angles and situations",
            duration: "30 minutes",
            metrics: ["Conversion rate", "Technique score", "Decision making"],
            equipment: ["Goals", "Soccer balls", "Training cones"],
            difficulty: "Advanced"
          },
          {
            name: "Movement Pattern Training",
            description: "Professional striker movement patterns and positioning",
            duration: "25 minutes",
            metrics: ["Off-ball movement", "Creating space", "Timing runs"],
            equipment: ["Training vests", "Cones", "Soccer balls"],
            difficulty: "Advanced"
          }
        ],
        focus: [
          "Advanced finishing techniques",
          "Creating separation from defenders",
          "Link-up play",
          "Goal-scoring mentality"
        ]
      },
      {
        position: "Midfielder",
        drills: [
          {
            name: "360° Awareness",
            description: "Midfield scanning and awareness training",
            duration: "25 minutes",
            metrics: ["Scan frequency", "Decision accuracy", "Pass completion"],
            equipment: ["Cones", "Soccer balls", "Training vests"],
            difficulty: "Advanced"
          },
          {
            name: "Line-Breaking Passes",
            description: "Progressive passing techniques and execution",
            duration: "30 minutes",
            metrics: ["Pass selection", "Weight of pass", "Receiving position"],
            equipment: ["Cones", "Soccer balls", "Training vests"],
            difficulty: "Advanced"
          }
        ],
        focus: [
          "Field awareness and scanning",
          "Progressive passing",
          "Space interpretation",
          "Transition control"
        ]
      },
      {
        position: "Defender",
        drills: [
          {
            name: "Defensive Positioning",
            description: "Elite defensive positioning and body orientation",
            duration: "25 minutes",
            metrics: ["Duel success", "Recovery speed", "Positioning score"],
            equipment: ["Cones", "Soccer balls", "Training cones"],
            difficulty: "Advanced"
          },
          {
            name: "Build-Up Play",
            description: "Modern defender ball progression training",
            duration: "30 minutes",
            metrics: ["Playing out from back", "Long-range passing", "Press resistance"],
            equipment: ["Cones", "Soccer balls", "Training cones"],
            difficulty: "Advanced"
          }
        ],
        focus: [
          "Defensive positioning",
          "Build-up play",
          "Aerial dominance",
          "Leadership communication"
        ]
      }
    ],
    progressTracking: {
      weekly: [
        "Technical skill metrics",
        "Physical performance data",
        "Tactical understanding assessment",
        "Position-specific development"
      ],
      monthly: [
        "Video analysis review",
        "Performance data analysis",
        "Individual development meeting",
        "Progress report and goals"
      ],
      endOfProgram: [
        "Complete performance analysis",
        "Technical proficiency report",
        "Tactical development assessment",
        "Future development plan"
      ]
    }
  },
  {
    id: "3",
    title: "Elite Performance Program (Ages 15-18)",
    description: "Based on professional academy standards, preparing players for high-level competition with advanced tactical and technical training.",
    fullDescription: `Developed with input from professional coaches, this elite program includes:
    • High-Performance Training: Professional-level drills and exercises
    • Advanced Tactical Concepts: Complex game situations and solutions
    • Mental Conditioning: Developing resilience and competitive mindset
    • Performance Analysis: Video analysis and feedback sessions`,
    price: 399,
    duration: "16 weeks",
    sessionsPerWeek: 4,
    image: "https://images.unsplash.com/photo-1551280857-2b9bbe52acf4?auto=format&fit=crop&w=800&q=80",
    curriculum: [
      {
        weekNumber: 1,
        focus: "Elite Technical Training",
        description: "Professional-level technical development",
        objectives: ["Advanced ball mastery", "Complex skill execution", "Speed of play"],
        drills: [
          {
            name: "Pro Technical Circuit",
            description: "High-intensity technical training",
            duration: "30 minutes",
            metrics: ["Execution speed", "Technical precision", "Decision making"],
            equipment: ["Pro training equipment", "Soccer balls"],
            difficulty: "Advanced"
          }
        ]
      },
      {
        weekNumber: 2,
        focus: "Advanced Tactical Development",
        description: "Complex tactical scenarios and solutions",
        objectives: ["Game reading", "Decision making", "Tactical awareness"],
        drills: [
          {
            name: "Tactical Scenarios",
            description: "Match-specific tactical training",
            duration: "45 minutes",
            metrics: ["Decision accuracy", "Execution speed", "Team coordination"],
            equipment: ["Training vests", "Cones", "Goals"],
            difficulty: "Advanced"
          }
        ]
      }
    ],
    weeklySchedule: [
      {
        week: 1,
        focus: "Professional Assessment",
        activities: [
          "Comprehensive skill assessment",
          "Physical fitness testing",
          "Tactical understanding evaluation",
          "Mental preparation introduction"
        ],
        drills: [
          {
            name: "Elite Technical Assessment",
            description: "Professional-level technical evaluation",
            duration: "45 minutes",
            metrics: ["Speed of execution", "Precision", "Consistency"]
          },
          {
            name: "Tactical Intelligence Test",
            description: "Complex game situation analysis",
            duration: "40 minutes",
            focus: ["Decision making", "Spatial awareness", "Game reading"]
          }
        ]
      },
      {
        week: 4,
        focus: "Advanced Development",
        activities: [
          "High-intensity technical training",
          "Complex tactical scenarios",
          "Strength and conditioning",
          "Mental resilience training"
        ],
        drills: [
          {
            name: "Professional Skills Circuit",
            description: "High-intensity technical training under fatigue",
            duration: "35 minutes",
            progressions: ["Technical precision", "Speed of execution", "Decision making"]
          },
          {
            name: "Elite Game Scenarios",
            description: "Professional match situations",
            duration: "45 minutes",
            progressions: ["Structured play", "High pressure", "Match conditions"]
          }
        ]
      },
      {
        week: 8,
        focus: "Performance Integration",
        activities: [
          "Match-specific training",
          "Video analysis sessions",
          "Advanced game strategies",
          "Competition preparation"
        ],
        drills: [
          {
            name: "Match Simulation",
            description: "Full-intensity match practice with specific objectives",
            duration: "60 minutes",
            focus: ["Team tactics", "Individual roles", "Game management"]
          },
          {
            name: "Position Mastery",
            description: "Advanced position-specific training",
            duration: "40 minutes",
            progressions: ["Individual work", "Unit training", "Team integration"]
          }
        ]
      },
      {
        week: 16,
        focus: "Elite Performance",
        description: "Final performance assessment and game preparation",
        objectives: [
          "Match performance",
          "Tournament readiness",
          "Team integration",
          "Leadership development"
        ],
        activities: [
          "High-level match play",
          "Performance analysis",
          "Tournament preparation",
          "Final evaluations"
        ],
        drills: [
          {
            name: "Elite Performance Test",
            description: "Comprehensive evaluation of all aspects",
            duration: "90 minutes",
            metrics: ["Technical mastery", "Tactical excellence", "Physical performance", "Mental readiness"],
            equipment: ["Testing equipment", "Soccer balls", "Cones"],
            difficulty: "Advanced"
          },
          {
            name: "Professional Standard Games",
            description: "Full matches with professional rules and intensity",
            duration: "70 minutes",
            metrics: ["Match performance", "Leadership", "Game management"],
            equipment: ["Match equipment", "Training vests", "Goals"],
            difficulty: "Advanced"
          }
        ]
      }
    ],
    progressTracking: {
      weekly: [
        "Elite performance metrics",
        "Physical conditioning data",
        "Match performance analysis",
        "Mental resilience assessment"
      ],
      monthly: [
        "Professional standard evaluation",
        "Video analysis review",
        "Career development meeting",
        "Performance optimization plan"
      ],
      endOfProgram: [
        "Complete player profile",
        "Professional readiness assessment",
        "Career pathway recommendations",
        "Long-term development plan"
      ]
    },
    previewContent: {
      sampleWeek: {
        week: 1,
        focus: "Professional Assessment",
        activities: [
          "Comprehensive skill assessment",
          "Physical fitness testing",
          "Tactical understanding evaluation",
          "Mental preparation introduction"
        ],
        drills: [
          {
            name: "Elite Technical Assessment",
            description: "Professional-level technical evaluation",
            duration: "45 minutes",
            metrics: ["Speed of execution", "Precision", "Consistency"]
          }
        ]
      },
      highlights: [
        "Professional-standard training methodology",
        "Performance analytics and video analysis",
        "College/Professional pathway preparation",
        "Mental performance coaching"
      ]
    }
  }
];

export default function ProgramDetail({ params }: { params: { id: string } }) {
  const program = programs.find(p => p.id === params.id);
  
  if (!program) {
    notFound();
  }

  // Simulated purchase check - in real app, this would check against user's purchases
  const isPurchased = false;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="relative h-[400px] rounded-xl overflow-hidden mb-12">
            <div className="absolute inset-0 bg-black/40 z-10" />
            <Image
              src={program.image}
              alt={program.title}
              fill
              className="object-cover"
              priority
            />
            <div className="relative z-20 h-full flex items-center justify-center text-white">
              <div className="text-center">
                <h1 className="text-5xl font-bold mb-4">{program.title}</h1>
                <p className="text-xl max-w-3xl mx-auto">{program.description}</p>
              </div>
            </div>
          </div>

          {/* Program Details */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6">Program Overview</h2>
                <div className="prose max-w-none">
                  {program.fullDescription?.split('\n').map((line, index) => (
                    <p key={index} className="mb-4">{line}</p>
                  ))}
                </div>
              </section>

              {isPurchased ? (
                <>
                  {/* Download buttons section */}
                  <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-6">Program Materials</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Complete Program Guide</h3>
                        <DownloadPDFButton program={program} />
                      </div>
                      
                      {program.positionSpecificSessions && (
                        <div>
                          <h3 className="text-xl font-semibold mb-4">Position-Specific Training Guides</h3>
                          <div className="grid grid-cols-2 gap-4">
                            {program.positionSpecificSessions.map((session, index) => (
                              <DownloadPDFButton
                                key={index}
                                program={program}
                                position={session.position}
                                type="position"
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <h3 className="text-xl font-semibold mb-4">Progress Tracking & Evaluation</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <DownloadPDFButton
                            program={program}
                            type="progress"
                          />
                          <DownloadPDFButton
                            program={program}
                            type="evaluation"
                          />
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-6">Program Schedule</h2>
                    <div className="space-y-8">
                      {program.weeklySchedule?.map((week) => (
                        <div key={week.weekNumber} className="border-l-4 border-[var(--primary-color)] pl-4">
                          <h3 className="text-xl font-semibold mb-2">
                            Week {week.weekNumber}: {week.focus}
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-gray-700 mb-2">Activities:</h4>
                              <ul className="space-y-2">
                                {week.activities.map((activity, index) => (
                                  <li key={index} className="text-gray-600">• {activity}</li>
                                ))}
                              </ul>
                            </div>
                            {week.drills && (
                              <div>
                                <h4 className="font-semibold text-gray-700 mb-2">Featured Drills:</h4>
                                <div className="grid gap-6">
                                  {week.drills.map((drill, index) => (
                                    <div key={index} className="bg-gray-50 p-6 rounded-lg">
                                      <h5 className="font-semibold text-[var(--primary-color)] mb-3">{drill.name}</h5>
                                      <p className="text-sm text-gray-600 mb-2">{drill.description}</p>
                                      <p className="text-sm text-gray-500 mb-4">Duration: {drill.duration}</p>
                                      {drill.progressions && (
                                        <div className="mb-4">
                                          <span className="text-sm font-medium">Progressions: </span>
                                          <span className="text-sm text-gray-600">{drill.progressions.join(" → ")}</span>
                                        </div>
                                      )}
                                      {drill.video && (
                                        <DrillVideo drill={drill} className="mt-4" />
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {program.positionSpecificSessions && (
                    <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
                      <h2 className="text-2xl font-bold mb-6">Position-Specific Training</h2>
                      <div className="space-y-8">
                        {program.positionSpecificSessions.map((posSession, index) => (
                          <div key={index} className="border-l-4 border-[var(--primary-color)] pl-4">
                            <h3 className="text-xl font-semibold mb-2">{posSession.position} Specialization</h3>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold text-gray-700 mb-2">Focus Areas:</h4>
                                <ul className="space-y-2">
                                  {posSession.focus?.map((item, i) => (
                                    <li key={i} className="text-gray-600">• {item}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-700 mb-2">Specialized Drills:</h4>
                                <div className="grid gap-4">
                                  {posSession.drills.map((drill, i) => (
                                    <div key={i} className="bg-gray-50 p-4 rounded-lg">
                                      <h5 className="font-semibold text-[var(--primary-color)]">{drill.name}</h5>
                                      <p className="text-sm text-gray-600 mb-2">{drill.description}</p>
                                      <p className="text-sm text-gray-500">Duration: {drill.duration}</p>
                                      {drill.progressions && (
                                        <div className="mt-2">
                                          <span className="text-sm font-medium">Progressions: </span>
                                          <span className="text-sm text-gray-600">
                                            {drill.progressions.join(" → ")}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {program.progressTracking && (
                    <section className="bg-white rounded-lg shadow-lg p-8">
                      <h2 className="text-2xl font-bold mb-6">Progress Tracking</h2>
                      <div className="grid gap-6">
                        <div>
                          <h3 className="text-xl font-semibold mb-3">Weekly Tracking</h3>
                          <ul className="list-disc pl-5 space-y-2">
                            {program.progressTracking.weekly.map((item, index) => (
                              <li key={index} className="text-gray-600">{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-3">Monthly Review</h3>
                          <ul className="list-disc pl-5 space-y-2">
                            {program.progressTracking.monthly.map((item, index) => (
                              <li key={index} className="text-gray-600">{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-3">Final Evaluation</h3>
                          <ul className="list-disc pl-5 space-y-2">
                            {program.progressTracking.endOfProgram.map((item, index) => (
                              <li key={index} className="text-gray-600">{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </section>
                  )}
                </>
              ) : (
                // Preview content for non-purchased programs
                <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
                  <h2 className="text-2xl font-bold mb-6">Program Preview</h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Program Highlights</h3>
                      <ul className="space-y-2">
                        {program.previewContent.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-center text-gray-600">
                            <span className="mr-2">•</span> {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Sample Week Preview</h3>
                      <div className="border-l-4 border-[var(--primary-color)] pl-4">
                        <h4 className="text-lg font-semibold mb-2">
                          Week {program.previewContent.sampleWeek.weekNumber}: {program.previewContent.sampleWeek.focus}
                        </h4>
                        <ul className="space-y-2 mb-4">
                          {program.previewContent.sampleWeek.objectives.map((objective, index) => (
                            <li key={index} className="text-gray-600">• {objective}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-gray-600">
                        Purchase this program to access:
                      </p>
                      <ul className="mt-4 space-y-2">
                        <li className="flex items-center text-gray-600">
                          <span className="mr-2">•</span> Complete weekly schedules and drills
                        </li>
                        <li className="flex items-center text-gray-600">
                          <span className="mr-2">•</span> Position-specific training sessions
                        </li>
                        <li className="flex items-center text-gray-600">
                          <span className="mr-2">•</span> Progress tracking tools
                        </li>
                        <li className="flex items-center text-gray-600">
                          <span className="mr-2">•</span> Video analysis and feedback
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-8 sticky top-8">
                <div className="text-center mb-8">
                  <div className="text-4xl font-bold text-[var(--primary-color)] mb-2">
                    ${program.price}
                  </div>
                  <div className="text-gray-600">
                    {program.duration} • {program.sessionsPerWeek} Sessions/Week
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-semibold mb-4">Program Includes:</h3>
                  <ul className="space-y-2">
                    {program.curriculum.map((item, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <span className="mr-2">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link 
                  href={`/checkout/${program.id}`}
                  className="btn-primary w-full text-center block"
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 