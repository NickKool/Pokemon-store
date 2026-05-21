export function AboutPage() {
  return (
    <div className="text-center p-8 text-main-text max-w-2xl mx-auto flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold text-input-focus">About Us</h1>
      <p className="text-sub-text text-lg">
        Hi there! My name is <span className="text-main-text font-semibold">Nikolay</span>. I am an
        aspiring Frontend Developer passionate about building clean, efficient, and user-friendly
        web applications.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center">
        <a
          href="https://github.com/NickKool"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-2.5 bg-search-bg border border-input-border text-main-text rounded-md font-medium hover:opacity-80 transition shadow-md"
        >
          My GitHub Profile
        </a>
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-2.5 bg-input-focus text-input-bg rounded-md font-semibold hover:opacity-90 transition shadow-md"
        >
          RS School React Course
        </a>
      </div>
    </div>
  );
}
