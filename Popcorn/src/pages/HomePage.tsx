// src/pages/HomePage.tsx
import { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

import BannerCarousel from "../components/BannerCarousel";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { tmdbImage } from "../utils/tmdb";
import type { MovieRecommendation } from "../utils/recommendMovies";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MovieRecommendation[]>([]);
  const navigate = useNavigate();

  const pageBg = "#f5f5f5";
  const surface = "#fff";
  const ink = "#191e25"; // matches navbar
  const muted = "#6e6e73";
  const accent = "#649a8b"; // matches navbar search button
  const cardShadow = "0 6px 18px rgba(0,0,0,0.06)";

  return (
    <>
      <Navbar query={query} setQuery={setQuery} onRecommend={setResults} />

      <div style={{ backgroundColor: pageBg }}>
        <Container style={{ paddingTop: 18, paddingBottom: 28 }}>
          <div
            style={{
              background: surface,
              borderRadius: 16,
              boxShadow: cardShadow,
              padding: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: 12,
              }}
            >
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: ink, letterSpacing: "-0.02em" }}>
                  Discover your next movie
                </div>
                <div style={{ fontSize: 13, color: muted, marginTop: 4 }}>
                  Try natural language: mood, era, language, or genre.
                </div>
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: accent,
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                }}
              >
                AI recommendations
              </div>
            </div>
            <BannerCarousel />
          </div>
        </Container>

        <Container style={{ paddingTop: 0, paddingBottom: 44 }}>
          <div
            style={{
              background: surface,
              borderRadius: 16,
              boxShadow: cardShadow,
              padding: 18,
            }}
          >
            <SectionHeader
              title="Recommendations"
              subtitle={
                results.length
                  ? `${results.length} ${results.length === 1 ? "movie" : "movies"}`
                  : "Type a query above to get results"
              }
            />

            {results.length === 0 ? (
              <div style={{ textAlign: "center", padding: "44px 12px", color: muted, lineHeight: 1.6 }}>
                Describe the movie you want.
                <br />
                Example: “90s comedy romance in Japanese” or “a non-gory mystery detective story”.
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                  gap: 16,
                  marginTop: 14,
                }}
              >
                {results.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => {
                      if (Number.isFinite(m.id) && m.id > 0) {
                        navigate(`/movie/${m.id}`);
                      }
                    }}
                    style={{
                      background: surface,
                      borderRadius: 14,
                      boxShadow: cardShadow,
                      cursor: Number.isFinite(m.id) && m.id > 0 ? "pointer" : "default",
                      overflow: "hidden",
                    }}
                  >
                    <div style={{ height: 260, background: "#f2f2f2" }}>
                      {m.poster_path ? (
                        <img
                          src={tmdbImage(m.poster_path, "w342")}
                          alt={m.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : null}
                    </div>

                    <div style={{ padding: 12 }}>
                      <div
                        style={{
                          fontWeight: 800,
                          fontSize: 14,
                          color: ink,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        title={m.title}
                      >
                        {m.title}
                      </div>
                      <div style={{ fontSize: 12, color: muted, marginTop: 6 }}>
                        {m.release_date ? m.release_date.slice(0, 4) : ""}
                        {m.vote_average ? ` · ★ ${m.vote_average.toFixed(1)}` : ""}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Container>
      </div>

      <Footer />
    </>
  );
}

function Container({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 20px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        marginBottom: 10,
      }}
    >
      <div>
        <h2 style={{ margin: 0, fontSize: 20 }}>{title}</h2>
        {subtitle ? <p style={{ margin: "8px 0 0", color: "#6e6e73", fontSize: 13 }}>{subtitle}</p> : null}
      </div>
    </div>
  );
}
