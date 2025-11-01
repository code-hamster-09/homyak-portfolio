import { Input } from "./input";

export const ModalExample: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-accent-purple/40 backdrop-blur-xl p-4 rounded-3xl space-y-2 max-w-100 w-full">
        <h2 className="text-lg font-bold">Введите пароль</h2>
        <Input className="px-3 py-2 rounded-2xl border border-text-secondary/30 bg-text-secondary/20" type="password"/>
      </div>
    </div>
  );
};
