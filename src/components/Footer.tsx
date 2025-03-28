'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-4 px-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm">
      <div className="container mx-auto text-center">
        <p className="text-light-100/70 text-sm">
          © {currentYear} NextHire. All rights reserved.
        </p>
      </div>
    </footer>
  );
}