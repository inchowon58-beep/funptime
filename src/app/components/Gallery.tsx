import Image from "next/image";
import { SITE } from "@/lib/site";
import { imageUrl, galleryAlt } from "@/lib/images";

const INDICES = [2, 4, 6, 9, 11, 14, 16, 17];

export default function Gallery() {
  return (
    <section id="gallery" className="section">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-[var(--sky)]">SPACE</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
            식장과 추모의 분위기
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            {SITE.brand}가 안내하는 공간의 결입니다. 실제 일정은 상담에서 확정합니다.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {INDICES.map((i) => (
            <div key={i} className="rounded-media relative aspect-square overflow-hidden shadow-sm">
              <Image
                src={imageUrl(i)}
                alt={galleryAlt(i)}
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
