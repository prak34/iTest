import Link from 'next/link';
import { redirect } from 'next/navigation';
import { DateTime } from 'luxon';

import {
  generateDailyHoroscope,
  isValidZodiacSign,
  type DailyHoroscope,
} from '@/lib/generateDailyHoroscope';
import { ZODIAC_LABELS_TH } from '@/lib/zodiacSigns';

import { CopyLinkButton } from './copy-link-button';

type ResultPageProps = {
  searchParams: Promise<{ sign?: string }>;
};

const SECTION_TITLES: { [K in keyof DailyHoroscope['sections']]: string } = {
  work: 'การงาน',
  money: 'การเงิน',
  love: 'ความรัก',
  health: 'สุขภาพ',
};

export default async function DailyResultPage({ searchParams }: ResultPageProps) {
  const { sign } = await searchParams;

  if (!sign || !isValidZodiacSign(sign)) {
    redirect('/daily?error=invalid_sign');
  }

  const dateISO = DateTime.now().setZone('Asia/Bangkok').toISODate();

  if (!dateISO) {
    throw new Error('Cannot resolve Bangkok date.');
  }

  const horoscope = generateDailyHoroscope(sign, dateISO);

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">ดวงรายวัน: ราศี{ZODIAC_LABELS_TH[sign]}</h1>
        <p className="text-sm text-zinc-600">ประจำวันที่ {dateISO}</p>
      </header>

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        {Object.entries(horoscope.sections).map(([key, section]) => {
          const sectionKey = key as keyof DailyHoroscope['sections'];

          return (
            <article key={sectionKey} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              <h2 className="text-lg font-semibold">{SECTION_TITLES[sectionKey]}</h2>
              <p className="mt-1 text-sm font-medium text-indigo-700">คะแนน: {section.score}/5</p>
              <p className="mt-2 text-sm leading-6 text-zinc-700">{section.text}</p>
            </article>
          );
        })}
      </section>

      <section className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <h2 className="text-lg font-semibold">Lucky ของวันนี้</h2>
        <ul className="mt-2 space-y-1 text-sm text-zinc-800">
          <li>เวลา: {horoscope.lucky.timeRange}</li>
          <li>สีมงคล: {horoscope.lucky.color}</li>
          <li>เลขนำโชค: {horoscope.lucky.number}</li>
        </ul>
      </section>

      <div className="mt-8 flex items-center gap-3">
        <CopyLinkButton />
        <Link
          href="/daily"
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
        >
          Back
        </Link>
      </div>
    </main>
  );
}
