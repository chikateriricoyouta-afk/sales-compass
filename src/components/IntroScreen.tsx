import { PageShell, PageCard } from "./PageCard";
import { HeroCharacter } from "./CharacterAvatar";
import { IconChart, IconCompass, IconHandshake, IconCheck, IconBulb, IconGift } from "./Icons";
import { GradientButton } from "./Button";
import { CHARACTERS, HERO_ORDER } from "@/lib/characters";

const INSIGHTS = [
  { Icon: IconChart, title: "8つの営業力を可視化" },
  { Icon: IconCompass, title: "6つの営業タイプを診断" },
  { Icon: IconHandshake, title: "顧客タイプとの相性を分析" },
  { Icon: IconCheck, title: "明日から使える行動を提案" },
  { Icon: IconBulb, title: "あなたの強みを活かすアドバイス" },
];

export function IntroScreen({
  onStart,
  onDemo,
}: {
  onStart: () => void;
  onDemo: () => void;
}) {
  return (
    <PageShell>
      <div id="top">
        <PageCard>
          {/* 装飾: 淡い光 */}
          <div className="pointer-events-none absolute -top-28 left-1/2 h-72 w-[38rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-200 via-indigo-100 to-purple-200 opacity-40 blur-3xl" />

          {/* ===== ヒーローコピー ===== */}
          <section id="about" className="relative text-center">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-indigo-500 sm:text-xs">
              SALES COMPASS
            </p>
            <h1 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
              あなたの営業には、
              <br />
              あなたの
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                勝ち方
              </span>
              がある。
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-slate-600 sm:text-sm">
              48問で、あなたの営業スタイルと強みを可視化。
              <br />
              明日からの商談を、もっと成果につなげよう。
            </p>
          </section>

          {/* ===== 6キャラクター(ヒーローの主役) ===== */}
          <section id="types" className="relative mt-4 sm:mt-5">
            <div className="grid grid-cols-3 gap-x-2 gap-y-3 sm:grid-cols-6 sm:gap-x-2">
              {HERO_ORDER.map((id) => (
                <HeroCharacter key={id} typeId={id} />
              ))}
            </div>
          </section>

          {/* ===== Sales Compassで分かること ===== */}
          <section id="howto" className="relative mt-4 sm:mt-5">
            <div className="grid grid-cols-2 gap-y-4 rounded-2xl border border-purple-100 bg-white px-3 py-3 shadow-sm sm:grid-cols-3 md:grid-cols-5 md:divide-x md:divide-purple-100 sm:py-4">
              {INSIGHTS.map(({ Icon, title }) => (
                <div key={title} className="flex flex-col items-center gap-1.5 px-2 text-center md:px-3">
                  <Icon className="h-5 w-5 text-purple-500 sm:h-6 sm:w-6" />
                  <p className="text-[11px] font-medium leading-snug text-slate-700 sm:text-xs">{title}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ===== CTA ===== */}
          <section className="relative mt-5 flex flex-col items-center sm:mt-6">
            <GradientButton onClick={onStart} className="w-full max-w-xl py-4 text-base sm:text-lg">
              診断をはじめる →
            </GradientButton>

            <div className="mt-2.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] text-slate-500 sm:text-xs">
              <span>所要時間: 約5〜10分</span>
              <span className="text-slate-300">/</span>
              <span>全48問</span>
              <span className="text-slate-300">/</span>
              <span>無料</span>
            </div>

            <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-[11px] font-medium text-emerald-700">
              顧客情報の入力不要
            </p>

            <button
              onClick={onDemo}
              className="mt-2.5 text-[11px] text-slate-400 underline decoration-slate-300 underline-offset-4 transition hover:text-slate-600"
            >
              デモ結果を見る
            </button>
          </section>

          {/* ===== 診断後の案内 ===== */}
          <section className="relative mt-6 sm:mt-7">
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 px-5 py-4 text-center sm:flex-row sm:justify-between sm:gap-5 sm:text-left">
              <IconGift className="h-7 w-7 shrink-0 text-purple-500" />
              <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
                診断後は、あなただけのタイプキャラクターで
                <br className="hidden sm:block" />
                詳細なアドバイスをお届けします！
              </p>
              <div className="flex shrink-0 items-center gap-0.5">
                {HERO_ORDER.map((id) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={id}
                    src={`/characters/${CHARACTERS[id].imageFile}`}
                    alt=""
                    aria-hidden="true"
                    className="h-9 w-9 object-contain sm:h-10 sm:w-10"
                  />
                ))}
              </div>
            </div>
          </section>

          {/* ===== 注意書き ===== */}
          <footer id="faq" className="relative mt-5 border-t border-slate-100 pt-3">
            <p className="mx-auto max-w-xl text-center text-[10px] leading-relaxed text-slate-400">
              現時点では研究知見を参考にした試作版であり、医学的・心理学的な性格診断や、営業成果を科学的に保証する診断ではありません。
            </p>
          </footer>
        </PageCard>
      </div>
    </PageShell>
  );
}
