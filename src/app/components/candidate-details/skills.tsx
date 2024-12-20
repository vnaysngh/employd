import React from "react";

const Skills = ({ skills }: { skills: any }) => {
  return (
    <ul className="style-none skill-tags d-flex flex-wrap pb-25">
      {skills?.map((skill: { label: string; value: string }, index: number) => (
        <li key={index}>{skill.label}</li>
      ))}
    </ul>
  );
};

export default Skills;
