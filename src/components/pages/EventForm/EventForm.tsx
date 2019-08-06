import React from "react"
import { connect } from "react-redux"
import { withFormik, Form, FormikProps } from "formik"

import { App } from "components/generic/layout"
import { Input, Textarea, GoogleMap, DateTimePicker, Upload } from "components/generic/form"
import { Button } from "components/generic/ui"
import { EventsActions, getEventsFetching } from "store/entities/locations"
import { TAppState } from "store/entities"
import { ExposeGroup, EventModel } from "models/location"
import { validateFormik } from "helpers"

import { InitForm } from "./EventForm.helper"

interface IStateProps {
  fetching: ReturnType<typeof getEventsFetching>
}
interface IDispatchProps {
  create: typeof EventsActions.requestCreate
}

interface IProps extends IStateProps, IDispatchProps {}

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

export default connect<IStateProps, IDispatchProps, IProps, TAppState>(
  state => ({
    fetching: getEventsFetching(state),
  }),
  {
    create: EventsActions.requestCreate,
  },
)(
  withFormik<IProps, InitForm>({
    mapPropsToValues: () => new InitForm(),
    handleSubmit: (values, { props }) => props.create(values),
    validate: v => {
      let errors = validateFormik(EventModel, [ExposeGroup.WRITE], ["image"])(v)
      if (!v.image) {
        errors.image = "Image must be provided"
      }
      return errors
    },
    validateOnBlur: true,
  })(EventForm),
)
