import React, { useEffect } from "react";

interface MoodSelectorProps {
  mood: string | null;
  setMood: (mood: string) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ mood, setMood }) => {
  const moods = [
    { icon: "😊", label: "Feliz" },
    { icon: "😢", label: "Triste" },
    { icon: "😰", label: "Ansiosa" },
    { icon: "🤩", label: "Animada" },
  ];

  useEffect(() => {
    const savedMood = localStorage.getItem('mood');
    if (savedMood) {
      setMood(savedMood);
    }
  }, [setMood]);

  useEffect(() => {
    if (mood) {
      localStorage.setItem('mood', mood);
    } else {
      localStorage.removeItem('mood');
    }
  }, [mood]);

  return (
    <div className="mood">
      <p className="mood__text">Como você está se sentindo?</p>
      <div role="group" aria-label="Seleção de humor">
        {moods.map(({ icon, label }) => (
          <button
            key={icon}
            type="button"
            onClick={() => {
              setMood(icon);
            }}
            aria-label={label}
            className={mood === icon ? "selected" : ""}
          >
            {icon}
          </button>
        ))}
      </div>
      {mood && <p>Seu humor hoje: {mood}</p>}
    </div>
  );
};

export default MoodSelector;
