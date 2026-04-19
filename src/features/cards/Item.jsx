export const Item = ({ title, Icon, onClick }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      className="flex flex-col items-center justify-center gap-2 p-4 min-w-24 rounded-xl bg-white shadow-md cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-300 active:scale-95"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
    >
      <Icon className="size-9 text-gray-700" />
      <p className="text-sm font-medium text-gray-800 text-center">{title}</p>
    </div>
  );
};