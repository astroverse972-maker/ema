import React from 'react';
import { motion } from 'framer-motion';

interface Section {
  id: string;
  title: string;
}

interface DotNavProps {
  sections: Section[];
  activeSection: string | null;
}

const DotNav: React.FC<DotNavProps> = ({ sections, activeSection }) => {

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <nav className="fixed top-1/2 right-4 md:right-8 transform -translate-y-1/2 z-50 hidden md:block">
      <ul className="space-y-4">
        {sections.map(section => (
          <li key={section.id} className="group flex items-center justify-end">
            <span className="text-sm font-semibold text-deep-umber/80 mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-warm-cream/80 px-2 py-1 rounded">
              {section.title}
            </span>
            <a 
              href={`#${section.id}`} 
              onClick={(e) => handleNavClick(e, section.id)}
              aria-label={`Go to ${section.title} section`}
            >
              <div className="relative w-3 h-3 flex items-center justify-center">
                {activeSection === section.id && (
                  <motion.div
                    layoutId="active-dot"
                    className="absolute w-4 h-4 bg-muted-rose rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <div className="w-2 h-2 bg-deep-umber/40 rounded-full group-hover:bg-muted-rose transition-colors duration-300" />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DotNav;