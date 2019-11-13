import React, { useEffect, useMemo } from "react"
import { Form, FormikProps } from "formik"
import { RouteComponentProps } from "react-router-dom"
import { isEmpty } from "lodash-es"

import { App } from "components/generic/layout"
import { Input, Textarea, GoogleMap, Upload } from "components/generic/form"
import { Button } from "components/generic/ui"

import { IStateProps, IDispatchProps } from "./ParkingForm.container"
import { ParkingFormValues } from "./ParkingForm.scheme"

interface RouteParams {
  id: string
}
export interface IProps extends IStateProps, IDispatchProps, RouteComponentProps<RouteParams> {}

export const ParkingForm: React.FC<IProps & FormikProps<ParkingFormValues>> = ({
  submitForm,
  resetForm,
  isValid,
  touched,
  match,
  selected,
  getSelected,
  clearSelected,
  parkings,
}) => {
  useEffect(() => {
    if (match.params.id) {
      getSelected({ entity: "parkings", uuid: match.params.id })
    }
    return () => {
      clearSelected()
    }
  }, [match.params.id, getSelected, clearSelected])

  const actions = useMemo(() => {
    const reset = (
      <Button key="1" onClick={() => resetForm()} disabled={isEmpty(touched)}>
        Сбросить
      </Button>
    )
    const submit = (
      <Button key="2" type="primary" onClick={submitForm} disabled={!isValid} loading={parkings.fetching}>
        Сохранить
      </Button>
    )
    return selected.data ? [reset, submit] : [submit]
  }, [selected.data, parkings.fetching, isValid, submitForm, resetForm, touched])
  const title = useMemo(() => (selected.data ? "Редактировать парковку" : "Новая парковка"), [selected.data])

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
