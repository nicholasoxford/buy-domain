import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, X } from "lucide-react";

interface NameserverListProps {
  nameservers: string[];
  onChange: (nameservers: string[]) => void;
  disabled?: boolean;
}

export default function NameserverList({
  nameservers,
  onChange,
  disabled = false,
}: NameserverListProps) {
  const addNameserver = () => {
    onChange([...nameservers, ""]);
  };

  const removeNameserver = (index: number) => {
    const newNameservers = nameservers.filter((_, i) => i !== index);
    onChange(newNameservers);
  };

  const updateNameserver = (index: number, value: string) => {
    const newNameservers = [...nameservers];
    newNameservers[index] = value;
    onChange(newNameservers);
  };

  return (
    <div className="space-y-4">
      {nameservers.map((ns, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            placeholder={`Nameserver ${index + 1}`}
            value={ns}
            onChange={(e) => updateNameserver(index, e.target.value)}
            disabled={disabled}
          />
          {nameservers.length > 2 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeNameserver(index)}
              disabled={disabled}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={addNameserver}
        disabled={disabled}
        className="w-full"
      >
        <PlusCircle className="h-4 w-4 mr-2" />
        Add Nameserver
      </Button>
    </div>
  );
}
