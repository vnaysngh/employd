import React from "react";

const Skills = ({ skills }: { skills: any }) => {
  return (
    <ul className="style-none skill-tags d-flex flex-wrap pb-25">
      {skills?.map((skill: string) => (
        <li>{skill}</li>
      ))}
    </ul>
  );
};

export default Skills;
