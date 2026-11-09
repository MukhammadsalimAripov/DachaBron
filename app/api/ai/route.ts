import { NextResponse } from 'next/server';
import productsData from '@/data/products.json';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, location, guests, maxBudget, amenity, lang = 'ru' } = body;

    const query = (prompt || '').toLowerCase();
    const desiredLocation = (location || '').toLowerCase();
    const guestCount = guests ? Number(guests) : 0;
    const budget = maxBudget ? Number(maxBudget) : Infinity;

    // Filter and score dachas
    const scoredDachas = productsData
      .filter(d => !d.isDeleted)
      .map(dacha => {
        let score = 0;
        const dachaText = `${dacha.name} ${dacha.description} ${dacha.location} ${(dacha.features || []).join(' ')}`.toLowerCase();

        // Location match
        if (desiredLocation && dacha.location.toLowerCase().includes(desiredLocation)) {
          score += 15;
        } else if (query.includes('чарвак') && dacha.location.toLowerCase().includes('чарвак')) {
          score += 15;
        } else if (query.includes('чимган') && dacha.location.toLowerCase().includes('чимган')) {
          score += 15;
        } else if (query.includes('бричмулла') && dacha.location.toLowerCase().includes('бричмулла')) {
          score += 15;
        } else if (query.includes('хумсан') && dacha.location.toLowerCase().includes('хумсан')) {
          score += 15;
        } else if (query.includes('бочка') && dacha.location.toLowerCase().includes('бочка')) {
          score += 15;
        } else if (query.includes('юсуфхона') && dacha.location.toLowerCase().includes('юсуфхона')) {
          score += 15;
        }

        // Budget match
        if (dacha.price <= budget) {
          score += 10;
        } else if (dacha.price > budget + 100) {
          score -= 10;
        }

        // Guests match
        if (guestCount > 0) {
          if ((dacha.maxGuests || 12) >= guestCount) {
            score += 10;
          } else {
            score -= 10;
          }
        }

        // Amenities match
        const amenitiesToCheck = [amenity, 'бассейн', 'сауна', 'бильярд', 'мангал', 'камин', 'фурако', 'вид', 'хаммам', 'инфинити'];
        amenitiesToCheck.filter(Boolean).forEach(a => {
          if (query.includes(a.toLowerCase()) || (amenity && amenity.toLowerCase() === a.toLowerCase())) {
            if (dachaText.includes(a.toLowerCase())) {
              score += 8;
            }
          }
        });

        // Category preference
        if (query.includes('вилл') && dacha.category === 'villa') score += 12;
        if (query.includes('больш') && dacha.category === 'bolshiye') score += 12;
        if (query.includes('средн') && dacha.category === 'sredniye') score += 12;
        if (query.includes('маленьк') || query.includes('a-frame') || query.includes('уютн')) {
          if (dacha.category === 'malenkiye') score += 12;
        }

        return { dacha, score };
      });

    // Sort by score descending
    scoredDachas.sort((a, b) => b.score - a.score);

    // Pick top results
    let topMatches = scoredDachas.filter(item => item.score > 0).map(item => item.dacha);
    if (topMatches.length === 0) {
      topMatches = productsData.filter(d => !d.isDeleted).slice(0, 3);
    }

    const bestDacha = topMatches[0];

    // Generate AI explanation message depending on language
    let aiMessage = '';
    if (lang === 'uz') {
      aiMessage = `Sun'iy intellekt sizning talablaringizni tahlil qildi va eng mos variantlarni topdi! Tavsiya etilgan dacha: "${bestDacha.name}" (${bestDacha.location}) - narxi sutkasiga $${bestDacha.price}. Dam olishingiz uchun barcha qulayliklar mavjud.`;
    } else if (lang === 'en') {
      aiMessage = `AI Assistant analyzed your preferences and selected the top mountain retreats! Top match: "${bestDacha.name}" in ${bestDacha.location} ($${bestDacha.price}/day). It features premium amenities matching your vibe.`;
    } else {
      aiMessage = `Искусственный интеллект подобрал лучшие варианты под ваши пожелания! Рекомендуемый вариант №1: "${bestDacha.name}" в районе ${bestDacha.location} по цене $${bestDacha.price}/сутки. Дом идеально подходит по вместимости и оснащению.`;
    }

    return NextResponse.json({
      success: true,
      message: aiMessage,
      matchedDachaIds: topMatches.slice(0, 4).map(d => d.id),
      totalFound: topMatches.length
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Ошибка обработки AI запроса',
      error: error.message
    }, { status: 500 });
  }
}
