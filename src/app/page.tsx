"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Competitor {
  name: string;
  confidence: number;
}

interface FeatureGap {
  name: string;
  confidence: number;
}

interface Opportunity {
  name: string;
  confidence: number;
}

interface Recommendation {
  title: string;
  reason: string;
  confidence: number;
}

interface Lead {
  company: string;
  role: string;
  confidence: number;
}

interface ComparisonMatrix {
  feature: string;
  ourProduct: boolean;
  competitor1: boolean;
  competitor2: boolean;
}

interface Analysis {
  competitors: Competitor[];
  featureGaps: FeatureGap[];
  opportunities: Opportunity[];
  recommendations: Recommendation[];
  leads: Lead[];
  comparisonMatrix: ComparisonMatrix[];
}
export default function Home() {
  const [productIdea, setProductIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);


  const downloadPDF = () => {
    if (!analysis) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Nexus Competitor Analysis Report", 20, 20);

    doc.setFontSize(12);

    let y = 35;

    doc.text(
      `Competitors Found: ${analysis.competitors?.length || 0}`,
      20,
      y
    );
    y += 10;

    doc.text(
      `Feature Gaps: ${analysis.featureGaps?.length || 0}`,
      20,
      y
    );
    y += 10;

    doc.text(
      `Opportunities: ${analysis.opportunities?.length || 0}`,
      20,
      y
    );
    y += 10;

    doc.text(
      `Leads: ${analysis.leads?.length || 0}`,
      20,
      y
    );
    y += 15;

    doc.setFontSize(14);
    doc.text("Top Recommendations", 20, y);

    y += 10;

    analysis.recommendations?.slice(0, 5).forEach(
      (item: Recommendation, index: number) => {
        doc.setFontSize(11);

        doc.text(
          `${index + 1}. ${item.title} (${item.confidence}%)`,
          20,
          y
        );

        y += 8;

        doc.text(
          item.reason || "",
          25,
          y
        );

        y += 10;
      }
    );

    doc.save("nexus-analysis-report.pdf");
  };

  const handleAnalyze = async () => {
    if (!productIdea.trim()) {
      alert("Please enter a product idea");
      return;
    }
    try {
      setLoading(true);

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productIdea,
        }),
      });

      const data = await response.json();

      console.log(data);

      if (!data.success) {
        alert("Analysis failed");
        return;
      }

      try {
        const cleanData = String(data.data)
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        setAnalysis(JSON.parse(cleanData));
      } catch (e) {
        console.error("JSON Parse Error", e);

        setAnalysis({
          competitors: [],
          featureGaps: [],
          opportunities: [],
          recommendations: [
            {
              title: "Unable to parse AI response",
              reason: "Gemini returned invalid JSON",
              confidence: 0,
            },
          ],
          leads: [],
          comparisonMatrix: [],
        });
      }
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center text-blue-600">
          Nexus Competitor Analyzer
        </h1>

        <p className="text-center text-gray-700 mt-3">
          Analyze competitors, feature gaps, opportunities and leads for your
          startup idea.
        </p>

        <div className="mt-8">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Product Idea / Company Name / Website
          </label>

          <input
            type="text"
            placeholder="Example: AI Resume Builder"
            value={productIdea}
            onChange={(e) => setProductIdea(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-black bg-white outline-none focus:ring-2 focus:ring-blue-500"
          />

          {!analysis && (
            <div className="text-center mt-10 text-gray-500">
              Enter a product idea and click Analyze
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>

          <button
            onClick={() => {
              setProductIdea("");
              setAnalysis(null);
            }}
            className="w-full mt-3 bg-gray-500 text-white py-3 rounded-lg"
          >
            Clear
          </button>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-100 p-5 rounded-xl">
              <h3 className="font-semibold text-blue-900">
                Competitors
              </h3>
              <p className="text-3xl font-bold text-blue-700">
                {analysis?.competitors?.length || 0}
              </p>
            </div>

            <div className="bg-green-100 p-5 rounded-xl">
              <h3 className="font-semibold text-green-900">
                Leads
              </h3>
              <p className="text-3xl font-bold text-green-700">
                {analysis?.leads?.length || 0}
              </p>
            </div>

            <div className="bg-yellow-100 p-5 rounded-xl">
              <h3 className="font-semibold text-yellow-900">
                Feature Gaps
              </h3>
              <p className="text-3xl font-bold text-yellow-700">
                {analysis?.featureGaps?.length || 0}
              </p>
            </div>

            <div className="bg-red-100 p-5 rounded-xl">
              <h3 className="font-semibold text-red-900">
                Opportunities
              </h3>
              <p className="text-3xl font-bold text-red-700">
                {analysis?.opportunities?.length || 0}
              </p>
            </div>
          </div>

          {analysis && (
            <div className="mt-8 space-y-6">
              <button
                onClick={downloadPDF}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Download Pdf Report
              </button>

              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
                <h2 className="text-xl font-bold text-indigo-900 mb-3">
                  Founder Action Plan
                </h2>

                <ul className="list-disc pl-5 space-y-2 text-black">
                  <li>
                    Build: {analysis?.recommendations?.[0]?.title || "Improve product"}
                  </li>

                  <li>
                    Target Market: {analysis?.opportunities?.[0]?.name || "New market"}
                  </li>

                  <li>
                    Biggest Gap: {analysis?.featureGaps?.[0]?.name || "Feature gap"}
                  </li>

                  <li>
                    Priority Lead:{" "}
                    {analysis?.leads?.[0]?.company || "No lead available"}
                  </li>

                  <li>
                    Biggest Threat: {analysis?.competitors?.[0]?.name || "No competitor found"}
                  </li>
                </ul>
              </div>

              <div className="bg-white border rounded-xl p-5">
                <h2 className="text-xl font-bold text-black mb-3">
                  Competitors
                </h2>

                <ul className="list-disc pl-5">
                  {analysis.competitors.slice(0, 5).map(
                    (item: Competitor, index: number) => (
                      <li key={index} className="text-black">{item.name}
                        <span className="ml-2 text-sm text-green-600">
                          ({item.confidence}%)
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="bg-white border rounded-xl p-5">
                <h2 className="text-xl font-bold text-black mb-3">
                  Feature Gaps
                </h2>

                <ul className="list-disc pl-5">
                  {analysis.featureGaps.slice(0, 5).map((item: FeatureGap, index: number) => (
                    <li key={index} className="text-black">{item.name}
                      <span className="ml-2 text-sm text-green-600">
                        ({item.confidence}%)
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border rounded-xl p-5">
                <h2 className="text-xl font-bold text-black mb-3">
                  Opportunities
                </h2>

                <ul className="list-disc pl-5">
                  {analysis.opportunities.slice(0, 5).map((item: Opportunity, index: number) => (
                    <li key={index} className="text-black">{item.name}
                      <span className="ml-2 text-sm text-green-600">
                        ({item.confidence}%)
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border rounded-xl p-5">
                <h2 className="text-xl font-bold text-black mb-3">
                  Recommendations
                </h2>

                <ul className="list-disc pl-5">
                  {analysis.recommendations.slice(0, 5).map((item: Recommendation, index: number) => (
                    <li key={index} className="text-black">
                      <div className="font-semibold">
                        {item.title}
                      </div>

                      <div className="text-sm text-gray-600">
                        {item.reason}
                      </div>

                      <div className="text-green-600 text-sm">
                        Confidence: {item.confidence}%
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {analysis?.leads?.length > 0 && (
                <div className="bg-white border rounded-xl p-5">
                  <h2 className="text-xl font-bold text-black mb-3">
                    Leads
                  </h2>

                  <table className="w-full border">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2 text-left text-black">
                          Company
                        </th>

                        <th className="border p-2 text-left text-black">
                          Role
                        </th>

                        <th className="border p-2 text-left text-black">
                          Confidence
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {analysis.leads.slice(0, 5).map(
                        (lead: Lead, index: number) => (
                          <tr key={index}>
                            <td className="border p-2 text-black">
                              {lead.company || "-"}
                            </td>

                            <td className="border p-2 text-black">
                              {lead.role || "-"}
                            </td>

                            <td className="border p-2 text-black">
                              {lead.confidence || 0}%
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="bg-white border rounded-xl p-5">
                <h2 className="text-xl font-bold text-black mb-3">
                  Feature Comparison Matrix
                </h2>

                {analysis?.comparisonMatrix?.length > 0 ? (
                  <table className="w-full border">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2 text-black">
                          Feature
                        </th>

                        <th className="border p-2 text-black">
                          Our Product
                        </th>

                        <th className="border p-2 text-black">
                          {analysis.competitors?.[0]?.name || "Competitor 1"}
                        </th>

                        <th className="border p-2 text-black">
                          {analysis.competitors?.[1]?.name || "Competitor 2"}
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {analysis.comparisonMatrix.map(
                        (row: ComparisonMatrix, index: number) => (
                          <tr key={index}>
                            <td className="border p-2 text-black">
                              {row.feature}
                            </td>

                            <td className="border p-2 text-center">
                              {row.ourProduct ? "✅" : "❌"}
                            </td>

                            <td className="border p-2 text-center">
                              {row.competitor1 ? "✅" : "❌"}
                            </td>

                            <td className="border p-2 text-center">
                              {row.competitor2 ? "✅" : "❌"}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-500">
                    No comparison data available
                  </p>
                )}
              </div>
              <div className="bg-white border rounded-xl p-5">
                <h2 className="text-xl font-bold text-black mb-3">
                  Feature Gap Analysis
                </h2>

                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={
                      analysis?.featureGaps?.map((item: FeatureGap) => ({
                        name: item.name,
                        confidence: item.confidence,
                      })) || []
                    }
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #d1d5db",
                        color: "#000000",
                      }}
                      labelStyle={{ color: "#000000" }}
                    />
                    <Bar dataKey="confidence" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white border rounded-xl p-5">
                <h2 className="text-xl font-bold text-black mb-3">
                  Competitor Confidence Analysis
                </h2>

                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={
                      analysis?.competitors?.map((item: Competitor) => ({
                        name: item.name,
                        confidence: item.confidence,
                      })) || []
                    }>
                    <XAxis dataKey="name" /><YAxis />
                    <Tooltip />
                    <Bar dataKey="confidence" /></BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}