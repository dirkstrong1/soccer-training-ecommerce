import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

interface WarmUp {
  title: string;
  duration: string;
  description: string;
  exercises: string[];
}

interface Activity {
  title: string;
  duration: string;
  setup: string;
  stations?: string[];
  coachingPoints?: string[];
  progressions?: string[];
  rules?: string[];
}

interface CoolDown {
  title: string;
  duration: string;
  activities: string[];
}

interface SessionPlan {
  title: string;
  ageGroup: string;
  duration: string;
  objectives: string[];
  warmUp: WarmUp;
  mainActivities: Activity[];
  coolDown: CoolDown;
}

interface CoachingTip {
  category: string;
  tips: string[];
}

interface SafetyGuideline {
  title: string;
  items: string[];
}

interface CoachingResources {
  sessionPlans: SessionPlan[];
  coachingTips: CoachingTip[];
  safetyGuidelines: SafetyGuideline[];
}

const coachingResources: CoachingResources = {
  sessionPlans: [
    {
      title: "Technical Training Session",
      ageGroup: "8-12",
      duration: "90 minutes",
      objectives: [
        "Improve ball control",
        "Develop first touch",
        "Practice basic moves"
      ],
      warmUp: {
        title: "Dynamic Movement with Ball",
        duration: "15 minutes",
        description: "Players perform dynamic stretches while maintaining ball control",
        exercises: [
          "Toe taps in place",
          "Ball rolls with both feet",
          "Light dribbling with direction changes",
          "Partner passing while moving"
        ]
      },
      mainActivities: [
        {
          title: "First Touch Station Work",
          duration: "20 minutes",
          setup: "4 stations, 5 minutes per station, groups of 3-4 players",
          stations: [
            "Ground passes - controlling with different surfaces",
            "Bouncing balls - thigh and foot control",
            "Air balls - chest control",
            "Moving balls - controlling while in motion"
          ],
          coachingPoints: [
            "Soft first touch",
            "Body behind the ball",
            "Ready position",
            "Look before receiving"
          ]
        },
        {
          title: "Skill Move Circuit",
          duration: "20 minutes",
          setup: "Individual work then partner practice",
          progressions: [
            "Step 1: Walking pace practice",
            "Step 2: Jogging with move",
            "Step 3: Speed with defender",
            "Step 4: Game application"
          ]
        },
        {
          title: "Small-Sided Games",
          duration: "25 minutes",
          setup: "4v4 games with focus on application",
          rules: [
            "Must use skill move before scoring",
            "Extra point for successful move",
            "Maximum 3 touches"
          ]
        }
      ],
      coolDown: {
        title: "Technical Review",
        duration: "10 minutes",
        activities: [
          "Light passing in pairs",
          "Stretching circle",
          "Skills review discussion"
        ]
      }
    },
    {
      title: "Advanced Attacking Play",
      ageGroup: "13-16",
      duration: "100 minutes",
      objectives: [
        "Develop attacking movements",
        "Improve shooting technique",
        "Practice combination play",
        "Build attacking confidence"
      ],
      warmUp: {
        title: "Dynamic Attacking Movement",
        duration: "20 minutes",
        description: "Progressive warm-up focusing on attacking movements and shooting preparation",
        exercises: [
          "Dynamic stretching with ball",
          "Shooting technique practice",
          "Quick feet and agility",
          "Short passing combinations"
        ]
      },
      mainActivities: [
        {
          title: "Finishing School",
          duration: "25 minutes",
          setup: "Multiple goals, rotating groups of 4-5 players",
          stations: [
            "One-touch finishing",
            "Turning and shooting",
            "Volleys and half-volleys",
            "1v1 with goalkeeper"
          ],
          coachingPoints: [
            "Body shape and balance",
            "Shot selection and technique",
            "Quick release",
            "Follow through and recovery"
          ]
        },
        {
          title: "Combination Attack",
          duration: "25 minutes",
          setup: "Half-field setup with full-size goal",
          progressions: [
            "2v1 combinations",
            "3v2 with support",
            "4v3 attacking overload",
            "Full attack vs defense"
          ],
          coachingPoints: [
            "Movement off the ball",
            "Timing of runs",
            "Decision making",
            "Communication"
          ]
        },
        {
          title: "Attack vs Defense",
          duration: "20 minutes",
          setup: "Small-sided games with focus on attacking",
          rules: [
            "Must score within 30 seconds",
            "Points for different types of goals",
            "Bonus for combination play goals"
          ]
        }
      ],
      coolDown: {
        title: "Technical Finishing",
        duration: "10 minutes",
        activities: [
          "Light shooting practice",
          "Stretching",
          "Attack pattern review"
        ]
      }
    },
    {
      title: "Elite Defensive Organization",
      ageGroup: "15-18",
      duration: "90 minutes",
      objectives: [
        "Develop defensive positioning",
        "Practice defensive transitions",
        "Improve communication",
        "Master pressing triggers"
      ],
      warmUp: {
        title: "Defensive Movement Patterns",
        duration: "15 minutes",
        description: "Structured warm-up focusing on defensive footwork and coordination",
        exercises: [
          "Defensive shuffling",
          "Recovery runs",
          "1v1 shadow work",
          "Unit movement patterns"
        ]
      },
      mainActivities: [
        {
          title: "Pressing Patterns",
          duration: "20 minutes",
          setup: "Full team organized in game formations",
          stations: [
            "Individual pressing technique",
            "Unit pressing coordination",
            "Full team pressing patterns",
            "Transition pressing"
          ],
          coachingPoints: [
            "Body position",
            "Pressing angles",
            "Communication",
            "Recovery positions"
          ]
        },
        {
          title: "Defensive Transitions",
          duration: "25 minutes",
          setup: "Three-zone field with transition focus",
          progressions: [
            "Immediate press after loss",
            "Recovery runs and tracking",
            "Defensive overloads",
            "Counter-attack prevention"
          ]
        },
        {
          title: "Game Application",
          duration: "20 minutes",
          setup: "Full-sided game with defensive focus",
          rules: [
            "Points for successful pressing",
            "Bonus for clean sheets",
            "Limited touches in build-up",
            "Must win ball in designated zones"
          ]
        }
      ],
      coolDown: {
        title: "Recovery & Analysis",
        duration: "10 minutes",
        activities: [
          "Light jogging",
          "Static stretching",
          "Defensive organization review"
        ]
      }
    },
    {
      title: "Midfield Mastery",
      ageGroup: "14-17",
      duration: "95 minutes",
      objectives: [
        "Improve ball circulation",
        "Develop spatial awareness",
        "Master receiving positions",
        "Practice progressive passing"
      ],
      warmUp: {
        title: "Technical Preparation",
        duration: "15 minutes",
        description: "Ball mastery and passing warm-up focused on midfield skills",
        exercises: [
          "Rondo variations",
          "Position-specific movements",
          "First touch directional practice",
          "Quick combination plays"
        ]
      },
      mainActivities: [
        {
          title: "Possession Control",
          duration: "25 minutes",
          setup: "Multiple possession grids with different constraints",
          stations: [
            "3v1 possession",
            "4v2 with targets",
            "5v5 positional game",
            "Transition rondos"
          ],
          coachingPoints: [
            "Body orientation",
            "Scanning before receiving",
            "Pass selection",
            "Support angles"
          ]
        },
        {
          title: "Midfield Scenarios",
          duration: "30 minutes",
          setup: "Half-field tactical situations",
          progressions: [
            "Building through midfield",
            "Breaking lines",
            "Switching play",
            "Counter-pressing"
          ],
          coachingPoints: [
            "Positioning between lines",
            "Movement to receive",
            "Progressive passing",
            "Defensive transitions"
          ]
        },
        {
          title: "Game Integration",
          duration: "15 minutes",
          setup: "Small-sided games with midfield focus",
          rules: [
            "Must play through midfield",
            "Limited touches",
            "Designated zones",
            "Quick transition rules"
          ]
        }
      ],
      coolDown: {
        title: "Technical Review",
        duration: "10 minutes",
        activities: [
          "Light possession work",
          "Stretching",
          "Tactical discussion"
        ]
      }
    }
  ],
  coachingTips: [
    {
      category: "Communication",
      tips: [
        "Use age-appropriate language",
        "Give clear, concise instructions",
        "Demonstrate rather than just explain",
        "Provide positive reinforcement",
        "Use guided discovery questions"
      ]
    },
    {
      category: "Session Management",
      tips: [
        "Plan transitions between activities",
        "Keep all players active",
        "Adjust difficulty based on success rate",
        "Have progressions ready",
        "Monitor fatigue levels"
      ]
    },
    {
      category: "Skill Development",
      tips: [
        "Focus on proper technique first",
        "Add pressure gradually",
        "Use game-realistic scenarios",
        "Allow for creative expression",
        "Celebrate improvement"
      ]
    }
  ],
  safetyGuidelines: [
    {
      title: "Pre-Session Checklist",
      items: [
        "Inspect training area for hazards",
        "Check equipment condition",
        "Review weather conditions",
        "Have first aid kit ready",
        "Know emergency procedures"
      ]
    },
    {
      title: "During Session",
      items: [
        "Monitor hydration breaks",
        "Watch for signs of fatigue",
        "Maintain proper player-to-coach ratios",
        "Ensure appropriate contact levels",
        "Adapt to conditions"
      ]
    }
  ]
};

