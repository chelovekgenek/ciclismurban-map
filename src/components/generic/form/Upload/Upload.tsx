import React from "react"
import { Field, FieldProps } from "formik"
import { UploadChangeParam } from "antd/lib/upload"
import { UploadFile } from "antd/lib/upload/interface"

import { Icon } from "components/generic/ui"
import { getBase64 } from "helpers"

import { FormItem } from "../FormItem"
import * as Styled from ".//Upload.styled"

interface IProps {
  name: string
}

export const Upload: React.FC<IProps> = ({ name }) => (
  <Field name={name}>
    {({ field, form }: FieldProps) => {
      return (
        <FormItem touched={form.touched[field.name]} error={form.errors[field.name]}>
          <Styled.Upload
            name={name}
            accept="image/*"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            onChange={({ file }: UploadChangeParam<UploadFile>) => {
              getBase64(file.originFileObj as Blob, file => form.setFieldValue(name, file))
            }}
            customRequest={() => {}}
          >
            {field.value ? (
              <img src={field.value as string} alt="avatar" style={{ width: "100%" }} />
            ) : (
              <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Загрузить</div>
              </div>
            )}
          </Styled.Upload>
        </FormItem>
      )
    }}
  </Field>
)
