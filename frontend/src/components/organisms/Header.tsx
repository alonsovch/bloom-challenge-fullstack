import Image from "next/image";
import { Text } from '../atoms';

interface HeaderProps {
  className?: string;
}

export const Header = ({ className = '' }: HeaderProps) => {
  return (
    <header className={`flex justify-between items-center mb-12 ${className}`}>
      <div>
        <Text variant="h1" color="primary">
          Desafío Dev
        </Text>
        <Text variant="body" color="secondary" className="mt-2">
          Selecciona una marca para ver sus preguntas frecuentes
        </Text>
      </div>
      <Image
        className="h-14 w-auto"
        src="/images/Logo-Bloom.png"
        alt="Logo Bloom"
        width={400}
        height={100}
        priority
      />
    </header>
  );
}; 