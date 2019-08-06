import React from "react"
import { connect } from "react-redux"
import { withFormik, Form, FormikProps } from "formik"

import { App } from "components/generic/layout"
import { Input, Textarea, GoogleMap, DateTimePicker, Upload } from "components/generic/form"
import { Button } from "components/generic/ui"
import { LocationForm } from "models/location"
import { EventsActions } from "store/entities/locations"
import { TAppState } from "store/entities"

interface IDispatchProps {
  create: typeof EventsActions.requestCreate
}

interface IProps extends IDispatchProps {}

export const Event: React.FC<IProps & FormikProps<Partial<LocationForm>>> = ({ submitForm, isValid }) => (
  <App
    content={{
      useHeader: true,
      useLayout: true,
      title: "Новое событие",
      actions: [
        <Button key="1" type="primary" onClick={submitForm} disabled={!isValid}>
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

export default connect<null, IDispatchProps, IProps, TAppState>(
  null,
  {
    create: EventsActions.requestCreate,
  },
)(
  withFormik<IProps, Partial<LocationForm>>({
    mapPropsToValues: () => new LocationForm(),
    handleSubmit: (values, { props }) => props.create(values),
    validateOnBlur: true,
  })(Event),
)
