"use client";

import { useCallback, useState } from "react";
import { CHARACTERS } from "@/lib/characters";
import { SALES_TYPES } from "@/lib/salesTypes";
import type { SalesTypeId } from "@/lib/types";

const SIZE_CLASSES = {
  sm: "h-12 w-12 text-2xl",
  md: "h-20 w-20 text-4xl",
  lg: "h-28 w-28 text-6xl",
  xl: "h-36 w-36 text-7xl sm:h-40 sm:w-40",
} as const;

/**
 * 6タイプのキャラクター表示。
 * /public/characters/ に画像を置けば自動的にそちらを使う。
 * 画像が無い場合(404)は絵文字にフォールバックする。
 * 絵文字を常に土台として描画し、画像はその上に重ねる形にすることで、
 * 画像が見つからない場合でも「壊れた画像アイコン」が一瞬表示されるちらつきが起きないようにしている。
 *
 * muted=true にすると、診断前トップ画面で使う
 * 「シルエット/淡い半透明」演出(グレースケール+低opacity)になる。
 */
export function CharacterAvatar({
  typeId,
  size = "md",
  muted = false,
}: {
  typeId: SalesTypeId;
  size?: keyof typeof SIZE_CLASSES;
  muted?: boolean;
}) {
  const character = CHARACTERS[typeId];
  const accent = SALES_TYPES[typeId].accent;
  const [imageOk, setImageOk] = useState(false);

  // SSRで出力された<img>はハイドレーション前に読み込みが完了することがあり、
  // その場合ブラウザのloadイベントはReactがonLoadを登録するより前に発火してしまい
  // 取りこぼされる。ref接続時点でimg.completeを確認し、既に読み込み済みなら
  // ここで直接状態を反映することで、その取りこぼしを防いでいる。
  const handleImgRef = useCallback((img: HTMLImageElement | null) => {
    if (img && img.complete && img.naturalWidth > 0) {
      setImageOk(true);
    }
  }, []);

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full shadow-md transition ${SIZE_CLASSES[size]} ${
        muted ? "bg-slate-200 grayscale" : `bg-gradient-to-br ${accent.gradient}`
      }`}
      style={muted ? { opacity: 0.55 } : undefined}
      role="img"
      aria-label={character.animal}
    >
      <span aria-hidden="true">{character.emoji}</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={handleImgRef}
        src={`/characters/${character.imageFile}`}
        alt=""
        className="absolute inset-0 h-full w-full rounded-full object-cover"
        style={{ visibility: imageOk ? "visible" : "hidden" }}
        onLoad={() => setImageOk(true)}
        onError={() => setImageOk(false)}
      />
    </div>
  );
}

const HERO_SIZE_CLASSES = {
  sm: "h-16 w-16 sm:h-20 sm:w-20",
  md: "h-24 w-24 sm:h-28 sm:w-28 lg:h-36 lg:w-36 xl:h-48 xl:w-48",
  lg: "h-40 w-40 sm:h-48 sm:w-48 lg:h-56 lg:w-56",
} as const;

/**
 * トップ画面の「6キャラクター」で採用した、丸く切り抜かない全身表示のキャラクター。
 * 診断結果のメインタイプ表示など、キャラクターを主役として大きく見せたい場面で使い回す。
 */
export function HeroCharacter({
  typeId,
  size = "md",
  showName = true,
}: {
  typeId: SalesTypeId;
  size?: keyof typeof HERO_SIZE_CLASSES;
  showName?: boolean;
}) {
  const character = CHARACTERS[typeId];
  const type = SALES_TYPES[typeId];
  return (
    <div className="flex flex-col items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/characters/${character.imageFile}`}
        alt={`${type.name}(${character.animal})`}
        className={`object-contain drop-shadow-[0_8px_16px_rgba(79,70,229,0.18)] ${HERO_SIZE_CLASSES[size]}`}
      />
      {showName && (
        <p className="mt-1 text-[10px] font-semibold text-slate-600 sm:text-[11px] lg:text-xs xl:text-sm">
          {type.name}
        </p>
      )}
    </div>
  );
}
