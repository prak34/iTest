import type { ZodiacSign } from './generateDailyHoroscope';

export const ZODIAC_SIGN_OPTIONS: ReadonlyArray<{ key: ZodiacSign; labelTh: string }> = [
  { key: 'aries', labelTh: 'เมษ' },
  { key: 'taurus', labelTh: 'พฤษภ' },
  { key: 'gemini', labelTh: 'เมถุน' },
  { key: 'cancer', labelTh: 'กรกฎ' },
  { key: 'leo', labelTh: 'สิงห์' },
  { key: 'virgo', labelTh: 'กันย์' },
  { key: 'libra', labelTh: 'ตุล' },
  { key: 'scorpio', labelTh: 'พิจิก' },
  { key: 'sagittarius', labelTh: 'ธนู' },
  { key: 'capricorn', labelTh: 'มกร' },
  { key: 'aquarius', labelTh: 'กุมภ์' },
  { key: 'pisces', labelTh: 'มีน' },
] as const;

export const ZODIAC_LABELS_TH: Readonly<Record<ZodiacSign, string>> = ZODIAC_SIGN_OPTIONS.reduce(
  (acc, item) => {
    acc[item.key] = item.labelTh;
    return acc;
  },
  {} as Record<ZodiacSign, string>,
);
