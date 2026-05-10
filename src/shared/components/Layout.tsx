import { Activity, Dumbbell, Home, LogOut, Salad, Sparkles } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { useSignOut, useSession } from "../../features/auth/hooks";
import { Button } from "./Button";
import { cn } from "../lib/utils";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/activities", label: "Attività", icon: Activity },
  { to: "/meals", label: "Pasti", icon: Salad },
  { to: "/coach", label: "Coach", icon: Sparkles },
];

export function Layout() {
  const { data: session } = useSession();
  const signOut = useSignOut();
  const userLabel = session?.user.email ?? "Demo mode";

  return (
    <div className="min-h-screen bg-cloud">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 resize-x overflow-auto border-r border-ink/10 bg-white px-4 py-5 lg:block">
        <div className="flex items-center gap-3 px-2">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-mint text-moss">
            <Dumbbell size={22} />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-moss">Fitness AI</p>
            <p className="text-xs text-ink/55">Coach mock MVP</p>
          </div>
        </div>
        <nav className="mt-8 grid gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold text-ink/70 transition",
                  isActive ? "bg-ink text-white" : "hover:bg-ink/5 hover:text-ink",
                )
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="min-w-0 lg:pl-64">
        <header className="sticky top-0 z-10 border-b border-ink/10 bg-cloud/90 px-4 py-3 backdrop-blur lg:px-8">
          <div className="mx-auto flex w-full max-w-[96rem] items-center justify-between gap-3">
            <nav className="flex gap-1 overflow-x-auto lg:hidden">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "grid h-10 w-10 shrink-0 place-items-center rounded-md transition",
                      isActive ? "bg-ink text-white" : "bg-white text-ink/65",
                    )
                  }
                  aria-label={item.label}
                  title={item.label}
                >
                  <item.icon size={18} />
                </NavLink>
              ))}
            </nav>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink/60">{userLabel}</p>
              <p className="truncate text-lg font-black text-ink">Allenamento e alimentazione</p>
            </div>
            <Button variant="secondary" icon={<LogOut size={16} />} onClick={() => signOut.mutate()} disabled={signOut.isPending}>
              Logout
            </Button>
          </div>
        </header>
        <main className="mx-auto w-full max-w-[96rem] min-w-0 px-3 py-5 sm:px-4 sm:py-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
