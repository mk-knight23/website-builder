import { NextRequest, NextResponse } from 'next/server';
import { generateWebsite, ALLOWED_WEBSITE_TYPES } from '@/lib/generator';

const MAX_PROMPT_LENGTH = 1000;
const MAX_BUSINESS_NAME_LENGTH = 100;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, businessName, websiteType } = body;

    // Input validation
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Valid prompt is required' }, { status: 400 });
    }

    if (prompt.length > MAX_PROMPT_LENGTH) {
      return NextResponse.json({ error: 'Prompt too long' }, { status: 400 });
    }

    if (businessName && businessName.length > MAX_BUSINESS_NAME_LENGTH) {
      return NextResponse.json({ error: 'Business name too long' }, { status: 400 });
    }

    if (websiteType && !ALLOWED_WEBSITE_TYPES.includes(websiteType)) {
      return NextResponse.json({ error: 'Invalid website type' }, { status: 400 });
    }

    // Sanitize inputs
    const sanitizedBusinessName = (businessName || 'Business').replace(/[<>]/g, '');
    const sanitizedPrompt = prompt.replace(/[<>]/g, '');

    const html = generateWebsite(sanitizedBusinessName, websiteType, sanitizedPrompt);

    return NextResponse.json({
      success: true,
      html,
      businessName: sanitizedBusinessName,
      websiteType,
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate website' },
      { status: 500 }
    );
  }
}


