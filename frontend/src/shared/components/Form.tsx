import { FCC } from "global/types"
import { Children, cloneElement, HTMLProps, isValidElement, ReactElement } from "react"
import { Control, useController, UseControllerProps } from "react-hook-form"

type AnyFormElement = ReactElement<{
  name: string,
  rules?: UseControllerProps["rules"],
  error?: boolean,
  helperText?: string,
}>

type FormElemProps = {
  children: AnyFormElement,
  control: Control<any>,
}

const FormElem = ({ children, control }: FormElemProps) => {
  const { field, fieldState } = useController({
    name: children.props.name,
    control,
    rules: children.props.rules,
  })

  return cloneElement(children, {
    ...field,
    error: !!fieldState.error,
    helperText: fieldState.error?.message,
  })
}

type FormChildrenProps = {
  children: any,
  control: Control<any>,
}

const FormChildren = ({ children, control }: FormChildrenProps) =>
  Children.map(children, child => {
    if (!isValidElement(child)) return child

    let newChild = child as ReactElement

    if (newChild.props.name) return <FormElem control={control}>{newChild as AnyFormElement}</FormElem>

    if (!newChild.props.children) return newChild

    return cloneElement(newChild, {}, <FormChildren control={control}>{newChild.props.children}</FormChildren>)
  })

interface FormProps extends HTMLProps<HTMLFormElement> {
  control: Control<any>,
}

export const Form: FCC<FormProps> = ({ children, control, ...props }) => (
  <form {...props}>
    <FormChildren control={control}>{children}</FormChildren>
  </form>
)