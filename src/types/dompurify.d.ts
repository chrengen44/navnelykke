
declare module 'dompurify' {
  export interface DOMPurifyI {
    sanitize(source: string | Node): string;
    sanitize(source: string | Node, config: DOMPurifyConfig): string;
    addHook(name: string, hook: (node: Node, data: any, config: DOMPurifyConfig) => Node | void): void;
    removeHook(name: string): void;
    removeHooks(name: string): void;
    isValidAttribute(tag: string, attr: string, value: string): boolean;
  }

  export interface DOMPurifyConfig {
    ALLOWED_ATTR?: string[];
    ALLOWED_TAGS?: string[];
    FORBID_ATTR?: string[];
    FORBID_TAGS?: string[];
    KEEP_CONTENT?: boolean;
    RETURN_DOM?: boolean;
    RETURN_DOM_FRAGMENT?: boolean;
    RETURN_DOM_IMPORT?: boolean;
    SANITIZE_DOM?: boolean;
    WHOLE_DOCUMENT?: boolean;
    [key: string]: any;
  }

  const DOMPurify: DOMPurifyI;
  export default DOMPurify;
}
