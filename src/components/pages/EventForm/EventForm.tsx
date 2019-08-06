import React from "react"
import { withFormik, Form, FormikProps } from "formik"

import { App } from "components/generic/layout"
import { Input, Textarea, GoogleMap, DateTimePicker, Upload } from "components/generic/form"
import { Button } from "components/generic/ui"
import { LocationForm } from "models/location"

interface IProps {}

export const Event: React.FC<IProps & FormikProps<LocationForm>> = ({ submitForm }) => (
  <App
    content={{
      useHeader: true,
      useLayout: true,
      title: "Новое событие",
      actions: [
        <Button key="1" type="primary" onClick={submitForm}>
          Сохранить
        </Button>,
      ],
    }}
  >
    <Form>
      <Input label="Название" name="title" />
      <Textarea label="Описание" name="description" autosize={{ minRows: 1, maxRows: 4 }} />
      <DateTimePicker label="Дата" name="startingAt" />
      <Upload label="Изображение" name="image" />
      <GoogleMap name="point" />
    </Form>
  </App>
)

export default withFormik<IProps, LocationForm>({
  mapPropsToValues: () => new LocationForm(),
  handleSubmit: console.log,
  validateOnBlur: true,
})(Event)
