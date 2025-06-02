export function getContrastTextColor(
  bgClass: string
): "text-foreground" | "text-primary-foreground" {
  const lightBackgrounds = [
    "bg-white",
    "bg-neutral-100",
    "bg-neutral-200",
    "bg-stone-200",
    "bg-amber-500",
    "bg-yellow-100",
    "bg-yellow-200",
  ];

  if (lightBackgrounds.includes(bgClass)) return "text-foreground";
  return "text-primary-foreground";
}
