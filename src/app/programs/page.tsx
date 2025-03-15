import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const programs = [
  {
    id: 1,
    title: "Youth Development Program (Ages 8-12)",
    description: "Based on Ajax's renowned youth academy methodology, focusing on individual skill development through the TIPS principle: Technique, Intelligence, Personality, and Speed.",
    fullDescription: `Our Youth Development Program follows the proven methodology used by Europe's top academies:
    • Technical Foundation: Ball mastery, first touch, and basic skill moves
    • Cognitive Development: Decision-making in small-sided games
    • Physical Literacy: Age-appropriate strength and coordination exercises
    • Game Understanding: Positional play and basic tactical concepts`,
    price: 199,
    duration: "12 weeks",
    sessionsPerWeek: 2,
    image: "https://images.unsplash.com/photo-1577706644415-ea35e8c6fac3?auto=format&fit=crop&w=800&q=80",
    curriculum: [
      "Ball Mastery & Control",
      "Passing & Receiving",
      "1v1 Skills",
      "Small-Sided Games",
      "Coordination & Movement",
      "Fun Team Challenges"
    ]
  },
  {
    id: 2,
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
      "Advanced Ball Control",
      "Speed & Agility with Ball",
      "Position-Specific Skills",
      "Game Tactics & Strategy",
      "Team Play Concepts",
      "Competitive Matches"
    ]
  },
  {
    id: 3,
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
      "Elite Technical Training",
      "Advanced Tactical Development",
      "Physical Conditioning",
      "Mental Performance",
      "Match Analysis",
      "Competition Preparation"
    ]
  }
];

export default function Programs() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center mb-8">Training Programs</h1>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Professional training programs designed by elite coaches, following methodologies from the world's top youth academies.
          </p>
          
          <div className="grid grid-cols-1 gap-12">
            {programs.map((program) => (
              <div key={program.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:flex-shrink-0 relative h-64 md:h-auto md:w-96">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 384px"
                    />
                  </div>
                  <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-[var(--primary-color)] font-semibold">
                      {program.duration} • {program.sessionsPerWeek} Sessions/Week
                    </div>
                    <h2 className="mt-2 text-2xl font-bold">{program.title}</h2>
                    <p className="mt-4 text-gray-600">{program.description}</p>
                    
                    <div className="mt-4">
                      <h3 className="font-semibold mb-2">Program Includes:</h3>
                      <ul className="grid grid-cols-2 gap-2">
                        {program.curriculum.map((item, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <span className="mr-2">•</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-8 flex items-center justify-between">
                      <span className="text-3xl font-bold text-[var(--primary-color)]">
                        ${program.price}
                      </span>
                      <Link 
                        href={`/programs/${program.id}`}
                        className="btn-primary"
                      >
                        View Program Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
} 