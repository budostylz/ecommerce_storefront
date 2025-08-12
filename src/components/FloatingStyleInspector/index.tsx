"use client";

import React, { useEffect, useRef, useState } from "react";
import chroma from "chroma-js";
import { setClickedInsideInspector } from "src/utils/inspectorClickGuard";
import { usePreviewStore } from "src/store/previewStore";

const fontFamilies = ["Inter", "Playfair Display", "Roboto", "Abril Fatface", "Arial", "Times New Roman"];
const fontWeights = ["Regular", "Bold"];
const fontSizes = [12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 80, 96, 112, 128] as const;
type FontSizeLabel = typeof fontSizes[number];

export const FloatingStyleInspector: React.FC<StyleInspectorProps> = ({
    fontFamily = "Inter",
    fontWeight = "Regular",
    fontSize = "24px",
    textAlign = "center",
    textColor = "#000000",
    backgroundColor = "#ffffff",
    onChange,
    onClose,
}) => {
    const [size, setSize] = useState(parseInt(fontSize));
    const [localFontFamily, setLocalFontFamily] = useState(fontFamily);
    const [localFontWeight, setLocalFontWeight] = useState(fontWeight);

    const inspectorRef = useRef<HTMLDivElement | null>(null);
    const offset = useRef({ x: 0, y: 0 });

    const resetToDefaults = usePreviewStore((s) => s.resetToDefaults);
    const isDesignMode = usePreviewStore((s) => s.isDesignMode);
    const setIsDesignMode = usePreviewStore((s) => s.setIsDesignMode);
    const inspectorPosition = usePreviewStore((s) => s.inspectorPosition);
    const setInspectorPosition = usePreviewStore((s) => s.setInspectorPosition);

    useEffect(() => setLocalFontFamily(fontFamily), [fontFamily]);
    useEffect(() => setLocalFontWeight(fontWeight), [fontWeight]);

    const updateFontSize = (val: number) => {
        setSize(val);
        onChange({ fontSize: `${val}px` });
    };

    const handleReset = () => {
        if (confirm("Reset all styles to default?")) {
            resetToDefaults();
        }
    };

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!inspectorRef.current) return;
        offset.current = {
            x: e.clientX - inspectorPosition.x,
            y: e.clientY - inspectorPosition.y,
        };
        inspectorRef.current.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if ((e.buttons & 1) === 0) return;
        setInspectorPosition({
            x: e.clientX - offset.current.x,
            y: e.clientY - offset.current.y,
        });
    };

    const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        inspectorRef.current?.releasePointerCapture(e.pointerId);
    };

    const wrapperProps = {
        "data-inspector": true,
        onMouseDown: (e: React.MouseEvent) => {
            e.stopPropagation();
            setClickedInsideInspector();
        },
        onClick: (e: React.MouseEvent) => {
            e.stopPropagation();
            setClickedInsideInspector();
        },
    };

    const floatingStyle: React.CSSProperties = {
        ...horizontalWrapperStyle,
        left: inspectorPosition.x,
        top: inspectorPosition.y,
        transform: "translate(0, 0)",
        touchAction: "none",
    };

    const ControlBlock = ({ label, children }: { label: string; children: React.ReactNode }) => (
        <div style={{ display: "flex", flexDirection: "column", minWidth: 120 }}>
            <label className="label">{label}</label>
            {children}
        </div>
    );

    return (
        <div
            ref={inspectorRef}
            style={floatingStyle}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            {...wrapperProps}
        >
            <ControlBlock label="Mode">
                <div style={{ display: "flex", gap: "8px" }}>
                    {isDesignMode ? (
                        <>
                            <button onClick={() => setIsDesignMode(true)} style={{ ...alignBtnStyle, backgroundColor: isDesignMode ? "#e5e7eb" : "#fff" }}>Design</button>
                            <button onClick={() => setIsDesignMode(false)} style={{ ...alignBtnStyle, backgroundColor: !isDesignMode ? "#e5e7eb" : "#fff" }}>Preview</button>
                        </>
                    ) : (
                        <button onClick={() => setIsDesignMode(true)} style={alignBtnStyle}>Design</button>
                    )}
                </div>
            </ControlBlock>

            {isDesignMode && (
                <>
                    <ControlBlock label="Font">
                        <select value={localFontFamily} onChange={(e) => {
                            const newFont = e.target.value;
                            setLocalFontFamily(newFont);
                            onChange({ fontFamily: newFont });
                        }} style={inputStyle}>
                            {fontFamilies.map((font) => <option key={font} value={font}>{font}</option>)}
                        </select>
                    </ControlBlock>
                    <ControlBlock label="Font Weight">
                        <select value={localFontWeight} onChange={(e) => {
                            const newWeight = e.target.value;
                            setLocalFontWeight(newWeight);
                            onChange({ fontWeight: newWeight });
                        }} style={inputStyle}>
                            {fontWeights.map((weight) => <option key={weight} value={weight}>{weight}</option>)}
                        </select>
                    </ControlBlock>
                    <ControlBlock label="Font Size">
                        <select value={`${size}px`} onChange={(e) => updateFontSize(parseInt(e.target.value) as FontSizeLabel)} style={inputStyle}>
                            {fontSizes.map((val) => <option key={val} value={`${val}px`}>{`${val} px`}</option>)}
                        </select>
                    </ControlBlock>
                    <ControlBlock label="Font Align">
                        <div style={alignGroupStyle}>
                            {["left", "center", "right"].map((align) => (
                                <button key={align} onClick={() => onChange({ textAlign: align })} style={{ ...alignBtnStyle, backgroundColor: textAlign === align ? "#e5e7eb" : "#fff" }}>{align[0].toUpperCase()}</button>
                            ))}
                        </div>
                    </ControlBlock>
                    <ControlBlock label="Text Color">
                        <input
                            type="color"
                            value={chroma.valid(textColor) ? chroma(textColor).hex() : "#000000"}
                            onChange={(e) => onChange({ textColor: chroma(e.target.value).hex() })}
                            onClick={(e) => e.stopPropagation()}
                            onPointerDown={(e) => e.stopPropagation()}
                            onFocus={() => setClickedInsideInspector()}
                            style={colorInputStyle}
                        />
                    </ControlBlock>
                    {backgroundColor !== undefined && (
                        <ControlBlock label="Background Color">
                            <input type="color" value={backgroundColor} onChange={(e) => onChange({ backgroundColor: e.target.value })} style={colorInputStyle} />
                        </ControlBlock>
                    )}
                </>
            )}

            {isDesignMode && (
                <button onClick={handleReset} style={resetBtnStyle}>Reset All Styles</button>
            )}

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
                style={closeBtnStyle}
            >
                ×
            </button>

        </div>
    );
};

