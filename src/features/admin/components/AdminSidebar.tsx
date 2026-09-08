
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { SidebarContent } from "./SidebarContent";


interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export const AdminSidebar = ({ open, onClose }: AdminSidebarProps) => {

  const pathname = usePathname();

  return (
    <>
      {/* Desktop */}
      <aside className="hidden w-64 shrink-0 flex-col bg-slate-950 text-white lg:flex">
        <SidebarContent onClose={onClose} pathname={pathname} />
      </aside>

      {/* Mobile */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              onClick={onClose}
              transition={{ duration: 0.2 }}
            />
            <motion.aside
              animate={{ x: 0 }}
              className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-slate-950 text-white lg:hidden"
              exit={{ x: "-100%" }}
              initial={{ x: "-100%" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <SidebarContent onClose={onClose} pathname={pathname} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

