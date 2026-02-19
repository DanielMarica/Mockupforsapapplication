import {
  Eye,
  Download,
  User,
  Briefcase,
  GraduationCap,
  Globe,
  Mail,
  Phone,
  MapPin,
  Star,
  Linkedin,
} from "lucide-react";
import { CVData } from "../types/cv";

interface PreviewCardProps {
  isReady: boolean;
  isLoading: boolean;
  data?: CVData | null;
  onDownload?: () => void;
}

function SkillBadge({ label }: { label: string }) {
  return (
    <span
      className="px-2.5 py-0.5 rounded-full bg-[#e8f1ff] text-[#0064d9] border border-[#b8d4f8]"
      style={{ fontSize: "11px", fontWeight: 500 }}
    >
      {label}
    </span>
  );
}

function SectionTitle({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-5 h-5 text-[#0064d9]">{icon}</div>
      <span
        className="text-[#1a2633] border-b border-[#0064d9] pb-0.5"
        style={{ fontSize: "13px", fontWeight: 600 }}
      >
        {title}
      </span>
    </div>
  );
}

export function PreviewCard({
  isReady,
  isLoading,
  data,
  onDownload,
}: PreviewCardProps) {
  return (
    <div className="bg-white rounded border border-[#d9dde3] shadow-sm flex flex-col h-full">
      {/* Card Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#edeff2] flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-[#e8f1ff] flex items-center justify-center">
            <Eye size={16} className="text-[#0064d9]" />
          </div>
          <div>
            <h3
              className="text-[#1a2633]"
              style={{ fontSize: "15px", fontWeight: 600 }}
            >
              Aperçu Europass
            </h3>
            <p className="text-[#8696a9]" style={{ fontSize: "12px" }}>
              {isReady
                ? "Prêt au téléchargement"
                : isLoading
                ? "Génération en cours..."
                : "Prévisualisation temps réel"}
            </p>
          </div>
        </div>
        {(isReady || data) && !isLoading && (
          <button
            onClick={onDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0064d9] text-white hover:bg-[#0050b3] transition-colors shadow-sm"
            style={{ fontSize: "12px" }}
          >
            <Download size={13} />
            Télécharger PDF
          </button>
        )}
      </div>

      {/* Card Body */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          /* Loading state */
          <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
            <div className="relative w-12 h-12">
              <div className="w-12 h-12 rounded-full border-4 border-[#e8f1ff] border-t-[#0064d9] animate-spin" />
            </div>
            <div className="text-center">
              <p
                className="text-[#1a2633]"
                style={{ fontSize: "14px", fontWeight: 500 }}
              >
                Extraction des données en cours...
              </p>
              <p className="text-[#8696a9] mt-1" style={{ fontSize: "12px" }}>
                Analyse du CV Flexso
              </p>
            </div>
            <div className="w-64 space-y-2 mt-2">
              {[80, 60, 70, 50, 65].map((w, i) => (
                <div
                  key={i}
                  className="h-2.5 rounded bg-[#edeff2] animate-pulse"
                  style={{ width: `${w}%` }}
                />
              ))}
            </div>
          </div>
        ) : !data ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
            <div className="relative">
              <div className="w-20 h-24 rounded-lg border-2 border-[#d9dde3] bg-[#f7f8f9] flex flex-col overflow-hidden">
                <div className="h-5 bg-[#edeff2] flex items-center gap-1 px-2">
                  <div className="w-2 h-2 rounded-full bg-[#c9cdd4]" />
                  <div className="w-2 h-2 rounded-full bg-[#c9cdd4]" />
                  <div className="w-2 h-2 rounded-full bg-[#c9cdd4]" />
                </div>
                <div className="flex-1 flex flex-col items-center justify-center gap-1.5 p-2">
                  <div className="w-10 h-1.5 rounded bg-[#d9dde3]" />
                  <div className="w-8 h-1.5 rounded bg-[#d9dde3]" />
                  <div className="w-10 h-1.5 rounded bg-[#d9dde3]" />
                  <div className="w-6 h-1.5 rounded bg-[#d9dde3]" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-[#edeff2] border-2 border-white flex items-center justify-center">
                <Eye size={13} className="text-[#8696a9]" />
              </div>
            </div>
            <div className="text-center">
              <p
                className="text-[#1a2633]"
                style={{ fontSize: "14px", fontWeight: 500 }}
              >
                Aucun résultat pour le moment
              </p>
              <p className="text-[#8696a9] mt-1" style={{ fontSize: "12px" }}>
                Uploadez un CV pour voir l'aperçu
              </p>
            </div>
          </div>
        ) : (
          /* Europass preview */
          <div className="p-5 space-y-5">
            {/* Header section */}
            <div className="flex items-start gap-4 p-4 rounded bg-[#f5f9ff] border border-[#d4e8ff]">
              {/* Photo */}
              <div className="flex-shrink-0">
                {data.photo ? (
                  <img
                    src={data.photo}
                    alt={data.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#b8d4f8] shadow-sm"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-[#0064d9] flex items-center justify-center border-2 border-[#b8d4f8]">
                    <User size={24} className="text-white" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h2
                  className="text-[#1a2633]"
                  style={{ fontSize: "18px", fontWeight: 700 }}
                >
                  {data.name || (
                    <span className="text-[#b0b9c4]">Nom complet</span>
                  )}
                </h2>
                <p
                  className="text-[#0064d9]"
                  style={{ fontSize: "13px", fontWeight: 500 }}
                >
                  {data.title || (
                    <span className="text-[#b0b9c4]">Titre / Poste</span>
                  )}
                </p>
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                  {data.email && (
                    <span
                      className="flex items-center gap-1 text-[#5a6a78]"
                      style={{ fontSize: "11px" }}
                    >
                      <Mail size={10} /> {data.email}
                    </span>
                  )}
                  {data.phone && (
                    <span
                      className="flex items-center gap-1 text-[#5a6a78]"
                      style={{ fontSize: "11px" }}
                    >
                      <Phone size={10} /> {data.phone}
                    </span>
                  )}
                  {data.location && (
                    <span
                      className="flex items-center gap-1 text-[#5a6a78]"
                      style={{ fontSize: "11px" }}
                    >
                      <MapPin size={10} /> {data.location}
                    </span>
                  )}
                  {data.linkedin && (
                    <span
                      className="flex items-center gap-1 text-[#5a6a78]"
                      style={{ fontSize: "11px" }}
                    >
                      <Linkedin size={10} /> {data.linkedin}
                    </span>
                  )}
                  {data.website && (
                    <span
                      className="flex items-center gap-1 text-[#5a6a78]"
                      style={{ fontSize: "11px" }}
                    >
                      <Globe size={10} /> {data.website}
                    </span>
                  )}
                </div>
              </div>

              {/* Europass badge */}
              <div className="flex-shrink-0 flex flex-col items-center gap-0.5">
                <div
                  className="px-2 py-0.5 rounded bg-[#003399] text-white"
                  style={{
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: 1,
                  }}
                >
                  EUROPASS
                </div>
                <div className="flex gap-0.5 mt-0.5">
                  {["#003399", "#FFCC00", "#003399", "#FFCC00", "#003399"].map(
                    (c, i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: c }}
                      />
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Summary */}
            {data.summary && (
              <div>
                <SectionTitle icon={<User size={14} />} title="Profil" />
                <p
                  className="text-[#3d4f5e]"
                  style={{ fontSize: "12px", lineHeight: 1.6 }}
                >
                  {data.summary}
                </p>
              </div>
            )}

            {/* Skills */}
            {data.skills.length > 0 && (
              <div>
                <SectionTitle icon={<Star size={14} />} title="Compétences" />
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((s) => (
                    <SkillBadge key={s} label={s} />
                  ))}
                </div>
              </div>
            )}

            {/* Experience */}
            {data.experiences.length > 0 && (
              <div>
                <SectionTitle
                  icon={<Briefcase size={14} />}
                  title="Expérience professionnelle"
                />
                <div className="space-y-3">
                  {data.experiences.map((exp) => (
                    <div key={exp.id} className="pl-3 border-l-2 border-[#d4e8ff]">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p
                            className="text-[#1a2633]"
                            style={{ fontSize: "13px", fontWeight: 600 }}
                          >
                            {exp.role || (
                              <span className="text-[#b0b9c4]">Poste</span>
                            )}
                          </p>
                          <p
                            className="text-[#0064d9]"
                            style={{ fontSize: "12px" }}
                          >
                            {exp.company}
                          </p>
                        </div>
                        {exp.period && (
                          <span
                            className="flex-shrink-0 px-2 py-0.5 rounded bg-[#f0f4f8] text-[#5a6a78] border border-[#d9dde3]"
                            style={{ fontSize: "11px" }}
                          >
                            {exp.period}
                          </span>
                        )}
                      </div>
                      {exp.description && (
                        <p
                          className="text-[#5a6a78] mt-1"
                          style={{ fontSize: "11px", lineHeight: 1.5 }}
                        >
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {data.education.length > 0 && (
              <div>
                <SectionTitle
                  icon={<GraduationCap size={14} />}
                  title="Formation"
                />
                <div className="space-y-2">
                  {data.education.map((edu) => (
                    <div
                      key={edu.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p
                          className="text-[#1a2633]"
                          style={{ fontSize: "12px", fontWeight: 500 }}
                        >
                          {edu.degree || (
                            <span className="text-[#b0b9c4]">Diplôme</span>
                          )}
                        </p>
                        <p
                          className="text-[#8696a9]"
                          style={{ fontSize: "11px" }}
                        >
                          {edu.school}
                        </p>
                      </div>
                      <span
                        className="text-[#8696a9]"
                        style={{ fontSize: "11px" }}
                      >
                        {edu.year}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {data.languages.length > 0 && (
              <div>
                <SectionTitle icon={<Globe size={14} />} title="Langues" />
                <div className="flex flex-wrap gap-2">
                  {data.languages.map((l) => (
                    <div
                      key={l.id}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#d9dde3] bg-[#f7f8f9]"
                    >
                      <span
                        className="text-[#1a2633]"
                        style={{ fontSize: "12px", fontWeight: 500 }}
                      >
                        {l.lang || "—"}
                      </span>
                      {l.level && (
                        <span
                          className="text-[#8696a9]"
                          style={{ fontSize: "11px" }}
                        >
                          — {l.level}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
