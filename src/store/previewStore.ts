// src/store/previewStore.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { previewData } from "@/utils/previewData";

/** ===== Types inferred from previewData ===== */
type OverlayMap = typeof previewData.overlayMap;
type DesignTokens = typeof previewData.designTokens;

type OverlayRouteKey = keyof OverlayMap; // e.g., 'global' | '/' | '/about' | '/contact' ...
type OverlayComponentKey = string;        // e.g., 'header', 'hero', 'contact', etc.

type Position = {
  x?: number | string;
  y?: number | string;
  width?: number | string;
  height?: number | string;
  zIndex?: number;
};

type InspectorTarget =
  | {
      route: OverlayRouteKey | string;
      componentKey: OverlayComponentKey;
      field: string; // "props", "position", "tokens", or a nested field path
      index?: number; // for arrays
    }
  | null;

type PreviewStore = {
  /** Full overlay map (global + per-route) */
  overlayMap: OverlayMap;

  /** Flat token bag (CSS variables -> values) */
  designTokens: DesignTokens;

  /** Current route the preview is showing (used by editor/inspector) */
  activePath: OverlayRouteKey | string;

  /** Inspector state */
  editingTarget: InspectorTarget;
  isDesignMode: boolean;
  showInspector: boolean;
  inspectorPosition: { x: number; y: number };

  /** --------- Setters / toggles --------- */
  setActivePath: (route: OverlayRouteKey | string) => void;
  setIsDesignMode: (value: boolean) => void;
  setShowInspector: (value: boolean) => void;
  setInspectorPosition: (pos: { x: number; y: number }) => void;
  setEditingTarget: (target: InspectorTarget) => void;

  /** --------- Overlay updaters --------- */
  /** Shallow-merge updates into a whole route node (rarely used; prefer component-level updaters) */
  updateOverlayRoute: (route: OverlayRouteKey | string, updates: Partial<OverlayMap[string]>) => void;

  /** Update one component block inside a route (props/position/tokens/editable/id/etc.) */
  updateOverlayComponent: (
    route: OverlayRouteKey | string,
    componentKey: OverlayComponentKey,
    updates: Record<string, any>
  ) => void;

  /** Update only component props */
  updateComponentProps: (
    route: OverlayRouteKey | string,
    componentKey: OverlayComponentKey,
    propUpdates: Record<string, any>
  ) => void;

  /** Update only component position */
  updateComponentPosition: (
    route: OverlayRouteKey | string,
    componentKey: OverlayComponentKey,
    position: Partial<Position>
  ) => void;

  /** --------- Token updaters / selectors --------- */
  updateDesignToken: (token: string, value: string) => void;
  updateDesignTokens: (updates: Record<string, string>) => void;

  /** Convenience: apply a token batch but only for the keys a component cares about */
  updateTokensForComponent: (
    route: OverlayRouteKey | string,
    componentKey: OverlayComponentKey,
    updates: Record<string, string>
  ) => void;

  /** Read helpers */
  getComponentTokens: (route: OverlayRouteKey | string, componentKey: OverlayComponentKey) => string[];
  getTokenValue: (token: string) => string | undefined;

  /** Reset everything back to previewData defaults (and optionally clear persisted state) */
  resetToDefaults: (opts?: { clearPersist?: boolean }) => void;
};

export const usePreviewStore = create<PreviewStore>()(
  devtools(
    persist(
      (set, get) => ({
        overlayMap: previewData.overlayMap,
        designTokens: previewData.designTokens,
        activePath: "/",
        editingTarget: null,
        isDesignMode: true,
        showInspector: false,
        inspectorPosition: { x: 20, y: 20 },

        /** --------- basic toggles --------- */
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

        /** --------- overlay updaters --------- */
        updateOverlayRoute: (route, updates) =>
          set((state) => ({
            overlayMap: {
              ...state.overlayMap,
              [route]: {
                ...(state.overlayMap as any)[route],
                ...updates,
              },
            },
          })),

        updateOverlayComponent: (route, componentKey, updates) =>
          set((state) => {
            const routeNode: any = (state.overlayMap as any)[route] || {};
            const comp = routeNode?.[componentKey] || {};
            return {
              overlayMap: {
                ...state.overlayMap,
                [route]: {
                  ...routeNode,
                  [componentKey]: { ...comp, ...updates },
                },
              },
            };
          }),

        updateComponentProps: (route, componentKey, propUpdates) =>
          set((state) => {
            const routeNode: any = (state.overlayMap as any)[route] || {};
            const comp = routeNode?.[componentKey] || {};
            const props = comp.props || {};
            return {
              overlayMap: {
                ...state.overlayMap,
                [route]: {
                  ...routeNode,
                  [componentKey]: { ...comp, props: { ...props, ...propUpdates } },
                },
              },
            };
          }),

        updateComponentPosition: (route, componentKey, position) =>
          set((state) => {
            const routeNode: any = (state.overlayMap as any)[route] || {};
            const comp = routeNode?.[componentKey] || {};
            const pos = comp.position || {};
            return {
              overlayMap: {
                ...state.overlayMap,
                [route]: {
                  ...routeNode,
                  [componentKey]: { ...comp, position: { ...pos, ...position } },
                },
              },
            };
          }),

        /** --------- token updaters --------- */
        updateDesignToken: (token, value) =>
          set((state) => ({
            designTokens: { ...state.designTokens, [token]: value },
          })),

        updateDesignTokens: (updates) =>
          set((state) => ({
            designTokens: { ...state.designTokens, ...updates },
          })),

        updateTokensForComponent: (route, componentKey, updates) =>
          set((state) => {
            const comp: any = (state.overlayMap as any)?.[route]?.[componentKey];
            const allowed: string[] = Array.isArray(comp?.tokens) ? comp.tokens : [];
            if (!allowed.length) {
              // If component has no declared tokens, do nothing to avoid polluting the bag
              return { designTokens: state.designTokens };
            }
            const next: Record<string, string> = {};
            Object.entries(updates).forEach(([k, v]) => {
              if (allowed.includes(k)) next[k] = v;
            });
            return next && Object.keys(next).length
              ? { designTokens: { ...state.designTokens, ...next } }
              : { designTokens: state.designTokens };
          }),

        /** --------- selectors --------- */
        getComponentTokens: (route, componentKey) => {
          const comp: any = (get().overlayMap as any)?.[route]?.[componentKey];
          return Array.isArray(comp?.tokens) ? comp.tokens : [];
        },

        getTokenValue: (token) => get().designTokens?.[token],

        /** --------- reset --------- */
        resetToDefaults: ({ clearPersist } = {}) => {
          set(() => ({
            overlayMap: previewData.overlayMap,
            designTokens: previewData.designTokens,
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
        // optional: only persist what we actually need
        partialize: (state) => ({
          overlayMap: state.overlayMap,
          designTokens: state.designTokens,
          activePath: state.activePath,
          isDesignMode: state.isDesignMode,
        }),
        // optional: migrations if your schema evolves
        version: 1,
        migrate: (persisted, version) => {
          if (version < 1) {
            return {
              ...persisted,
            };
          }
          return persisted as any;
        },
      }
    )
  )
);
