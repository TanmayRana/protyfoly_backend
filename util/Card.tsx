import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

//  ${
//          hover
//            ? "hover:shadow-xl hover:scale-105 transition-all duration-300"
//            : ""
//        }

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hover = true,
}) => {
  return (
    <div
      className={`
      bg-white rounded-xl shadow-lg backdrop-blur-sm bg-opacity-80
       ${
         hover
           ? "hover:shadow-xl hover:scale-105 transition-all duration-300"
           : ""
       }
      ${className}
    `}
    >
      {children}
    </div>
  );
};

export default Card;
