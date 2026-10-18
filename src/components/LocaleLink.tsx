import { Link } from "@tanstack/react-router";
import { useLocale } from "@/lib/locale";
import { withPublicLocale } from "@/lib/publicLocale";
import type { ComponentProps } from "react";

type Props = {
  to: string;
  className?: string;
  children: React.ReactNode;
  onClick?: ComponentProps<"a">["onClick"];
  "aria-label"?: string;
  "aria-current"?: ComponentProps<"a">["aria-current"];
};

export function LocaleLink({ to, className, children, ...rest }: Props) {
  const locale = useLocale();
  const href = withPublicLocale(to, locale);
  return (
    <Link to={href} className={className} {...rest}>
      {children}
    </Link>
  );
}
