export function Panel({
  title,
  subtitle,
  action,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`panel ${className}`}>
      <header className="panel-header">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-primary" />
          <span>{title}</span>
          {subtitle && <span className="normal-case tracking-normal text-muted-foreground/70 ml-2">{subtitle}</span>}
        </div>
        {action}
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-6 mb-6">
      <div>
        <div className="text-[10px] tracking-[0.22em] text-primary mb-1">{eyebrow}</div>
        <h1 className="text-3xl font-display">{title}</h1>
        {description && <p className="mt-1.5 text-sm text-muted-foreground max-w-2xl">{description}</p>}
      </div>
      {actions}
    </div>
  );
}

export function Tag({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "success" | "warning" | "danger" | "info" | "primary";
}) {
  const map = {
    default: "bg-muted text-muted-foreground",
    success: "bg-success/15 text-success",
    warning: "bg-warning/15 text-warning",
    danger: "bg-destructive/15 text-destructive",
    info: "bg-info/15 text-info",
    primary: "bg-primary/15 text-primary",
  } as const;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] mono tracking-wider uppercase ${map[tone]}`}>
      {children}
    </span>
  );
}

export function Bar({ value, tone = "primary" }: { value: number; tone?: "primary" | "success" | "warning" | "danger" }) {
  const colors = {
    primary: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-destructive",
  };
  return (
    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
      <div className={`h-full ${colors[tone]}`} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}
