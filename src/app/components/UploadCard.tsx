import { useState, useRef, useCallback } from "react";
import { Upload, RefreshCw, Trash2, FileText, CheckCircle2, X } from "lucide-react";

interface UploadCardProps {
  onFileSelected: (file: File | null) => void;
  selectedFile: File | null;
  onConvert: () => void;
  isConverting: boolean;
}

export function UploadCard({
  onFileSelected,
  selectedFile,
  onConvert,
  isConverting,
}: UploadCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) onFileSelected(file);
    },
    [onFileSelected]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileSelected(file);
  };

  const handleClear = () => {
    onFileSelected(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const canConvert = !!selectedFile && !isConverting;

  return (
    <div className="bg-white rounded border border-[#d9dde3] shadow-sm flex flex-col h-full">
      {/* Card Header */}
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#edeff2]">
        <div className="w-8 h-8 rounded bg-[#e8f1ff] flex items-center justify-center">
          <Upload size={16} className="text-[#0064d9]" />
        </div>
        <div>
          <h3 className="text-[#1a2633]" style={{ fontSize: "15px", fontWeight: 600 }}>
            Importer votre CV Flexso
          </h3>
          <p className="text-[#8696a9]" style={{ fontSize: "12px" }}>
            Formats supportés : DOCX, PDF
          </p>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex-1 flex flex-col gap-4 p-5">
        {/* Drop Zone */}
        <div
          className={`
            flex-1 flex flex-col items-center justify-center rounded border-2 border-dashed
            transition-all duration-200 cursor-pointer min-h-[220px]
            ${isDragging ? "border-[#0064d9] bg-[#e8f1ff]" : selectedFile ? "border-[#0064d9] bg-[#f5f9ff]" : "border-[#c9cdd4] bg-[#f7f8f9] hover:border-[#0064d9] hover:bg-[#f0f6ff]"}
          `}
          onDragEnter={handleDragEnter}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !selectedFile && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf,.docx,.doc"
            onChange={handleFileChange}
          />

          {selectedFile ? (
            /* File selected state */
            <div className="flex flex-col items-center gap-3 p-6 text-center">
              <div className="w-14 h-14 rounded-xl bg-[#e8f1ff] flex items-center justify-center">
                <FileText size={28} className="text-[#0064d9]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 justify-center">
                  <CheckCircle2 size={14} className="text-[#1a8a4a]" />
                  <span
                    className="text-[#1a8a4a]"
                    style={{ fontSize: "12px", fontWeight: 600 }}
                  >
                    Fichier prêt
                  </span>
                </div>
                <p
                  className="text-[#1a2633] mt-1"
                  style={{ fontSize: "14px", fontWeight: 500 }}
                >
                  {selectedFile.name}
                </p>
                <p className="text-[#8696a9]" style={{ fontSize: "12px" }}>
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
                className="flex items-center gap-1 text-[#8696a9] hover:text-[#e83030] transition-colors"
                style={{ fontSize: "12px" }}
              >
                <X size={12} />
                Retirer le fichier
              </button>
            </div>
          ) : (
            /* Empty state */
            <div className="flex flex-col items-center gap-3 p-6 text-center">
              {/* Document illustration */}
              <div className="relative">
                <div className="w-16 h-20 rounded-lg bg-white border-2 border-[#c9cdd4] shadow-sm flex flex-col items-center justify-center gap-1.5">
                  <div className="w-8 h-1.5 rounded bg-[#d9dde3]" />
                  <div className="w-10 h-1.5 rounded bg-[#d9dde3]" />
                  <div className="w-8 h-1.5 rounded bg-[#d9dde3]" />
                  <div className="w-6 h-1.5 rounded bg-[#d9dde3]" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-[#0064d9] flex items-center justify-center shadow">
                  <Upload size={11} className="text-white" />
                </div>
              </div>

              <div>
                <p
                  className="text-[#1a2633]"
                  style={{ fontSize: "14px", fontWeight: 500 }}
                >
                  Glissez-déposez votre CV ici
                </p>
                <p className="text-[#8696a9] mt-1" style={{ fontSize: "12px" }}>
                  ou{" "}
                  <span className="text-[#0064d9] underline cursor-pointer hover:text-[#0050b3]">
                    cliquez pour sélectionner un fichier
                  </span>
                </p>
                <p className="text-[#a0aab4] mt-0.5" style={{ fontSize: "11px" }}>
                  DOCX, PDF — Taille max. 10 MB
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onConvert}
            disabled={!canConvert}
            className={`
              flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded border transition-all duration-200
              ${canConvert
                ? "bg-[#0064d9] border-[#0064d9] text-white hover:bg-[#0050b3] hover:border-[#0050b3] shadow-sm active:scale-[0.98]"
                : "bg-[#f2f3f4] border-[#d9dde3] text-[#b0b9c4] cursor-not-allowed"
              }
            `}
            style={{ fontSize: "14px" }}
          >
            <RefreshCw
              size={14}
              className={isConverting ? "animate-spin" : ""}
            />
            {isConverting ? "Conversion en cours..." : "Lancer la conversion"}
          </button>

          <button
            onClick={handleClear}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded border border-[#0064d9] text-[#0064d9] bg-white hover:bg-[#e8f1ff] transition-colors"
            style={{ fontSize: "14px" }}
          >
            <Trash2 size={14} />
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}