// Styles...

const horizontalWrapperStyle: React.CSSProperties = {
    position: "fixed",
    width: "calc(100vw - 2rem)",
    maxWidth: "960px",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "12px",
    zIndex: 10000,
    padding: "12px 16px",
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    overflowX: "auto",
};

const inputStyle: React.CSSProperties = {
    padding: "8px 10px",
    fontSize: 14,
    borderRadius: 4,
    border: "1px solid #ccc",
    minWidth: 120,
};

const alignGroupStyle: React.CSSProperties = {
    display: "flex",
    gap: "8px",
};

const alignBtnStyle: React.CSSProperties = {
    flex: 1,
    padding: "6px 8px",
    border: "1px solid #ccc",
    borderRadius: 4,
    backgroundColor: "#fff",
    cursor: "pointer",
    color: "#333",
    fontSize: 14,
    fontWeight: 600,
    textAlign: "center",
};

const colorInputStyle: React.CSSProperties = {
    width: "100%",
    height: "2rem",
    border: "none",
    background: "none",
    padding: 0,
    cursor: "pointer",
};

const closeBtnStyle: React.CSSProperties = {
    position: "absolute",
    top: 6,
    right: 10,
    fontSize: 18,
    fontWeight: 600,
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#444",
};

const resetBtnStyle: React.CSSProperties = {
    marginTop: "1rem",
    padding: "8px 12px",
    borderRadius: 4,
    border: "1px solid #ccc",
    backgroundColor: "#f9f9f9",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    color: "#333",
};

export default FloatingStyleInspector;
