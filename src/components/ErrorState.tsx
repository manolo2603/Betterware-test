import { Button } from "@heroui/react";

type ErrorStateProps = {
  message?: string;
  onRetry: () => void;
};

export function ErrorState({
  message = "Algo salio mal",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-lg font-medium text-danger">{message}</p>
      <Button color="primary" variant="flat" onPress={onRetry}>
        Reintentar
      </Button>
    </div>
  );
}
