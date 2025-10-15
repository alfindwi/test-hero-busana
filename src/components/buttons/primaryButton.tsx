import { Button } from "@/components/ui/button";

interface ButtonProps {
  onClick: () => void
}


export function PrimaryButton({ onClick }: ButtonProps) {
  return <Button variant="blue" size="lg" {...onClick} />;
}
