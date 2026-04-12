import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
}

export default function Container({
  children,
  className = "",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full max-w-[1440px] px-5 sm:px-10 md:px-16 lg:px-20 ${className}`}
    >
      {children}
    </Tag>
  );
}
