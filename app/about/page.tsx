import Link from "next/link"

export default function AboutPage() {
  return (
    <main className="bg-yellow-50 text-yellow-950 min-h-screen pb-16">
      {/* Hero/About Header */}
      <section className="bg-yellow-100 py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About Cyber Sanjay
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-yellow-900">
          Helping beginners take their first confident step into cybersecurity —
          with clarity, guidance, and real-world focus.
        </p>
      </section>

      {/* Why This Exists */}
      <section id="why-this-exists" className="mt-12 px-6 max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-semibold text-yellow-900">
          Why This Exists
        </h2>
        <p className="text-yellow-900 text-lg leading-relaxed">
          Cybersecurity can feel overwhelming at the beginning — there’s a huge
          volume of information, scattered tutorials, and no clear roadmap.
          Most beginners don’t need more theory, they need direction. That's why
          Cyber Sanjay exists — to provide simple, clear, practical guidance that
          empowers learners to make steady progress without confusion.
        </p>
      </section>

      {/* What You Get */}
      <section id="what-you-get" className="mt-12 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-yellow-900 mb-6">
          What You Get
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-yellow-900">
              Practical, Beginner-Friendly Learning
            </h3>
            <p className="text-yellow-900 mt-2 leading-relaxed">
              Everything is built with beginners in mind — step-by-step tasks,
              clear explanations, and hands-on examples so you build real skills,
              not just watch videos.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-yellow-900">
              Roadmaps You Can Follow
            </h3>
            <p className="text-yellow-900 mt-2 leading-relaxed">
              Instead of random content, you get focused roadmaps that tell you
              exactly what to study, why it matters, and how to apply it.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-yellow-900">
              Confidence & Clarity
            </h3>
            <p className="text-yellow-900 mt-2 leading-relaxed">
              Many beginners don’t struggle with motivation — they struggle with
              clarity. Our content helps you understand the *why* and *how* behind
              each concept.
            </p>
          </div>
        </div>
      </section>

      {/* Note from Sanjay */}
      <section className="mt-12 px-6 max-w-4xl mx-auto bg-yellow-200 p-8 rounded-lg">
        <h2 className="text-3xl font-semibold text-yellow-900 text-center mb-4">
          A Note From Sanjay
        </h2>
        <p className="text-yellow-900 text-lg leading-relaxed text-center">
          I’ve mentored hundreds of cybersecurity beginners and realized that
          the biggest challenge isn’t motivation — it’s *clarity*. Most people
          don’t know where to start or what steps actually matter. My goal with
          Cyber Sanjay is to simplify that first step and help you build a strong
          foundation with confidence. This isn’t about quick tricks — it’s about
          real understanding.
        </p>
      </section>

      {/* Call to Action */}
      {/* <section className="mt-16 text-center px-6">
        <p className="text-xl font-semibold text-yellow-900 mb-4">
          Ready to take the first step?
        </p>
        <Link href="/auth/sign-up">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-bold px-8 py-3 rounded-lg transition">
            Get Started
          </button>
        </Link>
      </section> */}
    </main>
  )
}
