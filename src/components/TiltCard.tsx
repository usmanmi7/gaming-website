import { useRef, useState } from "react";
import { cn } from "../utils/cn";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

const TiltCard = ({ children, className = "" }: TiltCardProps) => {
  const [transform, setTransform] = useState("");
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!itemRef.current) return;
    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();
    const relX = (e.clientX - left) / width;
    const rotateY = ((e.clientY - top) / height - 0.5) * 5;
    const rotateX = -(relX - 0.5) * 5;
    setTransform(
      `perspective(700px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(.95, .95, .95)`
    );
  };

  const handleMouseLeave = () => {
    setTransform("");
  };

  return (
    <div
      ref={itemRef}
      className={cn(className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
    >
      {children}
    </div>
  );
};

export default TiltCard;
