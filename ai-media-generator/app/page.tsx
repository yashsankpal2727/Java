import Link from 'next/link';

export default function Home() {
  const features = [
    {
      title: 'Text to Image',
      description: 'Transform your text prompts into stunning, high-quality images with AI',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Text to Video',
      description: 'Create engaging videos from simple text descriptions in seconds',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Style Presets',
      description: 'Choose from multiple artistic styles: Realistic, Artistic, Cinematic, and more',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Batch Generation',
      description: 'Generate multiple images or videos at once to save time',
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  const useCases = [
    { name: 'Marketing', emoji: '📢' },
    { name: 'Social Media', emoji: '📱' },
    { name: 'Product Design', emoji: '🎨' },
    { name: 'Storytelling', emoji: '📖' },
    { name: 'Education', emoji: '🎓' },
    { name: 'Entertainment', emoji: '🎬' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="block text-gray-900 dark:text-white">Turn Ideas Into</span>
            <span className="block bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Visual Masterpieces
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
            Generate stunning images and videos from text prompts using AI. 
            Perfect for creative projects, marketing campaigns, and bringing your imagination to life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/generate"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              Start Creating
            </Link>
            <Link
              href="/gallery"
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 rounded-xl font-semibold text-lg hover:border-purple-500 dark:hover:border-purple-500 transition-all duration-200"
            >
              View Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4`}></div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Perfect For Every Use Case
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center hover:scale-105 transition-transform duration-200 shadow-md"
            >
              <div className="text-4xl mb-2">{useCase.emoji}</div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {useCase.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Create Something Amazing?
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Start generating stunning visuals in seconds
          </p>
          <Link
            href="/generate"
            className="inline-block px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}
