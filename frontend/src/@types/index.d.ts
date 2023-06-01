declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module "*.png"

declare module "*.svg" {
  const ReactComponent: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export { ReactComponent };
}