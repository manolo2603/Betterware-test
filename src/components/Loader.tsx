import { Spinner } from "@heroui/react";

type LoaderProps = {
  label?: string;
};

export function Loader({ label = "Cargando..." }: LoaderProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Spinner color="primary" label={label} />
    </div>
  );
}
