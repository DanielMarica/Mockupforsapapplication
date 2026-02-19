import { useState, useRef, useCallback } from "react";
import {
  Camera,
  User,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  FileText,
  Star,
  Briefcase,
  GraduationCap,
  Languages,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  X,
  Pencil,
  Check,
  ArrowRight,
} from "lucide-react";
import { CVData, Experience, Education, Language } from "../types/cv";

interface EditCVFormProps {
  data: CVData;
  onChange: (data: CVData) => void;
  onValidate: () => void;
}

/* ─── tiny helpers ─── */
const uid = () => Math.random().toString(36).slice(2);

function SectionHeader({
  icon,
  title,
  open,
  onToggle,
}: {
  icon: React.ReactNode;
  title: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between px-4 py-3 bg-[#f5f7f9] border-b border-[#e8eaed] hover:bg-[#eef2f7] transition-colors rounded-t"
    >
      <div className="flex items-center gap-2">
        <span className="text-[#0064d9]">{icon}</span>
        <span className="text-[#1a2633]" style={{ fontSize: "13px", fontWeight: 600 }}>
          {title}
        </span>
      </div>
      {open ? (
        <ChevronUp size={14} className="text-[#8696a9]" />
      ) : (
        <ChevronDown size={14} className="text-[#8696a9]" />
      )}
    </button>
  );
}

function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[#5a6a78]" style={{ fontSize: "11px", fontWeight: 600, letterSpacing: 0.3 }}>
        {label.toUpperCase()}
      </label>
      {children}
    </div>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 rounded border border-[#d9dde3] bg-white text-[#1a2633] placeholder-[#b0b9c4] focus:outline-none focus:border-[#0064d9] focus:ring-1 focus:ring-[#0064d9]/20 transition-colors"
      style={{ fontSize: "13px" }}
    />
  );
}

/* ─── Main component ─── */
export function EditCVForm({ data, onChange, onValidate }: EditCVFormProps) {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    photo: true,
    personal: true,
    summary: true,
    skills: true,
    experience: true,
    education: false,
    languages: false,
  });
  const [newSkill, setNewSkill] = useState("");
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [editingEduId, setEditingEduId] = useState<string | null>(null);

  const toggle = (s: string) =>
    setOpenSections((prev) => ({ ...prev, [s]: !prev[s] }));

  const set = useCallback(
    <K extends keyof CVData>(key: K, value: CVData[K]) => {
      onChange({ ...data, [key]: value });
    },
    [data, onChange]
  );

  /* Photo */
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => set("photo", ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  /* Skills */
  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !data.skills.includes(trimmed)) {
      set("skills", [...data.skills, trimmed]);
    }
    setNewSkill("");
  };
  const removeSkill = (s: string) =>
    set("skills", data.skills.filter((sk) => sk !== s));

  /* Experiences */
  const addExp = () => {
    const newExp: Experience = {
      id: uid(),
      role: "",
      company: "",
      period: "",
      description: "",
    };
    set("experiences", [...data.experiences, newExp]);
    setEditingExpId(newExp.id);
  };
  const updateExp = (id: string, field: keyof Experience, val: string) =>
    set(
      "experiences",
      data.experiences.map((e) => (e.id === id ? { ...e, [field]: val } : e))
    );
  const removeExp = (id: string) =>
    set(
      "experiences",
      data.experiences.filter((e) => e.id !== id)
    );

  /* Education */
  const addEdu = () => {
    const newEdu: Education = { id: uid(), degree: "", school: "", year: "" };
    set("education", [...data.education, newEdu]);
    setEditingEduId(newEdu.id);
  };
  const updateEdu = (id: string, field: keyof Education, val: string) =>
    set(
      "education",
      data.education.map((e) => (e.id === id ? { ...e, [field]: val } : e))
    );
  const removeEdu = (id: string) =>
    set(
      "education",
      data.education.filter((e) => e.id !== id)
    );

  /* Languages */
  const addLang = () =>
    set("languages", [...data.languages, { id: uid(), lang: "", level: "Courant" }]);
  const updateLang = (id: string, field: keyof Language, val: string) =>
    set(
      "languages",
      data.languages.map((l) => (l.id === id ? { ...l, [field]: val } : l))
    );
  const removeLang = (id: string) =>
    set(
      "languages",
      data.languages.filter((l) => l.id !== id)
    );

  return (
    <div className="bg-white rounded border border-[#d9dde3] shadow-sm flex flex-col h-full">
      {/* Card Header */}
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#edeff2] flex-shrink-0">
        <div className="w-8 h-8 rounded bg-[#e8f1ff] flex items-center justify-center">
          <Pencil size={15} className="text-[#0064d9]" />
        </div>
        <div>
          <h3 className="text-[#1a2633]" style={{ fontSize: "15px", fontWeight: 600 }}>
            Édition du CV Europass
          </h3>
          <p className="text-[#8696a9]" style={{ fontSize: "12px" }}>
            Vérifiez et complétez les données extraites
          </p>
        </div>
      </div>

      {/* Scrollable form body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">

        {/* ── PHOTO ── */}
        <div className="rounded border border-[#d9dde3] overflow-hidden">
          <SectionHeader
            icon={<Camera size={14} />}
            title="Photo de profil"
            open={openSections.photo}
            onToggle={() => toggle("photo")}
          />
          {openSections.photo && (
            <div className="p-4 flex items-center gap-5">
              <div
                className="w-20 h-20 rounded-full border-2 border-dashed border-[#b8d4f8] bg-[#f5f9ff] flex items-center justify-center cursor-pointer overflow-hidden flex-shrink-0 hover:border-[#0064d9] transition-colors relative group"
                onClick={() => photoInputRef.current?.click()}
              >
                {data.photo ? (
                  <>
                    <img src={data.photo} alt="Photo" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Camera size={18} className="text-white" />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <Camera size={20} className="text-[#8696a9]" />
                    <span className="text-[#8696a9]" style={{ fontSize: "9px" }}>Ajouter</span>
                  </div>
                )}
              </div>
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
              <div>
                <p className="text-[#1a2633]" style={{ fontSize: "13px", fontWeight: 500 }}>
                  {data.photo ? "Photo ajoutée" : "Aucune photo"}
                </p>
                <p className="text-[#8696a9] mt-1" style={{ fontSize: "11px" }}>
                  Format recommandé : JPG ou PNG, 300×300 px minimum
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => photoInputRef.current?.click()}
                    className="px-2.5 py-1 rounded border border-[#0064d9] text-[#0064d9] bg-white hover:bg-[#e8f1ff] transition-colors"
                    style={{ fontSize: "11px" }}
                  >
                    {data.photo ? "Changer la photo" : "Choisir une photo"}
                  </button>
                  {data.photo && (
                    <button
                      type="button"
                      onClick={() => set("photo", null)}
                      className="px-2.5 py-1 rounded border border-[#d9dde3] text-[#8696a9] hover:bg-[#f2f3f4] transition-colors"
                      style={{ fontSize: "11px" }}
                    >
                      Supprimer
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── PERSONAL INFO ── */}
        <div className="rounded border border-[#d9dde3] overflow-hidden">
          <SectionHeader
            icon={<User size={14} />}
            title="Informations personnelles"
            open={openSections.personal}
            onToggle={() => toggle("personal")}
          />
          {openSections.personal && (
            <div className="p-4 grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <FieldRow label="Nom complet">
                  <TextInput value={data.name} onChange={(v) => set("name", v)} placeholder="Jean Dupont" />
                </FieldRow>
              </div>
              <div className="col-span-2">
                <FieldRow label="Titre / Poste">
                  <TextInput value={data.title} onChange={(v) => set("title", v)} placeholder="SAP Consultant" />
                </FieldRow>
              </div>
              <FieldRow label="Email">
                <div className="relative">
                  <Mail size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8696a9]" />
                  <input
                    type="email"
                    value={data.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="email@exemple.com"
                    className="w-full pl-7 pr-3 py-2 rounded border border-[#d9dde3] bg-white text-[#1a2633] placeholder-[#b0b9c4] focus:outline-none focus:border-[#0064d9] focus:ring-1 focus:ring-[#0064d9]/20 transition-colors"
                    style={{ fontSize: "13px" }}
                  />
                </div>
              </FieldRow>
              <FieldRow label="Téléphone">
                <div className="relative">
                  <Phone size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8696a9]" />
                  <input
                    type="tel"
                    value={data.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="+32 000 00 00 00"
                    className="w-full pl-7 pr-3 py-2 rounded border border-[#d9dde3] bg-white text-[#1a2633] placeholder-[#b0b9c4] focus:outline-none focus:border-[#0064d9] focus:ring-1 focus:ring-[#0064d9]/20 transition-colors"
                    style={{ fontSize: "13px" }}
                  />
                </div>
              </FieldRow>
              <div className="col-span-2">
                <FieldRow label="Localisation">
                  <div className="relative">
                    <MapPin size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8696a9]" />
                    <input
                      value={data.location}
                      onChange={(e) => set("location", e.target.value)}
                      placeholder="Bruxelles, Belgique"
                      className="w-full pl-7 pr-3 py-2 rounded border border-[#d9dde3] bg-white text-[#1a2633] placeholder-[#b0b9c4] focus:outline-none focus:border-[#0064d9] focus:ring-1 focus:ring-[#0064d9]/20 transition-colors"
                      style={{ fontSize: "13px" }}
                    />
                  </div>
                </FieldRow>
              </div>
              <FieldRow label="LinkedIn">
                <div className="relative">
                  <Linkedin size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8696a9]" />
                  <input
                    value={data.linkedin}
                    onChange={(e) => set("linkedin", e.target.value)}
                    placeholder="linkedin.com/in/..."
                    className="w-full pl-7 pr-3 py-2 rounded border border-[#d9dde3] bg-white text-[#1a2633] placeholder-[#b0b9c4] focus:outline-none focus:border-[#0064d9] focus:ring-1 focus:ring-[#0064d9]/20 transition-colors"
                    style={{ fontSize: "13px" }}
                  />
                </div>
              </FieldRow>
              <FieldRow label="Site web">
                <div className="relative">
                  <Globe size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8696a9]" />
                  <input
                    value={data.website}
                    onChange={(e) => set("website", e.target.value)}
                    placeholder="www.exemple.com"
                    className="w-full pl-7 pr-3 py-2 rounded border border-[#d9dde3] bg-white text-[#1a2633] placeholder-[#b0b9c4] focus:outline-none focus:border-[#0064d9] focus:ring-1 focus:ring-[#0064d9]/20 transition-colors"
                    style={{ fontSize: "13px" }}
                  />
                </div>
              </FieldRow>
            </div>
          )}
        </div>

        {/* ── SUMMARY ── */}
        <div className="rounded border border-[#d9dde3] overflow-hidden">
          <SectionHeader
            icon={<FileText size={14} />}
            title="Profil / Résumé"
            open={openSections.summary}
            onToggle={() => toggle("summary")}
          />
          {openSections.summary && (
            <div className="p-4">
              <textarea
                value={data.summary}
                onChange={(e) => set("summary", e.target.value)}
                rows={4}
                placeholder="Décrivez votre profil professionnel..."
                className="w-full px-3 py-2 rounded border border-[#d9dde3] bg-white text-[#1a2633] placeholder-[#b0b9c4] focus:outline-none focus:border-[#0064d9] focus:ring-1 focus:ring-[#0064d9]/20 resize-none transition-colors"
                style={{ fontSize: "13px" }}
              />
              <p className="text-[#b0b9c4] mt-1 text-right" style={{ fontSize: "11px" }}>
                {data.summary.length} caractères
              </p>
            </div>
          )}
        </div>

        {/* ── SKILLS ── */}
        <div className="rounded border border-[#d9dde3] overflow-hidden">
          <SectionHeader
            icon={<Star size={14} />}
            title={`Compétences (${data.skills.length})`}
            open={openSections.skills}
            onToggle={() => toggle("skills")}
          />
          {openSections.skills && (
            <div className="p-4 space-y-3">
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e8f1ff] text-[#0064d9] border border-[#b8d4f8]"
                    style={{ fontSize: "12px" }}
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="hover:text-[#e83030] transition-colors"
                    >
                      <X size={11} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                  placeholder="Ajouter une compétence..."
                  className="flex-1 px-3 py-2 rounded border border-[#d9dde3] bg-white text-[#1a2633] placeholder-[#b0b9c4] focus:outline-none focus:border-[#0064d9] focus:ring-1 focus:ring-[#0064d9]/20 transition-colors"
                  style={{ fontSize: "13px" }}
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-3 py-2 rounded bg-[#0064d9] text-white hover:bg-[#0050b3] transition-colors"
                  style={{ fontSize: "13px" }}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── EXPERIENCES ── */}
        <div className="rounded border border-[#d9dde3] overflow-hidden">
          <SectionHeader
            icon={<Briefcase size={14} />}
            title={`Expériences (${data.experiences.length})`}
            open={openSections.experience}
            onToggle={() => toggle("experience")}
          />
          {openSections.experience && (
            <div className="p-4 space-y-3">
              {data.experiences.map((exp) => (
                <div key={exp.id} className="rounded border border-[#e8eaed] overflow-hidden">
                  {editingExpId === exp.id ? (
                    <div className="p-3 space-y-2 bg-[#fafbfc]">
                      <div className="grid grid-cols-2 gap-2">
                        <FieldRow label="Poste">
                          <TextInput value={exp.role} onChange={(v) => updateExp(exp.id, "role", v)} placeholder="Titre du poste" />
                        </FieldRow>
                        <FieldRow label="Entreprise">
                          <TextInput value={exp.company} onChange={(v) => updateExp(exp.id, "company", v)} placeholder="Nom de l'entreprise" />
                        </FieldRow>
                      </div>
                      <FieldRow label="Période">
                        <TextInput value={exp.period} onChange={(v) => updateExp(exp.id, "period", v)} placeholder="ex. 2020 – Présent" />
                      </FieldRow>
                      <FieldRow label="Description">
                        <textarea
                          value={exp.description}
                          onChange={(e) => updateExp(exp.id, "description", e.target.value)}
                          rows={3}
                          placeholder="Décrivez vos missions..."
                          className="w-full px-3 py-2 rounded border border-[#d9dde3] bg-white text-[#1a2633] placeholder-[#b0b9c4] focus:outline-none focus:border-[#0064d9] focus:ring-1 focus:ring-[#0064d9]/20 resize-none transition-colors"
                          style={{ fontSize: "13px" }}
                        />
                      </FieldRow>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => setEditingExpId(null)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0064d9] text-white hover:bg-[#0050b3] transition-colors"
                          style={{ fontSize: "12px" }}
                        >
                          <Check size={12} /> Valider
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 hover:bg-[#fafbfc] transition-colors">
                      <div className="min-w-0">
                        <p className="text-[#1a2633] truncate" style={{ fontSize: "13px", fontWeight: 500 }}>
                          {exp.role || <span className="text-[#b0b9c4]">Poste non renseigné</span>}
                        </p>
                        <p className="text-[#5a6a78] truncate" style={{ fontSize: "11px" }}>
                          {exp.company} {exp.period ? `· ${exp.period}` : ""}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                        <button
                          type="button"
                          onClick={() => setEditingExpId(exp.id)}
                          className="p-1.5 rounded text-[#8696a9] hover:text-[#0064d9] hover:bg-[#e8f1ff] transition-colors"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeExp(exp.id)}
                          className="p-1.5 rounded text-[#8696a9] hover:text-[#e83030] hover:bg-[#fff0f0] transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addExp}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded border border-dashed border-[#b8d4f8] text-[#0064d9] hover:bg-[#e8f1ff] transition-colors"
                style={{ fontSize: "12px" }}
              >
                <Plus size={13} /> Ajouter une expérience
              </button>
            </div>
          )}
        </div>

        {/* ── EDUCATION ── */}
        <div className="rounded border border-[#d9dde3] overflow-hidden">
          <SectionHeader
            icon={<GraduationCap size={14} />}
            title={`Formation (${data.education.length})`}
            open={openSections.education}
            onToggle={() => toggle("education")}
          />
          {openSections.education && (
            <div className="p-4 space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="rounded border border-[#e8eaed] overflow-hidden">
                  {editingEduId === edu.id ? (
                    <div className="p-3 space-y-2 bg-[#fafbfc]">
                      <FieldRow label="Diplôme">
                        <TextInput value={edu.degree} onChange={(v) => updateEdu(edu.id, "degree", v)} placeholder="Titre du diplôme" />
                      </FieldRow>
                      <div className="grid grid-cols-2 gap-2">
                        <FieldRow label="Établissement">
                          <TextInput value={edu.school} onChange={(v) => updateEdu(edu.id, "school", v)} placeholder="Nom de l'école" />
                        </FieldRow>
                        <FieldRow label="Année">
                          <TextInput value={edu.year} onChange={(v) => updateEdu(edu.id, "year", v)} placeholder="2020" />
                        </FieldRow>
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => setEditingEduId(null)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0064d9] text-white hover:bg-[#0050b3] transition-colors"
                          style={{ fontSize: "12px" }}
                        >
                          <Check size={12} /> Valider
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 hover:bg-[#fafbfc] transition-colors">
                      <div className="min-w-0">
                        <p className="text-[#1a2633] truncate" style={{ fontSize: "13px", fontWeight: 500 }}>
                          {edu.degree || <span className="text-[#b0b9c4]">Diplôme non renseigné</span>}
                        </p>
                        <p className="text-[#5a6a78] truncate" style={{ fontSize: "11px" }}>
                          {edu.school} {edu.year ? `· ${edu.year}` : ""}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                        <button type="button" onClick={() => setEditingEduId(edu.id)} className="p-1.5 rounded text-[#8696a9] hover:text-[#0064d9] hover:bg-[#e8f1ff] transition-colors">
                          <Pencil size={13} />
                        </button>
                        <button type="button" onClick={() => removeEdu(edu.id)} className="p-1.5 rounded text-[#8696a9] hover:text-[#e83030] hover:bg-[#fff0f0] transition-colors">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addEdu}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded border border-dashed border-[#b8d4f8] text-[#0064d9] hover:bg-[#e8f1ff] transition-colors"
                style={{ fontSize: "12px" }}
              >
                <Plus size={13} /> Ajouter une formation
              </button>
            </div>
          )}
        </div>

        {/* ── LANGUAGES ── */}
        <div className="rounded border border-[#d9dde3] overflow-hidden">
          <SectionHeader
            icon={<Languages size={14} />}
            title={`Langues (${data.languages.length})`}
            open={openSections.languages}
            onToggle={() => toggle("languages")}
          />
          {openSections.languages && (
            <div className="p-4 space-y-2">
              {data.languages.map((lang) => (
                <div key={lang.id} className="flex items-center gap-2">
                  <input
                    value={lang.lang}
                    onChange={(e) => updateLang(lang.id, "lang", e.target.value)}
                    placeholder="Langue"
                    className="flex-1 px-3 py-2 rounded border border-[#d9dde3] bg-white text-[#1a2633] placeholder-[#b0b9c4] focus:outline-none focus:border-[#0064d9] focus:ring-1 focus:ring-[#0064d9]/20 transition-colors"
                    style={{ fontSize: "13px" }}
                  />
                  <select
                    value={lang.level}
                    onChange={(e) => updateLang(lang.id, "level", e.target.value)}
                    className="px-3 py-2 rounded border border-[#d9dde3] bg-white text-[#1a2633] focus:outline-none focus:border-[#0064d9] focus:ring-1 focus:ring-[#0064d9]/20 transition-colors"
                    style={{ fontSize: "13px" }}
                  >
                    {["Natif", "Courant", "Professionnel", "Intermédiaire", "Débutant"].map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => removeLang(lang.id)}
                    className="p-2 rounded text-[#8696a9] hover:text-[#e83030] hover:bg-[#fff0f0] transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addLang}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded border border-dashed border-[#b8d4f8] text-[#0064d9] hover:bg-[#e8f1ff] transition-colors"
                style={{ fontSize: "12px" }}
              >
                <Plus size={13} /> Ajouter une langue
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sticky footer – validate */}
      <div className="flex-shrink-0 px-5 py-4 border-t border-[#edeff2] bg-white">
        <button
          type="button"
          onClick={onValidate}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded bg-[#0064d9] text-white hover:bg-[#0050b3] active:scale-[0.99] transition-all shadow-sm"
          style={{ fontSize: "14px", fontWeight: 500 }}
        >
          Valider &amp; Générer le PDF Europass
          <ArrowRight size={15} />
        </button>
        <p className="text-center text-[#8696a9] mt-2" style={{ fontSize: "11px" }}>
          La prévisualisation se met à jour en temps réel →
        </p>
      </div>
    </div>
  );
}
