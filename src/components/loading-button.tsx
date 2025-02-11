import { ReactNode } from "react";
import { Button, ButtonProps } from "./ui/button";
import LoadingSpinner from "./loading-spinner";

type LoadingButtonProps = ButtonProps & {
  children: ReactNode;
  loading: boolean;
};

export default function LoadingButton({
  children,
  loading,
  ...props
}: LoadingButtonProps) {
  return (
    <Button type="submit" disabled={loading} {...props}>
      {loading ? <LoadingSpinner className="w-10 h-10" /> : children}
    </Button>
  );
}
