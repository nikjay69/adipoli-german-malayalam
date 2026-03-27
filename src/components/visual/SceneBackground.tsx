'use client';

import { motion } from 'framer-motion';

interface SceneBackgroundProps {
  scene: string;  // cafe, bahnhof, street, classroom, kitchen, office, bakery, supermarket, apartment
  opacity?: number;
}

// Soft animated SVG illustrations rendered behind lesson content

function CafeScene() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      {/* Warm background */}
      <rect width="400" height="300" fill="#2a1a0e" />
      {/* Window */}
      <rect x="50" y="30" width="120" height="80" rx="5" fill="#3a2a1e" stroke="#d4a520" strokeWidth="0.5" opacity="0.3" />
      {/* Warm light glow */}
      <circle cx="110" cy="70" r="40" fill="#d4a520" opacity="0.05" />
      {/* Table */}
      <rect x="200" y="180" width="80" height="5" rx="2" fill="#5a3a1e" />
      <rect x="210" y="185" width="5" height="60" fill="#5a3a1e" />
      <rect x="265" y="185" width="5" height="60" fill="#5a3a1e" />
      {/* Coffee cup */}
      <motion.g animate={{ y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
        <rect x="225" y="165" width="20" height="15" rx="3" fill="#8B7355" />
        <rect x="245" y="170" width="8" height="5" rx="2" fill="none" stroke="#8B7355" strokeWidth="1.5" />
        {/* Steam */}
        <motion.path
          d="M230 162 Q233 155 236 162"
          fill="none" stroke="#fff" strokeWidth="0.8" opacity="0.2"
          animate={{ opacity: [0.1, 0.3, 0.1], y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        />
      </motion.g>
      {/* Menu board */}
      <rect x="300" y="40" width="60" height="80" rx="3" fill="#1a1a1a" stroke="#d4a520" strokeWidth="0.3" opacity="0.3" />
      {/* Decorative dots for text */}
      {[0, 1, 2, 3].map(i => (
        <rect key={i} x="310" y={55 + i * 15} width="40" height="3" rx="1" fill="#d4a520" opacity="0.15" />
      ))}
    </svg>
  );
}

function BahnhofScene() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#1a1a2e" />
      {/* Platform */}
      <rect x="0" y="220" width="400" height="80" fill="#2a2a3e" />
      <rect x="0" y="220" width="400" height="3" fill="#d4a520" opacity="0.2" />
      {/* Roof structure */}
      <path d="M0 30 L200 10 L400 30 L400 60 L0 60 Z" fill="#252540" opacity="0.5" />
      {/* Pillars */}
      {[80, 200, 320].map(x => (
        <rect key={x} x={x} y="60" width="6" height="160" fill="#3a3a50" />
      ))}
      {/* Departure board */}
      <rect x="140" y="70" width="120" height="40" rx="3" fill="#0a0a15" />
      <motion.rect
        x="150" y="78" width="100" height="6" rx="1" fill="#d4a520"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
      <rect x="150" y="90" width="80" height="4" rx="1" fill="#27ae60" opacity="0.3" />
      {/* Train (subtle) */}
      <motion.g
        animate={{ x: [-50, 450] }}
        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
      >
        <rect x="-200" y="200" width="180" height="25" rx="3" fill="#3a3a50" opacity="0.3" />
        {[0, 40, 80, 120].map(x => (
          <rect key={x} x={x - 195} y="205" width="25" height="15" rx="2" fill="#4a4a60" opacity="0.2" />
        ))}
      </motion.g>
      {/* Clock */}
      <circle cx="200" cy="50" r="12" fill="#1a1a2e" stroke="#d4a520" strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}

function StreetScene() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#1a2a1a" />
      {/* Sky gradient */}
      <rect width="400" height="120" fill="#1a1a2e" opacity="0.5" />
      {/* Buildings silhouette */}
      {[
        { x: 10, w: 60, h: 150 },
        { x: 80, w: 50, h: 120 },
        { x: 140, w: 70, h: 180 },
        { x: 250, w: 55, h: 140 },
        { x: 320, w: 80, h: 160 },
      ].map((b, i) => (
        <rect key={i} x={b.x} y={300 - b.h - 60} width={b.w} height={b.h} fill="#2a2a3e" opacity="0.4" />
      ))}
      {/* Windows (random lit) */}
      {[150, 160, 170, 255, 265, 330, 340].map((x, i) => (
        <motion.rect
          key={i} x={x} y={100 + (i % 3) * 25} width="8" height="10" rx="1"
          fill="#d4a520" opacity={0.1 + Math.random() * 0.15}
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ repeat: Infinity, duration: 3 + i, delay: i * 0.5 }}
        />
      ))}
      {/* Road */}
      <rect x="0" y="240" width="400" height="60" fill="#2a2a2a" opacity="0.4" />
      {/* Road markings */}
      {[50, 150, 250, 350].map(x => (
        <rect key={x} x={x} y="268" width="30" height="3" rx="1" fill="#d4a520" opacity="0.15" />
      ))}
      {/* Street lamp */}
      <rect x="195" y="100" width="3" height="140" fill="#5a5a5a" opacity="0.3" />
      <circle cx="197" cy="100" r="8" fill="#d4a520" opacity="0.08" />
      {/* Tree */}
      <motion.g animate={{ rotate: [-1, 1, -1] }} transition={{ repeat: Infinity, duration: 4 }} style={{ transformOrigin: '60px 240px' }}>
        <rect x="57" y="190" width="6" height="50" fill="#3a2a1e" opacity="0.4" />
        <circle cx="60" cy="180" r="25" fill="#27ae60" opacity="0.15" />
      </motion.g>
    </svg>
  );
}

