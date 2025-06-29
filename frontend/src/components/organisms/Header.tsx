import Image from "next/image";

interface HeaderProps {
  className?: string;
}

export const Header = ({ className = '' }: HeaderProps) => {
  return (
    <header className={`flex justify-center items-center mb-16 ${className}`}>
      <Image
        className="h-12 w-auto"
        src="/images/Logo-Bloom.png"
        alt="Logo Bloom"
        width={400}
        height={100}
        priority
      />
    </header>
  );
}; 