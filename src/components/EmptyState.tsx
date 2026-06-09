import type { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyState({ icon, title, description, action }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center bg-white/[0.03] backdrop-blur-xl border-2 border-dashed border-white/10 rounded-2xl">
      <div className="w-16 h-16 bg-violet-500/10 rounded-2xl flex items-center justify-center mb-4 border border-violet-500/20">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      {description && <p className="text-sm text-white/50 max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
