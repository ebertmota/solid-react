declare module '*.scss' {
  export const content: { readonly [className: string]: string };
  export default content;
}
