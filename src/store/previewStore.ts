// src/store/previewStore.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// Import split data
import { overlayMap as overlayMapDefaults } from "@/utils/overlayMap";
import { designTokens as designTokensDefaults } from "@/utils/designTokens";

// ===== Types inferred from the split files =====
export type OverlayMap = typeof overlayMapDefaults;
export type DesignTokens = typeof designTokensDefaults;

export type OverlayRouteKey = keyof OverlayMap; // e.g., 'global' | '/' | '/about' | '/contact'
export type OverlayComponentKey = string;

export type Position = {
  x?: number | string;
  y?: number | string;
  width?: number | string;
  height?: number | string;
  zIndex?: number;
};

export type InspectorTarget =
  | {
      route: OverlayRouteKey | string;
      componentKey: OverlayComponentKey;
      field: string; // "props", "position", "tokens", or nested path segment
      index?: number;
    }
  | null;

type PreviewStore = {
  overlayMap: OverlayMap;
  designTokens: DesignTokens;

  activePath: OverlayRouteKey | string;

  editingTarget: InspectorTarget;
  isDesignMode: boolean;
  showInspector: boolean;
  inspectorPosition: { x: number; y: number };

  setActivePath: (route: OverlayRouteKey | string) => void;
  setIsDesignMode: (value: boolean) => void;
  setShowInspector: (value: boolean) => void;
  setInspectorPosition: (pos: { x: number; y: number }) => void;
  setEditingTarget: (target: InspectorTarget) => void;

  updateOverlayRoute: (
    route: OverlayRouteKey | string,
    updates: Partial<OverlayMap[keyof OverlayMap]>
  ) => void;

  updateOverlayComponent: (
    route: OverlayRouteKey | string,
    componentKey: OverlayComponentKey,
    updates: Record<string, unknown>
  ) => void;

  updateComponentProps: (
    route: OverlayRouteKey | string,
    componentKey: OverlayComponentKey,
    propUpdates: Record<string, unknown>
  ) => void;

  updateComponentPosition: (
    route: OverlayRouteKey | string,
    componentKey: OverlayComponentKey,
    position: Partial<Position>
  ) => void;

  updateDesignToken: (token: string, value: string) => void;
  updateDesignTokens: (updates: Record<string, string>) => void;

  updateTokensForComponent: (
    route: OverlayRouteKey | string,
    componentKey: OverlayComponentKey,
    updates: Record<string, string>
  ) => void;

  getComponentTokens: (route: OverlayRouteKey | string, componentKey: OverlayComponentKey) => string[];
  getTokenValue: (token: string) => string | undefined;

  resetToDefaults: (opts?: { clearPersist?: boolean }) => void;
};

export const usePreviewStore = create<PreviewStore>()(
  devtools(
    persist(
      (set, get) => ({
        overlayMap: overlayMapDefaults,
        designTokens: designTokensDefaults,
        activePath: "/",

        editingTarget: null,
        isDesignMode: true,
        showInspector: false,
        inspectorPosition: { x: 20, y: 20 },

        setActivePath: (route) => {
          if (get().activePath !== route) set({ activePath: route });
        },
        setIsDesignMode: (value) => {
          if (get().isDesignMode !== value) set({ isDesignMode: value });
        },
        setShowInspector: (value) => {
          if (get().showInspector !== value) set({ showInspector: value });
        },
        setInspectorPosition: (pos) => {
          const curr = get().inspectorPosition;
          if (curr.x !== pos.x || curr.y !== pos.y) set({ inspectorPosition: pos });
        },
        setEditingTarget: (target) => {
          const curr = get().editingTarget;
          const isSame =
            curr?.route === target?.route &&
            curr?.componentKey === target?.componentKey &&
            curr?.field === target?.field &&
            curr?.index === target?.index;
          if (!isSame) set({ editingTarget: target });
        },

        updateOverlayRoute: (route, updates) =>
          set((state) => ({
            overlayMap: {
              ...state.overlayMap,
              [route]: {
                ...(state.overlayMap as Record<string, unknown>)[route],
                ...updates,
              } as OverlayMap[keyof OverlayMap],
            } as OverlayMap,
          })),

        updateOverlayComponent: (route, componentKey, updates) =>
          set((state) => {
            const routeNode = (state.overlayMap as Record<string, any>)[route] ?? {};
            const comp = routeNode?.[componentKey] ?? {};
            return {
              overlayMap: {
                ...state.overlayMap,
                [route]: {
                  ...routeNode,
                  [componentKey]: { ...comp, ...updates },
                },
              } as OverlayMap,
            };
          }),

        updateComponentProps: (route, componentKey, propUpdates) =>
          set((state) => {
            const routeNode = (state.overlayMap as Record<string, any>)[route] ?? {};
            const comp = routeNode?.[componentKey] ?? {};
            const props = comp.props ?? {};
            return {
              overlayMap: {
                ...state.overlayMap,
                [route]: {
                  ...routeNode,
                  [componentKey]: { ...comp, props: { ...props, ...propUpdates } },
                },
              } as OverlayMap,
            };
          }),

        updateComponentPosition: (route, componentKey, position) =>
          set((state) => {
            const routeNode = (state.overlayMap as Record<string, any>)[route] ?? {};
            const comp = routeNode?.[componentKey] ?? {};
            const pos = comp.position ?? {};
            return {
              overlayMap: {
                ...state.overlayMap,
                [route]: {
                  ...routeNode,
                  [componentKey]: { ...comp, position: { ...pos, ...position } },
                },
              } as OverlayMap,
            };
          }),

        updateDesignToken: (token, value) =>
          set((state) => ({
            designTokens: { ...state.designTokens, [token]: value } as DesignTokens,
          })),

        updateDesignTokens: (updates) =>
          set((state) => ({
            designTokens: { ...state.designTokens, ...updates } as DesignTokens,
          })),

        updateTokensForComponent: (route, componentKey, updates) =>
          set((state) => {
            const comp = (state.overlayMap as Record<string, any>)?.[route]?.[componentKey];
            const allowed: string[] = Array.isArray(comp?.tokens) ? comp.tokens : [];
            if (!allowed.length) return { designTokens: state.designTokens };

            const next: Record<string, string> = {};
            for (const [k, v] of Object.entries(updates)) {
              if (allowed.includes(k)) next[k] = v;
            }

            return Object.keys(next).length
              ? { designTokens: { ...state.designTokens, ...next } as DesignTokens }
              : { designTokens: state.designTokens };
          }),

        getComponentTokens: (route, componentKey) => {
          const comp = (get().overlayMap as Record<string, any>)?.[route]?.[componentKey];
          return Array.isArray(comp?.tokens) ? comp.tokens : [];
        },

        getTokenValue: (token) => get().designTokens?.[token as keyof DesignTokens] as string | undefined,

        resetToDefaults: ({ clearPersist } = {}) => {
          set(() => ({
            overlayMap: overlayMapDefaults,
            designTokens: designTokensDefaults,
            activePath: "/",
            editingTarget: null,
            showInspector: false,
            inspectorPosition: { x: 20, y: 20 },
          }));
          if (clearPersist) {
            try {
              localStorage.removeItem("preview-store");
            } catch {
              /* no-op */
            }
          }
        },
      }),
      {
        name: "preview-store",
        partialize: (state) => ({
          overlayMap: state.overlayMap,
          designTokens: state.designTokens,
          activePath: state.activePath,
          isDesignMode: state.isDesignMode,
        }),
        version: 1,
        migrate: (persisted, version) => {
          if (version < 1) return persisted;
          return persisted as typeof persisted;
        },
      }
    )
  )
);
