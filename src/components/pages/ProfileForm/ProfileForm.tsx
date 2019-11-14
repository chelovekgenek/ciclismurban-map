import React, { useMemo } from "react"
import { Form, FormikProps } from "formik"
import { isEmpty } from "lodash-es"

import { App } from "components/generic/layout"
import { Textarea, Upload, Input } from "components/generic/form"
import { Button } from "components/generic/ui"

import { ProfileFormValues } from "./ProfileForm.scheme"
import { IDispatchProps, IStateProps } from "./ProfileForm.container"

export interface IProps extends IStateProps, IDispatchProps {}

export const ProfileForm: React.FC<IProps & FormikProps<ProfileFormValues>> = ({
  submitForm,
  resetForm,
  isValid,
  touched,
  fetching,
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
        <Upload label="Изображение" name="avatar" />
        <Textarea label="Описание" name="description" autosize={{ minRows: 2, maxRows: 4 }} />
        <Input label="Telegram" name="telegram" />
        <Input label="Facebook" name="facebook" />
      </Form>
    </App>
  )
}
