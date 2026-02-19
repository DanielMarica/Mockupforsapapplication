import { useState } from "react";
import { SapShellBar } from "./components/SapShellBar";
import { StepIndicator } from "./components/StepIndicator";
import { UploadCard } from "./components/UploadCard";
import { PreviewCard } from "./components/PreviewCard";
import { EditCVForm } from "./components/EditCVForm";
import { CVData, MOCK_CV_DATA } from "./types/cv";
import {
  CheckCircle2,
  ChevronRight,
  Home,
  FileText,
  Settings,
  Download,
  RefreshCw,
} from "lucide-react";

const STEPS = [
  { id: 1, label: "Upload CV Flexso" },
  { id: 2, label: "Extraction des données" },
  { id: 3, label: "Édition & Validation" },
  { id: 4, label: "Téléchargement" },
];

type AppState = "idle" | "extracting" | "editing" | "done";
type Props = { forceStep?: AppState };

export default function App({ forceStep }: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [appState, setAppState] = useState<AppState>(forceStep ?? "idle");
  const [currentStep, setCurrentStep] = useState(
    !forceStep || forceStep === "idle" ? 1 :
    forceStep === "extracting" ? 2 :
    forceStep === "editing" ? 3 : 4
  );
  const [cvData, setCvData] = useState<CVData | null>(
    forceStep === "editing" || forceStep === "done" ? { ...MOCK_CV_DATA } : null
  );

  const handleConvert = () => {
    if (!selectedFile) return;
    setAppState("extracting");
    setCurrentStep(2);
    setTimeout(() => {
      setCvData({ ...MOCK_CV_DATA });
      setAppState("editing");
      setCurrentStep(3);
    }, 2500);
  };

  const handleValidate = () => {
    setAppState("done");
    setCurrentStep(4);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setAppState("idle");
    setCurrentStep(1);
    setCvData(null);
  };

  const isConverting = appState === "extracting";
  const isEditing = appState === "editing";
  const isDone = appState === "done";

  return (
    <div className="flex flex-col min-h-screen bg-[#f2f3f4]">
      <SapShellBar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#d9dde3] px-6 py-1.5 flex items-center gap-1.5">
        <button className="flex items-center gap-1 text-[#0064d9] hover:underline transition-colors" style={{ fontSize: "12px" }}>
          <Home size={12} />
          Accueil
        </button>
        <ChevronRight size={12} className="text-[#8696a9]" />
        <button className="flex items-center gap-1 text-[#0064d9] hover:underline transition-colors" style={{ fontSize: "12px" }}>
          <FileText size={12} />
          Gestion des CV
        </button>
        <ChevronRight size={12} className="text-[#8696a9]" />
        <span className="text-[#5a6a78]" style={{ fontSize: "12px" }}>
          Conversion CV → Europass
        </span>
      </div>

      {/* Main content */}
      <main className="flex-1 px-6 py-5 flex flex-col gap-5 max-w-[1280px] w-full mx-auto">

        {/* Page header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[#1a2633]" style={{ fontSize: "20px" }}>
              Conversion CV Flexso → Europass
            </h1>
            <p className="text-[#5a6a78] mt-0.5" style={{ fontSize: "13px" }}>
              Convertissez et personnalisez votre CV au format standardisé Europass
            </p>
          </div>
          <div className="flex items-center gap-2">
            {(isEditing || isDone) && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#d9dde3] bg-white text-[#5a6a78] hover:bg-[#f2f3f4] transition-colors"
                style={{ fontSize: "12px" }}
              >
                <RefreshCw size={13} />
                Nouvelle conversion
              </button>
            )}
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#d9dde3] bg-white text-[#5a6a78] hover:bg-[#f2f3f4] transition-colors"
              style={{ fontSize: "12px" }}
            >
              <Settings size={13} />
              Paramètres
            </button>
          </div>
        </div>

        {/* Step indicator */}
        <div className="bg-white rounded border border-[#d9dde3] shadow-sm px-6 py-5">
          <StepIndicator steps={STEPS} currentStep={currentStep} />
          <div className="mt-4 pt-4 border-t border-[#edeff2] flex items-center justify-center gap-2">
            {appState === "idle" && (
              <p className="text-[#8696a9]" style={{ fontSize: "12px" }}>
                Sélectionnez un fichier CV pour démarrer la conversion
              </p>
            )}
            {appState === "extracting" && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border-2 border-[#0064d9] border-t-transparent animate-spin" />
                <p className="text-[#0064d9]" style={{ fontSize: "12px" }}>
                  Extraction des données du CV en cours...
                </p>
              </div>
            )}
            {appState === "editing" && (
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#f0a500]" />
                <p className="text-[#f0a500]" style={{ fontSize: "12px", fontWeight: 500 }}>
                  Vérifiez et modifiez les données extraites, puis validez pour générer votre CV Europass
                </p>
              </div>
            )}
            {appState === "done" && (
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#1a8a4a]" />
                <p className="text-[#1a8a4a]" style={{ fontSize: "12px", fontWeight: 500 }}>
                  CV Europass généré avec succès ! Cliquez sur « Télécharger PDF » pour le sauvegarder.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* STEP 1 & 2 */}
        {(appState === "idle" || appState === "extracting") && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="min-h-[500px]">
              <UploadCard
                onFileSelected={setSelectedFile}
                selectedFile={selectedFile}
                onConvert={handleConvert}
                isConverting={isConverting}
              />
            </div>
            <div className="min-h-[500px]">
              <PreviewCard isReady={false} isLoading={isConverting} data={null} />
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {appState === "editing" && cvData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="min-h-[600px]">
              <EditCVForm data={cvData} onChange={setCvData} onValidate={handleValidate} />
            </div>
            <div className="min-h-[600px]">
              <PreviewCard isReady={false} isLoading={false} data={cvData} />
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {appState === "done" && cvData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="bg-white rounded border border-[#d9dde3] shadow-sm flex flex-col">
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#edeff2]">
                <div className="w-8 h-8 rounded bg-[#e8f4ee] flex items-center justify-center">
                  <Download size={16} className="text-[#1a8a4a]" />
                </div>
                <div>
                  <h3 className="text-[#1a2633]" style={{ fontSize: "15px", fontWeight: 600 }}>Téléchargement</h3>
                  <p className="text-[#8696a9]" style={{ fontSize: "12px" }}>Votre CV Europass est prêt</p>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8">
                <div className="relative">
                  <div className="w-24 h-28 rounded-xl border-2 border-[#b8d4f8] bg-white shadow-md flex flex-col overflow-hidden">
                    <div className="h-6 bg-[#0064d9] flex items-center justify-center">
                      <span className="text-white" style={{ fontSize: "8px", fontWeight: 700, letterSpacing: 1 }}>EUROPASS</span>
                    </div>
                    <div className="flex-1 p-2 flex flex-col gap-1">
                      <div className="w-full h-1.5 rounded bg-[#e8f1ff]" />
                      <div className="w-3/4 h-1.5 rounded bg-[#e8f1ff]" />
                      <div className="w-full h-1 rounded bg-[#f2f3f4] mt-1" />
                      <div className="w-full h-1 rounded bg-[#f2f3f4]" />
                      <div className="w-2/3 h-1 rounded bg-[#f2f3f4]" />
                    </div>
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-9 h-9 rounded-full bg-[#1a8a4a] border-2 border-white flex items-center justify-center shadow">
                    <CheckCircle2 size={18} className="text-white" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-[#1a2633]" style={{ fontSize: "16px", fontWeight: 600 }}>CV Europass généré !</p>
                  <p className="text-[#5a6a78] mt-1" style={{ fontSize: "13px" }}>{cvData.name} · {cvData.title}</p>
                </div>
                <div className="flex flex-col gap-3 w-full max-w-xs">
                  <button
                    onClick={() => alert("Téléchargement PDF en cours...")}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded bg-[#0064d9] text-white hover:bg-[#0050b3] transition-colors shadow"
                    style={{ fontSize: "14px", fontWeight: 500 }}
                  >
                    <Download size={16} />
                    Télécharger en PDF
                  </button>
                  <button
                    onClick={() => alert("Téléchargement DOCX en cours...")}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded border border-[#0064d9] text-[#0064d9] bg-white hover:bg-[#e8f1ff] transition-colors"
                    style={{ fontSize: "14px" }}
                  >
                    <FileText size={16} />
                    Télécharger en DOCX
                  </button>
                </div>
                <div className="flex items-center gap-4 text-[#8696a9] mt-2">
                  <span style={{ fontSize: "11px" }}>Format : PDF/A-2A</span>
                  <span style={{ fontSize: "11px" }}>·</span>
                  <span style={{ fontSize: "11px" }}>Langue : FR</span>
                  <span style={{ fontSize: "11px" }}>·</span>
                  <span style={{ fontSize: "11px" }}>~82 KB</span>
                </div>
                <button
                  onClick={() => { setAppState("editing"); setCurrentStep(3); }}
                  className="text-[#0064d9] hover:underline transition-colors"
                  style={{ fontSize: "12px" }}
                >
                  ← Retourner à l'édition
                </button>
              </div>
            </div>
            <div className="min-h-[600px]">
              <PreviewCard
                isReady={true}
                isLoading={false}
                data={cvData}
                onDownload={() => alert("Téléchargement du CV Europass (PDF)")}
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-white rounded border border-[#d9dde3] px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-[#8696a9]" style={{ fontSize: "11px" }}>Flexso CV Converter v2.4.1</span>
            <span className="text-[#d9dde3]">|</span>
            <span className="text-[#8696a9]" style={{ fontSize: "11px" }}>Powered by SAP BTP</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#8696a9]" style={{ fontSize: "11px" }}>Support: it-support@flexso.com</span>
            <span className="text-[#d9dde3]">|</span>
            <span className="text-[#8696a9]" style={{ fontSize: "11px" }}>© 2026 Flexso</span>
          </div>
        </div>
      </main>
    </div>
  );
}