export default function CoachingResources() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center mb-8">Coaching Resources</h1>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Comprehensive guides and session plans for coaches to deliver high-quality training sessions.
          </p>

          {/* Session Plans */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Sample Session Plans</h2>
            {coachingResources.sessionPlans.map((session, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <div className="border-b pb-4 mb-6">
                  <h3 className="text-2xl font-bold mb-2">{session.title}</h3>
                  <div className="flex gap-4 text-gray-600">
                    <span>Age Group: {session.ageGroup}</span>
                    <span>Duration: {session.duration}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Objectives */}
                  <div>
                    <h4 className="text-xl font-semibold mb-3">Session Objectives</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {session.objectives.map((objective, i) => (
                        <li key={i} className="text-gray-600">{objective}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Warm Up */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-xl font-semibold mb-3">{session.warmUp.title}</h4>
                    <p className="text-gray-600 mb-3">Duration: {session.warmUp.duration}</p>
                    <p className="text-gray-600 mb-4">{session.warmUp.description}</p>
                    <ul className="list-disc pl-5 space-y-2">
                      {session.warmUp.exercises.map((exercise, i) => (
                        <li key={i} className="text-gray-600">{exercise}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Main Activities */}
                  <div className="space-y-6">
                    <h4 className="text-xl font-semibold">Main Activities</h4>
                    {session.mainActivities.map((activity, i) => (
                      <div key={i} className="bg-gray-50 p-6 rounded-lg">
                        <h5 className="text-lg font-semibold mb-2">{activity.title}</h5>
                        <p className="text-gray-600 mb-2">Duration: {activity.duration}</p>
                        <p className="text-gray-600 mb-4">{activity.setup}</p>
                        
                        {activity.stations && (
                          <div className="mb-4">
                            <h6 className="font-semibold mb-2">Stations:</h6>
                            <ul className="list-disc pl-5 space-y-2">
                              {activity.stations.map((station, j) => (
                                <li key={j} className="text-gray-600">{station}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {activity.coachingPoints && (
                          <div className="mb-4">
                            <h6 className="font-semibold mb-2">Coaching Points:</h6>
                            <ul className="list-disc pl-5 space-y-2">
                              {activity.coachingPoints.map((point, j) => (
                                <li key={j} className="text-gray-600">{point}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {activity.progressions && (
                          <div className="mb-4">
                            <h6 className="font-semibold mb-2">Progressions:</h6>
                            <ul className="list-disc pl-5 space-y-2">
                              {activity.progressions.map((progression, j) => (
                                <li key={j} className="text-gray-600">{progression}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {activity.rules && (
                          <div>
                            <h6 className="font-semibold mb-2">Rules:</h6>
                            <ul className="list-disc pl-5 space-y-2">
                              {activity.rules.map((rule, j) => (
                                <li key={j} className="text-gray-600">{rule}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Cool Down */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-xl font-semibold mb-3">{session.coolDown.title}</h4>
                    <p className="text-gray-600 mb-3">Duration: {session.coolDown.duration}</p>
                    <ul className="list-disc pl-5 space-y-2">
                      {session.coolDown.activities.map((activity, i) => (
                        <li key={i} className="text-gray-600">{activity}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Coaching Tips */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Coaching Tips</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {coachingResources.coachingTips.map((category, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-xl font-bold mb-4">{category.category}</h3>
                  <ul className="space-y-3">
                    {category.tips.map((tip, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-[var(--primary-color)] mr-2">•</span>
                        <span className="text-gray-600">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Safety Guidelines */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Safety Guidelines</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {coachingResources.safetyGuidelines.map((guideline, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-xl font-bold mb-4">{guideline.title}</h3>
                  <ul className="space-y-3">
                    {guideline.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-[var(--primary-color)] mr-2">•</span>
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
} 