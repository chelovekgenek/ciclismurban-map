import React, { useMemo } from "react"
import { Form, FormikProps } from "formik"
import { isEmpty } from "lodash-es"

import { App, Grid } from "components/generic/layout"
import { Textarea, Upload, Input, Select } from "components/generic/form"
import { Button } from "components/generic/ui"

import { ProfileFormValues } from "./ProfileForm.scheme"
import { IDispatchProps, IStateProps } from "./ProfileForm.container"
import * as Styles from "./ProfileForm.styled"
import { Status } from "@ciclismurban/models"

export interface IProps extends IStateProps, IDispatchProps {}

export const ProfileForm: React.FC<IProps & FormikProps<ProfileFormValues>> = ({
  submitForm,
  resetForm,
  isValid,
  touched,
  fetching,
  email,
}) => {
  const actions = useMemo(
    () => [
      <Button key="1" onClick={() => resetForm()} disabled={isEmpty(touched)}>
        Сбросить
      </Button>,
      <Button key="2" type="primary" onClick={submitForm} disabled={!isValid} loading={fetching}>
        Сохранить
      </Button>,
    ],
    [fetching, isValid, touched, resetForm, submitForm],
  )
  return (
    <App
      content={{
        useHeader: true,
        useLayout: true,
        title: "Редактировать профиль",
        actions,
      }}
    >
      <Form>
        <Grid.Row>
          <Grid.Col span={6}>
            <Upload name="avatar" />
          </Grid.Col>
          <Grid.Col span={6} offset={1}>
            <Styles.EmailField>{email}</Styles.EmailField>
            <Select name="status">
              <Select.Option value={Status.NEED_HELP}>Нужна помощь!</Select.Option>
              <Select.Option value={Status.LOOKING_FOR_COMPANY}>Ищу компанию!</Select.Option>
            </Select>
          </Grid.Col>
        </Grid.Row>
        <Textarea label="Описание" name="description" autosize={{ minRows: 2, maxRows: 4 }} />
        <Input label="Telegram" name="telegram" />
        <Input label="Facebook" name="facebook" />
      </Form>
    </App>
  )
}
