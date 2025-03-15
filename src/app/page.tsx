import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  const featuredPrograms = [
    {
      id: 1,
      title: "Youth Development Program",
      description: "Comprehensive training for ages 8-12 focusing on fundamental skills",
      price: 199,
      image: "https://images.unsplash.com/photo-1577706644415-ea35e8c6fac3?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Advanced Skills Camp",
      description: "Intensive training for ages 13-16 to master advanced techniques",
      price: 299,
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Elite Performance",
      description: "High-performance training for competitive players aged 15-18",
      price: 399,
      image: "https://images.unsplash.com/photo-1551280857-2b9bbe52acf4?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative h-[600px]">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <Image
            src="https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?auto=format&fit=crop&w=1920&q=80"
            alt="Professional soccer training session"
            fill
            className="object-cover"
            priority
          />
          <div className="relative z-20 h-full flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-5xl font-bold mb-4">
                Elevate Your Soccer Game
              </h1>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Professional training programs designed to develop the next generation of soccer stars
              </p>
              <Link href="/programs" className="btn-primary text-lg">
                Explore Programs
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Programs */}
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Training Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPrograms.map((program) => (
              <div key={program.id} className="card">
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-[var(--primary-color)]">
                    ${program.price}
                  </span>
                  <Link href={`/programs/${program.id}`} className="btn-secondary">
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
