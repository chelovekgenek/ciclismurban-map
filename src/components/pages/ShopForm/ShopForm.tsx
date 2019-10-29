import React, { useEffect, useMemo } from "react"
import { Form, FormikProps } from "formik"
import { RouteComponentProps } from "react-router-dom"
import { isEmpty } from "lodash-es"

import { App } from "components/generic/layout"
import { Input, Textarea, GoogleMap, Upload } from "components/generic/form"
import { Button } from "components/generic/ui"

import { IStateProps, IDispatchProps } from "./ShopForm.container"
import { ShopFormValues } from "./ShopForm.helper"

interface RouteParams {
  id: string
}
export interface IProps extends IStateProps, IDispatchProps, RouteComponentProps<RouteParams> {}

export const ShopForm: React.FC<IProps & FormikProps<ShopFormValues>> = ({
  submitForm,
  resetForm,
  isValid,
  touched,
  match,
  selected,
  getSelected,
  clearSelected,
  shops,
}) => {
  useEffect(() => {
    if (match.params.id) {
      getSelected({ entity: "shops", uuid: match.params.id })
    }
    return () => {
      clearSelected()
    }
  }, [match.params.id, getSelected, clearSelected])

  const actions = useMemo(() => {
    const reset = (
      <Button key="1" onClick={() => resetForm(selected.data as ShopFormValues)} disabled={isEmpty(touched)}>
        Сбросить
      </Button>
    )
    const submit = (
      <Button key="2" type="primary" onClick={submitForm} disabled={!isValid} loading={shops.fetching}>
        Сохранить
      </Button>
    )
    return selected.data ? [reset, submit] : [submit]
  }, [selected.data, shops.fetching, isValid, submitForm, resetForm, touched])
  const title = useMemo(() => (selected.data ? "Редактировать магазин" : "Новый магазин"), [selected.data])

  return (
    <App
      content={{
        useHeader: true,
        useLayout: true,
        title,
        actions,
      }}
    >
      <Form>
        <Input label="Название" name="title" />
        <Textarea label="Описание" name="description" autosize={{ minRows: 1, maxRows: 4 }} />
        <Upload label="Изображение" name="image" />
        <GoogleMap name="point" />
      </Form>
    </App>
  )
}
