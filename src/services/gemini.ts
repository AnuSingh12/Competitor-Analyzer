import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || ""
);

export async function analyzeProduct(productIdea: string) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `Analyze this product idea:

${productIdea}

IMPORTANT:
- Return ONLY valid JSON
- Do not include markdown
- Do not include explanation
- Do not include code fences
- Identify at least 5 competitors
- Generate at least 5 feature gaps
- Generate at least 5 opportunities
- Generate at least 5 recommendations
- Generate at least 5 leads
- Generate at least 5 rows in comparisonMatrix
- Add confidence score (0-100) for every insight

Format:

{
  "competitors": [
    {
      "name": "",
      "confidence": 90
    }
  ],

  "featureGaps": [
    {
      "name": "",
      "confidence": 85
    }
  ],

  "opportunities": [
    {
      "name": "",
      "confidence": 80
    }
  ],

  "recommendations": [
    {
      "title": "",
      "reason": "",
      "confidence": 92
    }
  ],

  "leads": [
    {
      "company": "",
      "role": "",
      "confidence": 88
    }
  ],

  "comparisonMatrix": [
    {
      "feature": "",
      "ourProduct": true,
      "competitor1": true,
      "competitor2": false
    }
  ]
}
`.trim();

    const result = await model.generateContent(prompt);

    const text = result.response.text().trim();
    if (!text) {
      throw new Error("Empty Gemini response");
    }
    return text;
  } catch (error: unknown) {
    console.log("Gemini API failed. Using mock data fallback");

    return JSON.stringify({
      competitors: [
        {
          name: `${productIdea} Competitor 1`,
          confidence: 90,
        },
        {
          name: `${productIdea} Competitor 2`,
          confidence: 85,
        },
        {
          name: `${productIdea} Competitor 3`,
          confidence: 80,
        },
      ],

      featureGaps: [
        {
          name: `${productIdea} Mobile App`,
          confidence: 88,
        },
        {
          name: `${productIdea} AI Features`,
          confidence: 84,
        },
        {
          name: `${productIdea} Real-Time Tracking`,
          confidence: 82,
        },
      ],

      opportunities: [
        {
          name: `${productIdea} Student Market`,
          confidence: 92,
        },
        {
          name: `${productIdea} Tier 2 Cities`,
          confidence: 89,
        },
        {
          name: `${productIdea} Subscription Model`,
          confidence: 85,
        },
      ],

      recommendations: [
        {
          title: `Add AI capabilities`,
          reason: `Competitors are already leveraging AI features`,
          confidence: 95,
        },
        {
          title: `Improve user experience`,
          reason: `Better UX increases adoption and retention`,
          confidence: 90,
        },
        {
          title: `Launch referral program`,
          reason: `Can accelerate user acquisition`,
          confidence: 87,
        },
      ],

      leads: [
        {
          company: `${productIdea} Partner Company`,
          role: "Business Development Manager",
          confidence: 91,
        },
        {
          company: `${productIdea} Enterprise Client`,
          role: "Product Manager",
          confidence: 88,
        },
      ],

      comparisonMatrix: [
        {
          feature: "AI Support",
          ourProduct: true,
          competitor1: true,
          competitor2: false,
        },
        {
          feature: "Analytics",
          ourProduct: true,
          competitor1: true,
          competitor2: true,
        },
        {
          feature: "Mobile App",
          ourProduct: false,
          competitor1: true,
          competitor2: true,
        },
        {
          feature: "Automation",
          ourProduct: true,
          competitor1: false,
          competitor2: true,
        },
        {
          feature: "Reporting",
          ourProduct: true,
          competitor1: true,
          competitor2: false,
        },
      ],
    });
  }
}