import {
  generateDailyHoroscope,
  isValidZodiacSign,
  type ZodiacSign,
} from './generateDailyHoroscope';

const ALL_SIGNS: ZodiacSign[] = [
  'aries',
  'taurus',
  'gemini',
  'cancer',
  'leo',
  'virgo',
  'libra',
  'scorpio',
  'sagittarius',
  'capricorn',
  'aquarius',
  'pisces',
];

describe('isValidZodiacSign', () => {
  it('returns true for all valid zodiac signs', () => {
    for (const sign of ALL_SIGNS) {
      expect(isValidZodiacSign(sign)).toBe(true);
    }
  });

  it('returns false for invalid values', () => {
    expect(isValidZodiacSign('dragon')).toBe(false);
    expect(isValidZodiacSign('Aries')).toBe(false);
    expect(isValidZodiacSign('')).toBe(false);
  });
});

describe('generateDailyHoroscope', () => {
  it('is deterministic for same sign and date', () => {
    const first = generateDailyHoroscope('aries', '2026-01-15');
    const second = generateDailyHoroscope('aries', '2026-01-15');

    expect(second).toEqual(first);
  });

  it('generates all scores within 1-5 and lucky number within 1-99', () => {
    for (const sign of ALL_SIGNS) {
      const result = generateDailyHoroscope(sign, '2026-02-18');
      const scores = [
        result.sections.work.score,
        result.sections.money.score,
        result.sections.love.score,
        result.sections.health.score,
      ];

      scores.forEach((score) => {
        expect(score).toBeGreaterThanOrEqual(1);
        expect(score).toBeLessThanOrEqual(5);
      });

      expect(result.lucky.number).toBeGreaterThanOrEqual(1);
      expect(result.lucky.number).toBeLessThanOrEqual(99);
    }
  });

  it('changes output when date changes', () => {
    const first = generateDailyHoroscope('pisces', '2026-02-18');
    const second = generateDailyHoroscope('pisces', '2026-02-19');

    expect(second).not.toEqual(first);
  });
});