function ClassroomScene() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#1a1a2e" />
      {/* Blackboard */}
      <rect x="80" y="30" width="240" height="120" rx="3" fill="#1a3a1a" stroke="#5a5a3a" strokeWidth="1" opacity="0.4" />
      {/* Chalk text suggestion */}
      <rect x="100" y="50" width="120" height="4" rx="1" fill="#f5f0e8" opacity="0.08" />
      <rect x="100" y="65" width="90" height="4" rx="1" fill="#f5f0e8" opacity="0.06" />
      <rect x="100" y="80" width="140" height="4" rx="1" fill="#f5f0e8" opacity="0.07" />
      {/* Desk rows */}
      {[0, 1, 2].map(row => (
        <g key={row}>
          {[0, 1, 2].map(col => (
            <rect key={col} x={60 + col * 110} y={180 + row * 35} width="80" height="5" rx="2" fill="#5a4a3a" opacity="0.25" />
          ))}
        </g>
      ))}
      {/* Clock */}
      <circle cx="350" cy="50" r="15" fill="none" stroke="#d4a520" strokeWidth="0.5" opacity="0.3" />
      <motion.line
        x1="350" y1="50" x2="350" y2="40"
        stroke="#d4a520" strokeWidth="0.5" opacity="0.3"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
        style={{ transformOrigin: '350px 50px' }}
      />
    </svg>
  );
}

function KitchenScene() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#1a2a1a" />
      {/* Counter */}
      <rect x="0" y="200" width="400" height="8" fill="#5a4a3a" opacity="0.3" />
      <rect x="0" y="208" width="400" height="92" fill="#2a2a1e" opacity="0.3" />
      {/* Cabinets above */}
      {[20, 120, 220, 320].map(x => (
        <rect key={x} x={x} y="40" width="70" height="50" rx="3" fill="#3a2a1e" stroke="#5a4a3a" strokeWidth="0.5" opacity="0.3" />
      ))}
      {/* Window */}
      <rect x="150" y="50" width="100" height="70" rx="3" fill="#2a3a4a" opacity="0.2" />
      <line x1="200" y1="50" x2="200" y2="120" stroke="#5a5a5a" strokeWidth="0.5" opacity="0.2" />
      {/* Pot on stove */}
      <rect x="60" y="185" width="40" height="15" rx="5" fill="#5a5a5a" opacity="0.3" />
      <motion.path
        d="M75 182 Q78 175 81 182" fill="none" stroke="#fff" strokeWidth="0.6" opacity="0.15"
        animate={{ opacity: [0.1, 0.2, 0.1], y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
      {/* Cutting board */}
      <rect x="280" y="190" width="50" height="8" rx="2" fill="#8B7355" opacity="0.25" />
    </svg>
  );
}

function OfficeScene() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#1a1a2e" />
      {/* Desk */}
      <rect x="50" y="180" width="300" height="8" rx="2" fill="#5a4a3a" opacity="0.3" />
      {/* Monitor */}
      <rect x="150" y="110" width="100" height="65" rx="3" fill="#0a0a15" stroke="#3a3a50" strokeWidth="0.5" opacity="0.4" />
      <rect x="190" y="175" width="20" height="8" fill="#3a3a50" opacity="0.3" />
      {/* Screen glow */}
      <rect x="155" y="115" width="90" height="55" rx="2" fill="#3b82f6" opacity="0.04" />
      {/* Keyboard */}
      <rect x="160" y="190" width="80" height="15" rx="2" fill="#2a2a3e" opacity="0.3" />
      {/* Document stack */}
      {[0, 2, 4].map(i => (
        <rect key={i} x={80 + i} y={165 - i} width="40" height="15" rx="1" fill="#f5f0e8" opacity="0.08" />
      ))}
      {/* Plant */}
      <rect x="330" y="160" width="12" height="20" rx="2" fill="#5a3a1e" opacity="0.3" />
      <circle cx="336" cy="155" r="15" fill="#27ae60" opacity="0.12" />
    </svg>
  );
}

const SCENE_COMPONENTS: Record<string, () => React.JSX.Element> = {
  cafe: CafeScene,
  bahnhof: BahnhofScene,
  street: StreetScene,
  classroom: ClassroomScene,
  kitchen: KitchenScene,
  office: OfficeScene,
  bakery: CafeScene,       // Reuse cafe for bakery
  supermarket: StreetScene, // Reuse street for supermarket
  apartment: KitchenScene,  // Reuse kitchen for apartment
};

/**
 * Animated SVG scene background rendered behind lesson content.
 * Subtle, low-opacity — atmosphere, not distraction.
 */
export function SceneBackground({ scene, opacity = 0.3 }: SceneBackgroundProps) {
  const SceneComponent = SCENE_COMPONENTS[scene];
  if (!SceneComponent) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 1.5 }}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    >
      <SceneComponent />
    </motion.div>
  );
}
