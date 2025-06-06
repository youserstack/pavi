import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";

export function ProductImage({ imageUrl }: { imageUrl: string }) {
  return (
    <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
      <Image
        src={
          imageUrl ||
          "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        }
        alt="Photo by Drew Beamer"
        fill
        className="h-full w-full object-cover"
      />
    </AspectRatio>
  );
}
