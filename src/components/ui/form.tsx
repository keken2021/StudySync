"use client"

import * as React from "react"
import {
    Controller,
    FormProvider,
    useFormContext,
    type ControllerProps,
    type FieldPath,
    type FieldValues,
} from "react-hook-form"

export const Form = FormProvider

export function FormField<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
>(props: ControllerProps<TFieldValues, TName>) {
    return <Controller {...props} />
}

export const FormItem = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={className} {...props} />
)

export const FormLabel = ({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
    <label className={className} {...props} />
)

export const FormControl = ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props} />
)

export const FormMessage = () => {
    const { formState } = useFormContext()
    const error = Object.values(formState.errors)[0]

    if (!error) return null
    return <p className="text-sm text-red-500">{String(error.message)}</p>
}