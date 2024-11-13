import React from "react";
import TypingCard from "@/components/TypingCard";
const About = () => {
  const cardContent = `
    <p>Website ini dirancang oleh Tim IT PSDKU POLINEMA KAMPUS LUMAJANG</p>
  `;
  return (
    <div className="app-container">
      <TypingCard title="Tentang Penulis" source={cardContent} />
    </div>
  );
};

export default About;
