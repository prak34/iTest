import Link from 'next/link';

import { ZODIAC_SIGN_OPTIONS } from '@/lib/zodiacSigns';

type DailyPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function DailyPage({ searchParams }: DailyPageProps) {
  const { error } = await searchParams;

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-12">
      <section className="space-y-3 text-center">
        <h1 className="text-3xl font-bold">ดวงรายวัน</h1>
        <p className="text-sm text-zinc-600">เลือกวันเกิดของคุณเพื่อดูคำทำนายประจำวัน</p>
      </section>

      {error === 'invalid_sign' ? (
        <p className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          ไม่พบราศีที่เลือก กรุณาเลือกราศีใหม่อีกครั้ง
        </p>
      ) : null}

      <section className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {ZODIAC_SIGN_OPTIONS.map((sign) => (
          <Link
            key={sign.key}
            href={`/daily/result?sign=${sign.key}`}
            className="rounded-xl border border-zinc-200 bg-white p-4 text-center text-lg font-semibold shadow-sm transition hover:border-zinc-300 hover:shadow"
          >
            {sign.labelTh}
          </Link>
        ))}
      </section>
    </main>
  );
}
