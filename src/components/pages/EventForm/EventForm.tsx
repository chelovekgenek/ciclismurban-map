import React from "react"
import { withFormik, Form } from "formik"

import { App, Grid } from "components/generic/layout"
import { Input, Textarea, GoogleMap, DateTimePicker, Upload } from "components/generic/form"
import { LocationForm } from "models/location"

const { Row, Col } = Grid

const inputs = [
  {
    label: "Название",
    component: <Input name="title" />,
  },
  {
    label: "Описание",
    component: <Textarea name="description" autosize={{ minRows: 1, maxRows: 4 }} />,
  },
  {
    label: "Дата",
    component: <DateTimePicker name="startingAt" />,
  },
  {
    label: "Изображение",
    component: <Upload name="image" />,
  },
  {
    component: <GoogleMap name="point" />,
  },
]

interface IProps {}

export const Event: React.FC<IProps> = () => (
  <App useContentLayout>
    <h2>Новое событие</h2>
    <Form>
      {inputs.map(item => (
        <Row type="flex">
          {item.label ? (
            <React.Fragment>
              <Col span={3}>{item.label}</Col>
              <Col span={9}>{item.component}</Col>
            </React.Fragment>
          ) : (
            item.component
          )}
        </Row>
      ))}
    </Form>
  </App>
)

export default withFormik<IProps, LocationForm>({
  mapPropsToValues: () => new LocationForm(),
  handleSubmit: console.log,
  validateOnBlur: true,
})(Event)
