import React, { useEffect, useMemo } from "react"
import { Form, FormikProps } from "formik"
import { RouteComponentProps } from "react-router-dom"
import { isEmpty } from "lodash-es"

import { App } from "components/generic/layout"
import { Input, Textarea, GoogleMap, DateTimePicker, Upload } from "components/generic/form"
import { Button } from "components/generic/ui"

import { IStateProps, IDispatchProps } from "./EventForm.container"
import { EventFormValues } from "./EventForm.helper"

interface RouteParams {
  id: string
}
export interface IProps extends IStateProps, IDispatchProps, RouteComponentProps<RouteParams> {}

export const EventForm: React.FC<IProps & FormikProps<EventFormValues>> = ({
  submitForm,
  resetForm,
  isValid,
  touched,
  match,
  selected,
  getSelected,
  clearSelected,
  events,
}) => {
  useEffect(() => {
    console.log("privet", match.params.id)
    if (match.params.id) {
      getSelected({ entity: "events", uuid: match.params.id })
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
      <Button key="2" type="primary" onClick={submitForm} disabled={!isValid} loading={events.fetching}>
        Сохранить
      </Button>
    )
    return selected.data ? [reset, submit] : [submit]
  }, [selected.data, events.fetching, isValid, submitForm, resetForm, touched])
  const title = useMemo(() => (selected.data ? "Редактировать событие" : "Новое событие"), [selected.data])

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
        <DateTimePicker label="Дата" name="startedAt" />
        <Upload label="Изображение" name="image" />
        <GoogleMap name="point" />
      </Form>
    </App>
  )
}
