import { useState } from 'react';

const navLinks = ['Labs', 'Studio', 'Openings', 'Shop'];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-10 px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center bg-transparent">
        <div className="flex flex-row items-center gap-3">
          <span className="text-[21px] sm:text-[26px] tracking-tight text-black font-medium select-none">
            Mainframe®
          </span>
          <span className="text-[25px] sm:text-[30px] text-black select-none tracking-[-0.02em] font-medium leading-none mb-1">
            ✱
          </span>
        </div>

        <nav className="hidden md:flex flex-row text-[23px] text-black">
          {navLinks.map((link, index) => (
            <span key={link} className="flex items-center">
              <a href="#" className="hover:opacity-60 transition-opacity">
                {link}
              </a>
              {index < navLinks.length - 1 && <span className="opacity-40">, </span>}
            </span>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden md:block text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
        >
          Get in touch
        </a>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          className="md:hidden relative z-10 flex flex-col justify-center items-center gap-[5px] w-8 h-8"
        >
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </header>

      <div
        className={`md:hidden fixed inset-0 z-[9] bg-white/95 backdrop-blur-sm transition-opacity duration-300 flex flex-col items-center justify-center gap-8 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link}
            href="#"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-3xl text-black hover:opacity-60 transition-opacity"
          >
            {link}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-3xl text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
        >
          Get in touch
        </a>
      </div>
    </>
  );
}
