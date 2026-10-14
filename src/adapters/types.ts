export type VideoVendor = "shotstack" | "creatomate";
export interface Scene { duration: number; background?: string; elements?: unknown[]; }
export interface VideoSpec { scenes: Scene[]; output?: { format?: "mp4" | "webm"; resolution?: string }; }
export interface RenderRequest { spec: VideoSpec; vendor?: VideoVendor; live?: boolean; apiKey?: string; fetchFn?: typeof fetch; }
export interface VideoAdapter { readonly name: VideoVendor; render(spec: VideoSpec, options?: { apiKey?: string; fetchFn?: typeof fetch }): Promise<string>; }
