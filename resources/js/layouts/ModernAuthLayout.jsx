export default function ModernAuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-white lg:grid lg:grid-cols-[45%_55%]">
      <div className="hidden items-center justify-center bg-white px-10 lg:flex">
        <img
          src="/images/auth-illustration.svg"
          alt="Authentication illustration"
          className="w-full max-w-xl"
        />
      </div>

      <div className="flex min-h-screen items-center justify-center bg-[#dc986f] px-6 py-12">
        {children}
      </div>
    </div>
  );
}
