export function AboutPage() {
  return (
    <div className="text-center p-8 text-white max-w-2xl mx-auto flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold text-yellow-400">About Us</h1>
      <p className="text-gray-300 text-lg">
        Hi there! My name is <span className="text-white font-semibold">Nikolay</span>. I am an
        aspiring Frontend Developer passionate about building clean, efficient, and user-friendly
        web applications.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center">
        <a
          href="https://github.com/NickKool"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-2.5 bg-gray-800 border border-gray-600 text-white rounded-md font-medium hover:bg-gray-700 transition shadow-md"
        >
          My GitHub Profile
        </a>

        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-2.5 bg-yellow-500 text-black rounded-md font-semibold hover:bg-yellow-400 transition shadow-md"
        >
          RS School React Course
        </a>
      </div>
    </div>
  );
}
