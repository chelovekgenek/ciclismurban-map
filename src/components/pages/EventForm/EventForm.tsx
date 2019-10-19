import React from "react"
import { Form, FormikProps } from "formik"

import { App } from "components/generic/layout"
import { Input, Textarea, GoogleMap, DateTimePicker, Upload } from "components/generic/form"
import { Button } from "components/generic/ui"

import { IStateProps, IDispatchProps } from "./EventForm.container"
import { InitForm } from "./EventForm.helper"

export interface IProps extends IStateProps, IDispatchProps {}

export const EventForm: React.FC<IProps & FormikProps<InitForm>> = ({ submitForm, isValid, fetching }) => (
  <App
    content={{
      useHeader: true,
      useLayout: true,
      title: "Новое событие",
      actions: [
        <Button key="1" type="primary" onClick={submitForm} disabled={!isValid} loading={fetching}>
          Сохранить
        </Button>,
      ],
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
